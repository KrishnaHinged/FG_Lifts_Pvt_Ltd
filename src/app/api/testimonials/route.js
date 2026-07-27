import { NextResponse } from 'next/server'
import { getActiveTestimonials } from '@/services/testimonial.service'

export async function GET(req) {
  try {
    const testimonials = await getActiveTestimonials()
    return NextResponse.json({ success: true, testimonials })
  } catch (err) {
    console.error('Fetch testimonials public API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
