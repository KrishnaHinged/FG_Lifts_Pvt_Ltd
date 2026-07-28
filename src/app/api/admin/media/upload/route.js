import { NextResponse } from 'next/server'
import { getAdmin } from '@/lib/auth'
import { hasPermission } from '@/permissions/permissions'
import { PERMISSIONS } from '@/permissions/roles'
import { connectDB } from '@/lib/mongodb'
import MediaUpload from '@/models/MediaUpload'

// Allow longer execution for image processing
export const maxDuration = 30

/**
 * POST /api/admin/media/upload
 * Accepts a JSON body with { data: "data:image/...;base64,...", filename: "...", context: "..." }
 * Stores the image in MongoDB and returns a served URL.
 */
export async function POST(req) {
  try {
    const admin = getAdmin(req)
    if (!admin || !hasPermission(admin, PERMISSIONS.EDIT_PRODUCT)) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    const body = await req.json()
    const { data, filename, context } = body

    if (!data || !data.startsWith('data:image/')) {
      return NextResponse.json({ error: 'Invalid image data. Must be a base64 data URL.' }, { status: 400 })
    }

    // Extract content type and raw base64
    const matches = data.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/)
    if (!matches || matches.length !== 3) {
      return NextResponse.json({ error: 'Malformed data URL.' }, { status: 400 })
    }

    const contentType = matches[1]
    const base64Data = matches[2]
    const size = Math.round((base64Data.length * 3) / 4) // approximate byte size

    await connectDB()

    const media = await MediaUpload.create({
      filename: filename || `upload-${Date.now()}.jpg`,
      contentType,
      data: base64Data,
      size,
      context: context || 'general',
    })

    // Return the URL that will serve this image
    const url = `/api/media/${media._id}`

    return NextResponse.json({ success: true, url, id: media._id }, { status: 201 })
  } catch (err) {
    console.error('Media upload API error:', err)
    return NextResponse.json({ error: 'Server error during upload.' }, { status: 500 })
  }
}
