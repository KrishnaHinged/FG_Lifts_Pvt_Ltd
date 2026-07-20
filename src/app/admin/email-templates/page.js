import { headers } from 'next/headers'
import { connectDB } from '@/lib/mongodb'
import EmailTemplate from '@/models/EmailTemplate'
import TemplatesClient from './TemplatesClient'

export const dynamic = 'force-dynamic'

export default async function AdminTemplatesPage() {
  await connectDB()

  // Retrieve admin info from request headers injected by middleware
  const reqHeaders = await headers()
  const currentAdmin = {
    id: reqHeaders.get('x-admin-id'),
    role: reqHeaders.get('x-admin-role'),
    email: reqHeaders.get('x-admin-email'),
    name: reqHeaders.get('x-admin-name')
  }

  // Fetch all customizable layouts
  const templatesData = await EmailTemplate.find().sort({ name: 1 }).lean()
  const plainTemplates = JSON.parse(JSON.stringify(templatesData))

  return (
    <TemplatesClient
      initialTemplates={plainTemplates}
      currentAdmin={currentAdmin}
    />
  )
}
