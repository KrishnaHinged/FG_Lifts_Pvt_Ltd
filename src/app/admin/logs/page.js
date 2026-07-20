import { connectDB } from '@/lib/mongodb'
import Admin from '@/models/Admin'
import AuditLog from '@/models/AuditLog'
import LogsClient from './LogsClient'

export const dynamic = 'force-dynamic'

export default async function AdminLogsPage() {
  await connectDB()

  // Fetch paginated log list (first page default)
  const page = 1
  const limit = 50

  const [logsData, total, adminsData] = await Promise.all([
    AuditLog.find().sort({ createdAt: -1 }).limit(limit).lean(),
    AuditLog.countDocuments(),
    Admin.find().select('name email role').sort({ name: 1 }).lean()
  ])

  // Serialize Mongoose documents safely
  const plainLogs = JSON.parse(JSON.stringify(logsData))
  const plainAdmins = JSON.parse(JSON.stringify(adminsData))

  return (
    <LogsClient
      initialLogs={plainLogs}
      total={total}
      admins={plainAdmins}
    />
  )
}
