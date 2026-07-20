import { NextResponse } from 'next/server'
import { addSubscriber, removeSubscriber } from '@/repositories/subscriber.repository'

export async function POST(req) {
  try {
    const { email, name, source } = await req.json()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 })
    }
    const result = await addSubscriber({ email, name: name || '', source: source || 'Footer Form' })
    if (result.status === 'already_subscribed') {
      return NextResponse.json({ message: 'You are already subscribed.' }, { status: 200 })
    }
    return NextResponse.json({ success: true, message: 'Subscribed successfully.' }, { status: 201 })
  } catch (err) {
    console.error('Newsletter subscribe error:', err)
    return NextResponse.json({ error: 'Server error. Try again.' }, { status: 500 })
  }
}

export async function DELETE(req) {
  try {
    const { email } = await req.json()
    if (!email) return NextResponse.json({ error: 'Email required.' }, { status: 400 })
    const result = await removeSubscriber(email)
    if (result.status === 'not_found') {
      return NextResponse.json({ error: 'Email not found in our list.' }, { status: 404 })
    }
    return NextResponse.json({ success: true, message: 'Unsubscribed successfully.' }, { status: 200 })
  } catch (err) {
    console.error('Newsletter unsubscribe error:', err)
    return NextResponse.json({ error: 'Server error. Try again.' }, { status: 500 })
  }
}
