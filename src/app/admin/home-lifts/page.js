import { headers } from 'next/headers'
import { connectDB } from '@/lib/mongodb'
import Product from '@/models/Product'
import HomeLiftsClient from './HomeLiftsClient'

export const dynamic = 'force-dynamic'

export default async function AdminHomeLiftsPage() {
  await connectDB()

  const reqHeaders = await headers()
  const currentAdmin = {
    id: reqHeaders.get('x-admin-id'),
    role: reqHeaders.get('x-admin-role'),
    email: reqHeaders.get('x-admin-email'),
    name: reqHeaders.get('x-admin-name')
  }

  // Fetch only products of category "Home Lift"
  const productsData = await Product.find({ category: 'Home Lift' })
    .sort({ sortOrder: 1, createdAt: -1 })
    .lean()
  const plainProducts = JSON.parse(JSON.stringify(productsData))

  return (
    <HomeLiftsClient
      initialProducts={plainProducts}
      currentAdmin={currentAdmin}
    />
  )
}
