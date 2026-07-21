import * as subRepo from '@/repositories/subscriber.repository'
import { validateNewsletter } from '@/validators/newsletter.validator'

export async function optIn(data) {
  const { isValid, errors } = validateNewsletter(data)
  if (!isValid) {
    throw { status: 400, errors }
  }

  const existing = await subRepo.findSubscriberByEmail(data.email)
  if (existing) {
    if (!existing.isActive) {
      const reactivated = await subRepo.updateSubscriber(existing._id, {
        isActive: true,
        unsubscribedAt: null,
        confirmedAt: new Date()
      })
      return { status: 'reactivated', subscriber: reactivated }
    }
    return { status: 'already_subscribed', subscriber: existing }
  }

  const created = await subRepo.createSubscriber({
    email: data.email,
    name: data.name || '',
    source: data.source || 'Footer Form',
    isActive: true,
    confirmedAt: new Date()
  })

  // Queue newsletter welcome email
  try {
    const { queueEmail } = await import('./email.service')
    await queueEmail({
      templateName: 'newsletter_welcome',
      to: data.email,
      variables: { name: data.name || 'Subscriber' },
      relatedId: created._id.toString()
    })
  } catch (err) {
    console.error('Failed to queue welcome email:', err)
  }

  return { status: 'created', subscriber: created }
}

export async function optOut(email) {
  if (!email) {
    throw { status: 400, error: 'Email required.' }
  }

  const existing = await subRepo.findSubscriberByEmail(email)
  if (!existing) {
    throw { status: 404, error: 'Email not found in our list.' }
  }

  const unsubscribed = await subRepo.updateSubscriber(existing._id, {
    isActive: false,
    unsubscribedAt: new Date()
  })

  return { status: 'unsubscribed', subscriber: unsubscribed }
}

export async function countActiveSubscribers() {
  return subRepo.countSubscribers({ isActive: true })
}

export async function getSubscribers(query = {}) {
  const dbQuery = {}
  if (query.status === 'active') {
    dbQuery.isActive = true
  } else if (query.status === 'inactive') {
    dbQuery.isActive = false
  }
  return subRepo.getAllSubscribers(dbQuery)
}

export async function getSubscribersList({ page = 1, limit = 50, search = '', status = 'All' }) {
  const dbQuery = {}
  if (search) {
    dbQuery.email = { $regex: search, $options: 'i' }
  }
  if (status === 'Active') {
    dbQuery.isActive = true
  } else if (status === 'Unsubscribed') {
    dbQuery.isActive = false
  }

  const skip = (page - 1) * limit
  const [subscribers, total] = await Promise.all([
    subRepo.getSubscribersPaginated(dbQuery, skip, limit),
    subRepo.countSubscribers(dbQuery)
  ])

  return {
    subscribers,
    total,
    page,
    pages: Math.ceil(total / limit)
  }
}

export async function getNewsletterStats() {
  const [total, active, unsubscribed] = await Promise.all([
    subRepo.countSubscribers({}),
    subRepo.countSubscribers({ isActive: true }),
    subRepo.countSubscribers({ isActive: false })
  ])
  return { total, active, unsubscribed }
}


export async function exportSubscribersToCSV() {
  const list = await subRepo.getAllSubscribers()
  const rows = [
    ['Email', 'Name', 'Source', 'Status', 'Confirmed At', 'Unsubscribed At']
  ]

  list.forEach(item => {
    rows.push([
      item.email || '',
      item.name || '',
      item.source || '',
      item.isActive ? 'Active' : 'Unsubscribed',
      item.confirmedAt ? new Date(item.confirmedAt).toLocaleDateString() : '',
      item.unsubscribedAt ? new Date(item.unsubscribedAt).toLocaleDateString() : ''
    ])
  })

  return rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n')
}
