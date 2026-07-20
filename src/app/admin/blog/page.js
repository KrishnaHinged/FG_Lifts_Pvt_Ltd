import { headers } from 'next/headers'
import { connectDB } from '@/lib/mongodb'
import BlogPost from '@/models/BlogPost'
import BlogListClient from './BlogListClient'

export const dynamic = 'force-dynamic'

export default async function AdminBlogPage() {
  await connectDB()

  // Retrieve admin info from request headers injected by middleware
  const reqHeaders = await headers()
  const currentAdmin = {
    id: reqHeaders.get('x-admin-id'),
    role: reqHeaders.get('x-admin-role'),
    email: reqHeaders.get('x-admin-email'),
    name: reqHeaders.get('x-admin-name')
  }

  // Fetch all posts (including draft/unpublished articles)
  const postsData = await BlogPost.find().sort({ createdAt: -1 }).lean()
  const plainPosts = JSON.parse(JSON.stringify(postsData))

  return (
    <BlogListClient
      initialPosts={plainPosts}
      currentAdmin={currentAdmin}
    />
  )
}
