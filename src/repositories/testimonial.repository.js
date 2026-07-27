import { connectDB } from '@/lib/mongodb'
import Testimonial from '@/models/Testimonial'

export async function getAllTestimonials(filters = {}) {
  await connectDB()
  const query = {}
  if (filters.isActive !== undefined) query.isActive = filters.isActive
  return Testimonial.find(query).sort({ sortOrder: 1, createdAt: -1 }).lean()
}

export async function getTestimonialById(id) {
  await connectDB()
  return Testimonial.findById(id).lean()
}

export async function createTestimonial(data) {
  await connectDB()
  return Testimonial.create(data)
}

export async function updateTestimonial(id, data) {
  await connectDB()
  return Testimonial.findByIdAndUpdate(id, data, { returnDocument: 'after' }).lean()
}

export async function deleteTestimonial(id) {
  await connectDB()
  return Testimonial.findByIdAndDelete(id).lean()
}

export async function countTestimonials(query = {}) {
  await connectDB()
  return Testimonial.countDocuments(query)
}
