import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import MediaUpload from '@/models/MediaUpload'

/**
 * GET /api/media/[id]
 * Serves the uploaded image binary from MongoDB.
 * Public endpoint — no auth required (images need to be viewable on the frontend).
 */
export async function GET(req, { params }) {
  try {
    const { id } = await params

    await connectDB()

    const media = await MediaUpload.findById(id).lean()
    if (!media) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 })
    }

    // Convert base64 back to binary buffer
    const buffer = Buffer.from(media.data, 'base64')

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': media.contentType || 'image/jpeg',
        'Content-Length': String(buffer.length),
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (err) {
    console.error('Media serve error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
