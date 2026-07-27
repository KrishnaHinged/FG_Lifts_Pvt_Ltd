'use client'

import { useRouter } from 'next/navigation'
import TestimonialForm from '@/components/admin/TestimonialForm'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function EditTestimonialClient({ testimonial }) {
  const router = useRouter()

  const handleSubmitSuccess = () => {
    router.push('/admin/testimonials')
    router.refresh()
  }

  return (
    <div className="space-y-6 select-none">
      
      {/* Header bar */}
      <div className="flex items-center gap-3">
        <Link
          href="/admin/testimonials"
          className="p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-500 hover:text-gray-900 cursor-pointer transition-colors inline-block"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <h1 className="font-sans font-bold text-gray-900 text-2xl tracking-tight leading-none m-0">
          Edit Testimonial: {testimonial.name}
        </h1>
      </div>

      {/* Form manager */}
      <TestimonialForm
        testimonial={testimonial}
        onSubmit={handleSubmitSuccess}
      />

    </div>
  )
}
