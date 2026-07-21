import { connectDB } from '@/lib/mongodb'
import Subscriber from '@/models/Subscriber'

export async function findSubscriberByEmail(email) {
  await connectDB()
  return Subscriber.findOne({ email }).lean()
}

export async function createSubscriber(data) {
  await connectDB()
  return Subscriber.create(data)
}

export async function updateSubscriber(id, data) {
  await connectDB()
  return Subscriber.findByIdAndUpdate(id, data, { new: true }).lean()
}

export async function getAllSubscribers(query = {}) {
  await connectDB()
  return Subscriber.find(query).sort({ createdAt: -1 }).lean()
}

export async function getSubscribersPaginated(query = {}, skip = 0, limit = 50) {
  await connectDB()
  return Subscriber.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean()
}


export async function countSubscribers(query = {}) {
  await connectDB()
  return Subscriber.countDocuments(query)
}

export async function deleteSubscriber(id) {
  await connectDB()
  return Subscriber.findByIdAndDelete(id).lean()
}
