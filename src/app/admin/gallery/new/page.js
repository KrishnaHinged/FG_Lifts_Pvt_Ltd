import { connectDB } from '@/lib/mongodb'
import Product from '@/models/Product'
import NewProjectClient from './NewProjectClient'

export const dynamic = 'force-dynamic'

export default async function NewGalleryProjectPage() {
  await connectDB()

  // Fetch products for linking checklist options
  const productsData = await Product.find({ isActive: true }).select('name').lean()
  const plainProducts = JSON.parse(JSON.stringify(productsData))

  return (
    <NewProjectClient products={plainProducts} />
  )
}
