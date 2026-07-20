import { headers } from 'next/headers'
import { connectDB } from '@/lib/mongodb'
import Product from '@/models/Product'
import ProductsClient from './ProductsClient'

export const dynamic = 'force-dynamic'

export default async function AdminProductsPage() {
  await connectDB()

  // Retrieve admin info from request headers injected by middleware
  const reqHeaders = await headers()
  const currentAdmin = {
    id: reqHeaders.get('x-admin-id'),
    role: reqHeaders.get('x-admin-role'),
    email: reqHeaders.get('x-admin-email'),
    name: reqHeaders.get('x-admin-name')
  }

  // Fetch all products (including inactive listings)
  const productsData = await Product.find().sort({ sortOrder: 1, createdAt: -1 }).lean()
  const plainProducts = JSON.parse(JSON.stringify(productsData))

  return (
    <ProductsClient
      initialProducts={plainProducts}
      currentAdmin={currentAdmin}
    />
  )
}
