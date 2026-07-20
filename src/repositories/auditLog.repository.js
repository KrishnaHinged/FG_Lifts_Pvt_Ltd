import { connectDB } from '@/lib/mongodb'
import AuditLog from '@/models/AuditLog'

export async function createLog({ action, performedBy, targetId, targetType, details, ipAddress }) {
  await connectDB()
  return AuditLog.create({ action, performedBy, targetId, targetType, details, ipAddress })
}

export async function getLogs({ page = 1, limit = 50, action, adminId } = {}) {
  await connectDB()
  const query = {}
  if (action)  query.action = action
  if (adminId) query['performedBy.adminId'] = adminId
  const skip = (page - 1) * limit
  const [logs, total] = await Promise.all([
    AuditLog.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    AuditLog.countDocuments(query)
  ])
  return { logs, total, page, pages: Math.ceil(total / limit) }
}
