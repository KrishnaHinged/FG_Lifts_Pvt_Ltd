import { connectDB } from '@/lib/mongodb'
import GalleryProject from '@/models/GalleryProject'
import Product from '@/models/Product'
import { notFound } from 'next/navigation'
import EditProjectClient from './EditProjectClient'

export const dynamic = 'force-dynamic'

export default async function EditGalleryProjectPage({ params }) {
  const { id } = await params
  await connectDB()

  const [projectData, productsData] = await Promise.all([
    GalleryProject.findById(id).lean(),
    Product.find({ isActive: true }).select('name').lean()
  ])

  if (!projectData) notFound()

  // Serialize Mongoose documents safely
  const plainProject = JSON.parse(JSON.stringify(projectData))
  const plainProducts = JSON.parse(JSON.stringify(productsData))

  return (
    <EditProjectClient project={plainProject} products={plainProducts} />
  )
}
