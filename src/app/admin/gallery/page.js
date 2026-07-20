import { headers } from 'next/headers'
import { connectDB } from '@/lib/mongodb'
import GalleryProject from '@/models/GalleryProject'
import GalleryClient from './GalleryClient'

export const dynamic = 'force-dynamic'

export default async function AdminGalleryPage() {
  await connectDB()

  // Retrieve admin info from request headers injected by middleware
  const reqHeaders = await headers()
  const currentAdmin = {
    id: reqHeaders.get('x-admin-id'),
    role: reqHeaders.get('x-admin-role'),
    email: reqHeaders.get('x-admin-email'),
    name: reqHeaders.get('x-admin-name')
  }

  // Fetch all projects (including inactive showcase listings)
  const projectsData = await GalleryProject.find().sort({ sortOrder: 1, createdAt: -1 }).lean()
  const plainProjects = JSON.parse(JSON.stringify(projectsData))

  return (
    <GalleryClient
      initialProjects={plainProjects}
      currentAdmin={currentAdmin}
    />
  )
}
