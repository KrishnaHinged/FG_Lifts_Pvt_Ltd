import { headers } from 'next/headers'
import { connectDB } from '@/lib/mongodb'
import Admin from '@/models/Admin'
import UsersClient from './UsersClient'

export const dynamic = 'force-dynamic'

export default async function AdminUsersPage() {
  await connectDB()

  // Retrieve admin info from request headers injected by middleware
  const reqHeaders = await headers()
  const currentAdmin = {
    id: reqHeaders.get('x-admin-id'),
    role: reqHeaders.get('x-admin-role'),
    email: reqHeaders.get('x-admin-email'),
    name: reqHeaders.get('x-admin-name')
  }

  // Fetch all admins (excluding passwords)
  const usersData = await Admin.find().select('-password').sort({ createdAt: -1 }).lean()
  const plainUsers = JSON.parse(JSON.stringify(usersData))

  return (
    <UsersClient
      initialUsers={plainUsers}
      currentAdmin={currentAdmin}
    />
  )
}
