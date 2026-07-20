import { connectDB } from '@/lib/mongodb'
import BlogPost from '@/models/BlogPost'
import { notFound } from 'next/navigation'
import { headers } from 'next/headers'
import EditBlogClient from './EditBlogClient'

export const dynamic = 'force-dynamic'

export default async function EditBlogPage({ params }) {
  const { id } = await params
  await connectDB()

  const postData = await BlogPost.findById(id).lean()
  if (!postData) notFound()

  // Retrieve admin info from request headers injected by middleware
  const reqHeaders = await headers()
  const currentAdmin = {
    id: reqHeaders.get('x-admin-id'),
    role: reqHeaders.get('x-admin-role'),
    email: reqHeaders.get('x-admin-email'),
    name: reqHeaders.get('x-admin-name')
  }

  // Serialize Mongoose document safely
  const plainPost = JSON.parse(JSON.stringify(postData))

  return (
    <EditBlogClient post={plainPost} currentAdmin={currentAdmin} />
  )
}
