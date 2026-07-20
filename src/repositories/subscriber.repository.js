import { connectDB } from '@/lib/mongodb'
import Subscriber from '@/models/Subscriber'

export async function addSubscriber({ email, name, source }) {
  await connectDB()
  const existing = await Subscriber.findOne({ email })
  if (existing) {
    if (!existing.isActive) {
      existing.isActive = true
      existing.unsubscribedAt = undefined
      await existing.save()
      return { status: 'reactivated', subscriber: existing }
    }
    return { status: 'already_subscribed', subscriber: existing }
  }
  const subscriber = await Subscriber.create({ email, name, source })
  return { status: 'created', subscriber }
}

export async function removeSubscriber(email) {
  await connectDB()
  const subscriber = await Subscriber.findOne({ email })
  if (!subscriber) return { status: 'not_found' }
  subscriber.isActive = false
  subscriber.unsubscribedAt = new Date()
  await subscriber.save()
  return { status: 'unsubscribed' }
}

export async function getActiveSubscriberCount() {
  await connectDB()
  return Subscriber.countDocuments({ isActive: true })
}
