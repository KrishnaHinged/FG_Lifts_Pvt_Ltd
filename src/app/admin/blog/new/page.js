import { headers } from 'next/headers'
import NewBlogClient from './NewBlogClient'

export const dynamic = 'force-dynamic'

export default async function NewBlogPage() {
  // Retrieve admin info from request headers injected by middleware
  const reqHeaders = await headers()
  const currentAdmin = {
    id: reqHeaders.get('x-admin-id'),
    role: reqHeaders.get('x-admin-role'),
    email: reqHeaders.get('x-admin-email'),
    name: reqHeaders.get('x-admin-name')
  }

  return (
    <NewBlogClient currentAdmin={currentAdmin} />
  )
}
