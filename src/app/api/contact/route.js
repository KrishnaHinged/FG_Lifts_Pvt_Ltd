import { NextResponse } from 'next/server'
import { createLead } from '@/services/inquiry.service'

export async function POST(req) {
  try {
    const body = await req.json()
    const result = await createLead(body)
    return NextResponse.json({ success: true, id: result.id }, { status: 201 })
  } catch (err) {
    if (err.status === 400) {
      return NextResponse.json({ error: Object.values(err.errors)[0] }, { status: 400 })
    }
    console.error('Contact form endpoint error:', err)
    return NextResponse.json({ error: 'Server error. Try again.' }, { status: 500 })
  }
}
