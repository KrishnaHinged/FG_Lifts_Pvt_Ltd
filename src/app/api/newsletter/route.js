import { NextResponse } from 'next/server'
import { optIn, optOut } from '@/services/subscriber.service'

export async function POST(req) {
  try {
    const body = await req.json()
    const result = await optIn(body)
    
    if (result.status === 'already_subscribed') {
      return NextResponse.json({ message: 'You are already subscribed.' }, { status: 200 })
    }
    return NextResponse.json({ success: true, message: 'Subscribed successfully.' }, { status: 201 })
  } catch (err) {
    if (err.status === 400) {
      return NextResponse.json({ error: Object.values(err.errors)[0] || 'Valid email is required.' }, { status: 400 })
    }
    console.error('Newsletter subscribe endpoint error:', err)
    return NextResponse.json({ error: 'Server error. Try again.' }, { status: 500 })
  }
}

export async function DELETE(req) {
  try {
    const { email } = await req.json()
    const result = await optOut(email)
    return NextResponse.json({ success: true, message: 'Unsubscribed successfully.' }, { status: 200 })
  } catch (err) {
    if (err.status === 404) {
      return NextResponse.json({ error: 'Email not found in our list.' }, { status: 404 })
    }
    if (err.status === 400) {
      return NextResponse.json({ error: err.error || 'Email required.' }, { status: 400 })
    }
    console.error('Newsletter unsubscribe endpoint error:', err)
    return NextResponse.json({ error: 'Server error. Try again.' }, { status: 500 })
  }
}
