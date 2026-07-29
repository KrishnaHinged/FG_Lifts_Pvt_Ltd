import { connectDB } from '@/lib/mongodb'
import Product from '@/models/Product'
import { notFound } from 'next/navigation'
import EditHomeLiftClient from './EditHomeLiftClient'

export const dynamic = 'force-dynamic'

export default async function EditHomeLiftPage({ params }) {
  const { id } = await params
  await connectDB()

  const productData = await Product.findById(id).lean()
  if (!productData) notFound()

  // Serialize Mongoose document safely
  const plainProduct = JSON.parse(JSON.stringify(productData))

  return (
    <EditHomeLiftClient product={plainProduct} />
  )
}
