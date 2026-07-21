import { connectDB } from '@/lib/mongodb'
import Inquiry from '@/models/Inquiry'

export async function createInquiry(data) {
  await connectDB()
  return Inquiry.create(data)
}

export async function getAllInquiries(query = {}) {
  await connectDB()
  return Inquiry.find(query).sort({ createdAt: -1 }).lean()
}

export async function getInquiryById(id) {
  await connectDB()
  return Inquiry.findById(id).lean()
}

export async function updateInquiry(id, updateData) {
  await connectDB()
  return Inquiry.findByIdAndUpdate(id, updateData, { new: true }).lean()
}

export async function deleteInquiry(id) {
  await connectDB()
  return Inquiry.findByIdAndDelete(id).lean()
}

export async function countInquiries(query = {}) {
  await connectDB()
  return Inquiry.countDocuments(query)
}

export async function getRecentInquiries(query = {}, limit = 5) {
  await connectDB()
  return Inquiry.find(query).sort({ createdAt: -1 }).limit(limit).lean()
}
