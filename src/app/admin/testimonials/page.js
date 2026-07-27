import { headers } from 'next/headers'
import { connectDB } from '@/lib/mongodb'
import Testimonial from '@/models/Testimonial'
import TestimonialsClient from './TestimonialsClient'

export const dynamic = 'force-dynamic'

export default async function AdminTestimonialsPage() {
  await connectDB()

  // Retrieve admin info from request headers injected by middleware
  const reqHeaders = await headers()
  const currentAdmin = {
    id: reqHeaders.get('x-admin-id'),
    role: reqHeaders.get('x-admin-role'),
    email: reqHeaders.get('x-admin-email'),
    name: reqHeaders.get('x-admin-name')
  }

  // Fetch all testimonials sorted by order & date
  const testimonialsData = await Testimonial.find().sort({ sortOrder: 1, createdAt: -1 }).lean()
  
  // Serialize Mongo documents
  const plainTestimonials = testimonialsData.map(t => ({
    id: t._id.toString(),
    name: t.name,
    title: t.title,
    quote: t.quote,
    bgColor: t.bgColor || 'bg-[#1A1A1A] text-white',
    isActive: !!t.isActive,
    sortOrder: t.sortOrder || 0,
    createdAt: t.createdAt ? t.createdAt.toString() : '',
    updatedAt: t.updatedAt ? t.updatedAt.toString() : ''
  }))

  return (
    <TestimonialsClient
      initialTestimonials={plainTestimonials}
      currentAdmin={currentAdmin}
    />
  )
}
