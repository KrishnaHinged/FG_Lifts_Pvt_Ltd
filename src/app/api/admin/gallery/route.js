import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import GalleryProject from '@/models/GalleryProject'
import { verifyToken, COOKIE_NAME } from '@/lib/auth'
import { hasPermission } from '@/permissions/permissions'
import { PERMISSIONS } from '@/permissions/roles'
import { createLog } from '@/repositories/auditLog.repository'

function getAdmin(req) {
  const token = req.cookies.get(COOKIE_NAME)?.value
  return token ? verifyToken(token) : null
}

export async function GET(req) {
  try {
    const admin = getAdmin(req)
    if (!admin || !hasPermission(admin, PERMISSIONS.VIEW_GALLERY)) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    await connectDB()
    const projects = await GalleryProject.find().sort({ sortOrder: 1, createdAt: -1 }).lean()
    return NextResponse.json({ success: true, projects })
  } catch (err) {
    console.error('Fetch gallery projects error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const admin = getAdmin(req)
    if (!admin || !hasPermission(admin, PERMISSIONS.CREATE_GALLERY)) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    const body = await req.json()
    const { slug, title } = body

    if (!slug || !title) {
      return NextResponse.json({ error: 'Slug and title are required' }, { status: 400 })
    }

    await connectDB()
    const existing = await GalleryProject.findOne({ slug: slug.toLowerCase() })
    if (existing) {
      return NextResponse.json({ error: 'Project slug already exists' }, { status: 409 })
    }

    const project = await GalleryProject.create(body)

    // Log action
    await createLog({
      action: 'gallery_created',
      performedBy: { adminId: admin.id, name: admin.name, email: admin.email, role: admin.role },
      targetId: project._id.toString(),
      targetType: 'GalleryProject',
      details: { title: project.title, slug: project.slug }
    })

    return NextResponse.json({ success: true, project }, { status: 201 })
  } catch (err) {
    console.error('Create project error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
