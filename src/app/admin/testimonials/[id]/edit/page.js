import { connectDB } from '@/lib/mongodb'
import Testimonial from '@/models/Testimonial'
import { notFound } from 'next/navigation'
import EditTestimonialClient from './EditTestimonialClient'

export const dynamic = 'force-dynamic'

export default async function EditTestimonialPage({ params }) {
  const { id } = await params
  await connectDB()

  const testimonialData = await Testimonial.findById(id).lean()
  if (!testimonialData) notFound()

  // Serialize Mongoose document safely
  const plainTestimonial = {
    id: testimonialData._id.toString(),
    name: testimonialData.name,
    title: testimonialData.title,
    quote: testimonialData.quote,
    bgColor: testimonialData.bgColor || 'bg-[#1A1A1A] text-white',
    isActive: !!testimonialData.isActive,
    sortOrder: testimonialData.sortOrder || 0
  }

  return (
    <EditTestimonialClient testimonial={plainTestimonial} />
  )
}
