import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Inquiry from '@/models/Inquiry'

export async function POST(req) {
  try {
    await connectDB()
    const body = await req.json()
    const { name, email, phone, company, city, elevatorType, floorCount, message } = body

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Name, email and phone are required.' },
        { status: 400 }
      )
    }

    const inquiry = await Inquiry.create({
      name, email, phone, company, city, elevatorType, floorCount, message
    })

    // Queue confirmation email
    try {
      const { sendInquiryReceivedEmail } = await import('@/services/email.service')
      await sendInquiryReceivedEmail(inquiry)
    } catch (err) {
      console.error('Failed to queue thank-you email:', err)
    }

    return NextResponse.json(
      { success: true, id: inquiry._id },
      { status: 201 }
    )
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json(
      { error: 'Server error. Try again.' },
      { status: 500 }
    )
  }
}
