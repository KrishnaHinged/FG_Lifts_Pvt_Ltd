import { headers } from 'next/headers'
import { connectDB } from '@/lib/mongodb'
import Admin from '@/models/Admin'
import Inquiry from '@/models/Inquiry'
import InquiriesClient from './InquiriesClient'

export const dynamic = 'force-dynamic'

export default async function InquiriesPage() {
  await connectDB()

  // Retrieve admin info from request headers injected by middleware
  const reqHeaders = await headers()
  const currentAdmin = {
    id: reqHeaders.get('x-admin-id'),
    role: reqHeaders.get('x-admin-role'),
    email: reqHeaders.get('x-admin-email'),
    name: reqHeaders.get('x-admin-name')
  }

  // Fetch active sales team members and inquiries in parallel
  const [admins, inquiriesData] = await Promise.all([
    Admin.find({ isActive: true }).select('name email role isActive').lean(),
    Inquiry.find(currentAdmin.role === 'SALES_EXECUTIVE' ? { assignedTo: currentAdmin.id } : {})
      .populate('assignedTo', 'name email role')
      .populate('assignedBy', 'name email')
      .sort({ createdAt: -1 })
      .lean()
  ])

  // Serialize Mongoose documents safely
  const plainInquiries = JSON.parse(JSON.stringify(inquiriesData))
  const plainAdmins = JSON.parse(JSON.stringify(admins))

  return (
    <InquiriesClient
      initialInquiries={plainInquiries}
      admins={plainAdmins}
      currentAdmin={currentAdmin}
    />
  )
}
