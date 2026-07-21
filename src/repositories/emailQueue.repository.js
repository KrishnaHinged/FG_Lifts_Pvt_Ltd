import { connectDB } from '@/lib/mongodb'
import EmailQueue from '@/models/EmailQueue'

export async function createQueueItem(data) {
  await connectDB()
  return EmailQueue.create(data)
}

export async function getPendingQueueItems() {
  await connectDB()
  return EmailQueue.find({
    status: 'pending',
    attempts: { $lt: 3 }
  }).sort({ createdAt: 1 }).lean()
}

export async function updateQueueItemStatus(id, updateData) {
  await connectDB()
  return EmailQueue.findByIdAndUpdate(id, updateData, { new: true }).lean()
}

export async function countPendingQueueItems() {
  await connectDB()
  return EmailQueue.countDocuments({ status: 'pending' })
}
