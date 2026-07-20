import { connectDB } from '@/lib/mongodb'
import Admin from '@/models/Admin'
import { hashPassword } from '@/lib/auth'

export async function findAdminByEmail(email) {
  await connectDB()
  return Admin.findOne({ email, isActive: true }).lean()
}

export async function findAdminById(id) {
  await connectDB()
  return Admin.findById(id).lean()
}

export async function getAllAdmins() {
  await connectDB()
  return Admin.find().select('-password').sort({ createdAt: -1 }).lean()
}

export async function createAdmin({ name, email, password, role, createdBy }) {
  await connectDB()
  const hashed = await hashPassword(password)
  return Admin.create({ name, email, password: hashed, role, createdBy })
}

export async function updateAdmin(id, updates) {
  await connectDB()
  if (updates.password) {
    updates.password = await hashPassword(updates.password)
  }
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
