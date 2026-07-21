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

// Admin database queries
export async function getAllProjectsAdmin() {
  await connectDB()
  return GalleryProject.find().sort({ sortOrder: 1, year: -1 }).lean()
}

export async function createProject(data) {
  await connectDB()
  return GalleryProject.create(data)
}

export async function updateProject(id, data) {
  await connectDB()
  return GalleryProject.findByIdAndUpdate(id, data, { new: true }).lean()
}

export async function deleteProject(id) {
  await connectDB()
  return GalleryProject.findByIdAndDelete(id).lean()
}

export async function countProjects(query = {}) {
  await connectDB()
  return GalleryProject.countDocuments(query)
}
