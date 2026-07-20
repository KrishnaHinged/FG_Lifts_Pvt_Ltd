import { connectDB } from '@/lib/mongodb'
import GalleryProject from '@/models/GalleryProject'

export async function getAllProjects(category = null) {
  await connectDB()
  const query = { isActive: true }
  if (category && category !== 'All') query.category = category
  return GalleryProject.find(query).sort({ sortOrder: 1, year: -1 }).lean()
}

export async function getProjectById(id) {
  await connectDB()
  return GalleryProject.findById(id).lean()
}
