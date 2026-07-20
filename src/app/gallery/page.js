import GalleryClient from '@/components/gallery/GalleryClient'
import { getAllProjects } from '@/repositories/gallery.repository'

export const metadata = {
  title: 'Projects Gallery | FG Lift Pvt. Ltd.',
  description: 'Explore FG Lift\'s portfolio of completed elevator installations across residential towers, commercial skyscrapers, luxury residences, and industrial facilities.',
  openGraph: {
    title: 'Projects Gallery | FG Lift',
    description: 'Landmark elevator installations across India.',
    images: ['/images/og-gallery.jpg'],
  },
}

export default async function GalleryPage() {
  const projects = await getAllProjects()

  // Convert Mongoose objects to plain JS objects for client serialization
  const serialize = (doc) => {
    if (!doc) return null
    if (Array.isArray(doc)) return doc.map(serialize)
    const obj = { ...doc }
    if (obj._id) obj._id = obj._id.toString()
    if (obj.createdAt) obj.createdAt = obj.createdAt.toString()
    if (obj.updatedAt) obj.updatedAt = obj.updatedAt.toString()
    return obj
  }

  const plainProjects = serialize(projects)

  return (
    <GalleryClient initialProjects={plainProjects} />
  )
}
