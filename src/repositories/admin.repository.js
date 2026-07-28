import { connectDB } from '@/lib/mongodb'
import Admin from '@/models/Admin'

export async function findAdminByEmail(email) {
  await connectDB()
  if (!email) return null
  const cleanEmail = email.trim().toLowerCase()
  return Admin.findOne({ email: cleanEmail, isActive: true }).lean()
}

export async function findAnyAdminByEmail(email) {
  await connectDB()
  if (!email) return null
  const cleanEmail = email.trim().toLowerCase()
  return Admin.findOne({ email: cleanEmail }).lean()
}

export async function findAdminById(id) {
  await connectDB()
  return Admin.findById(id).lean()
}

export async function getAllAdmins() {
  await connectDB()
  return Admin.find().select('-password').sort({ createdAt: -1 }).lean()
}

export async function createAdmin(data) {
  await connectDB()
  return Admin.create(data)
}

export async function updateAdmin(id, updates) {
  await connectDB()
  return Admin.findByIdAndUpdate(id, updates, { new: true }).select('-password').lean()
}

export async function toggleAdminStatus(id, isActive) {
  await connectDB()
  return Admin.findByIdAndUpdate(id, { isActive }, { new: true }).select('-password').lean()
}

export async function updateLastLogin(id) {
  await connectDB()
  return Admin.findByIdAndUpdate(id, { lastLoginAt: new Date() })
}

export async function deleteAdmin(id) {
  await connectDB()
  return Admin.findByIdAndDelete(id).lean()
}

export async function countAdmins(query = {}) {
  await connectDB()
  return Admin.countDocuments(query)
}
