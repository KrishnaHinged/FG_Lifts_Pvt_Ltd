import { headers } from 'next/headers'
import { connectDB } from '@/lib/mongodb'
import Subscriber from '@/models/Subscriber'
import NewsletterClient from './NewsletterClient'

export const dynamic = 'force-dynamic'

export default async function AdminNewsletterPage() {
  await connectDB()

  // Retrieve admin info from request headers injected by middleware
  const reqHeaders = await headers()
  const currentAdmin = {
    id: reqHeaders.get('x-admin-id'),
    role: reqHeaders.get('x-admin-role'),
    email: reqHeaders.get('x-admin-email'),
    name: reqHeaders.get('x-admin-name')
  }

  // Fetch initial subscribers list (paginated default first page)
  const page = 1
  const limit = 50

  const [subscribersData, total, totalCount, activeCount, unsubscribedCount] = await Promise.all([
    Subscriber.find().sort({ createdAt: -1 }).limit(limit).lean(),
    Subscriber.countDocuments(),
    Subscriber.countDocuments(),
    Subscriber.countDocuments({ isActive: true }),
    Subscriber.countDocuments({ isActive: false })
  ])

  // Serialize Mongoose documents safely
  const plainSubscribers = JSON.parse(JSON.stringify(subscribersData))

  return (
    <NewsletterClient
      initialSubscribers={plainSubscribers}
      total={total}
      stats={{
        total: totalCount,
        active: activeCount,
        unsubscribed: unsubscribedCount
      }}
      currentAdmin={currentAdmin}
    />
  )
}
