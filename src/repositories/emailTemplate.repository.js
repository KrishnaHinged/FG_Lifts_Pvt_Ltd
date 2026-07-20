import { connectDB } from '@/lib/mongodb'
import EmailTemplate from '@/models/EmailTemplate'

export async function getAllTemplates() {
  await connectDB()
  return EmailTemplate.find().sort({ name: 1 }).lean()
}

export async function getTemplateByName(name) {
  await connectDB()
  return EmailTemplate.findOne({ name, isActive: true }).lean()
}

export async function updateTemplate(id, { subject, body }) {
  await connectDB()
  return EmailTemplate.findByIdAndUpdate(id, { subject, body }, { new: true }).lean()
}
