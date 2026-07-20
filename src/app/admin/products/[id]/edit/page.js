import { connectDB } from '@/lib/mongodb'
import Product from '@/models/Product'
import { notFound } from 'next/navigation'
import EditProductClient from './EditProductClient'

export const dynamic = 'force-dynamic'

export default async function EditProductPage({ params }) {
  const { id } = await params
  await connectDB()

  const productData = await Product.findById(id).lean()
  if (!productData) notFound()

  // Serialize Mongoose document safely
  const plainProduct = JSON.parse(JSON.stringify(productData))

  return (
    <EditProductClient product={plainProduct} />
  )
}
