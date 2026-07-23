import { NextResponse } from 'next/server'
import { createLead } from '@/services/inquiry.service'
import { checkRateLimit } from '@/security/rateLimit'
import { sanitizeObject } from '@/security/sanitizer'

export async function POST(req) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1'
    const rateCheck = checkRateLimit(`contact:${ip}`, 10, 60 * 60 * 1000) // max 10 requests per hour per IP
    if (!rateCheck.allowed) {
      return NextResponse.json({ error: 'Too many lead submissions. Please try again later.' }, { status: 429 })
    }

    const body = await req.json()
    const cleanBody = sanitizeObject(body)
    const result = await createLead(cleanBody)
    return NextResponse.json({ success: true, id: result.id }, { status: 201 })
  } catch (err) {
    if (err.status === 400) {
      return NextResponse.json({ error: Object.values(err.errors)[0] }, { status: 400 })
    }
    console.error('Contact form endpoint error:', err)
    return NextResponse.json({ error: 'Server error. Try again.' }, { status: 500 })
  }
}
