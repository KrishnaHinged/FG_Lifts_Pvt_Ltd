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

export async function GET(req, { params }) {
  try {
    const { id } = await params
    const admin = getAdmin(req)
    if (!admin || !hasPermission(admin, PERMISSIONS.VIEW_GALLERY)) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    await connectDB()
    const project = await GalleryProject.findById(id).lean()
    if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    return NextResponse.json({ success: true, project })
  } catch (err) {
    console.error('Fetch project detail error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params
    const admin = getAdmin(req)
    if (!admin || !hasPermission(admin, PERMISSIONS.EDIT_GALLERY)) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    const body = await req.json()
    await connectDB()
    const project = await GalleryProject.findByIdAndUpdate(id, body, { new: true }).lean()
    if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 })

    // Log action
    await createLog({
      action: 'gallery_updated',
      performedBy: { adminId: admin.id, name: admin.name, email: admin.email, role: admin.role },
      targetId: id,
      targetType: 'GalleryProject',
      details: { title: project.title, slug: project.slug }
    })

    return NextResponse.json({ success: true, project })
  } catch (err) {
    console.error('Update project error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params
    const admin = getAdmin(req)
    if (!admin || !hasPermission(admin, PERMISSIONS.DELETE_GALLERY)) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    await connectDB()
    const project = await GalleryProject.findByIdAndDelete(id)
    if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 })

    // Log action
    await createLog({
      action: 'gallery_deleted',
      performedBy: { adminId: admin.id, name: admin.name, email: admin.email, role: admin.role },
      targetId: id,
      targetType: 'GalleryProject',
      details: { title: project.title, slug: project.slug }
    })

    return NextResponse.json({ success: true, message: 'Project deleted successfully' })
  } catch (err) {
    console.error('Delete project error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
export async function PATCH(req, { params }) {
  try {
    const { id } = await params
    const admin = getAdmin(req)
    if (!admin || !hasPermission(admin, PERMISSIONS.EDIT_GALLERY)) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    const body = await req.json()
    await connectDB()
    const project = await GalleryProject.findByIdAndUpdate(id, body, { new: true }).lean()
    if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 })

    // Log action
    await createLog({
      action: 'gallery_updated',
      performedBy: { adminId: admin.id, name: admin.name, email: admin.email, role: admin.role },
      targetId: id,
      targetType: 'GalleryProject',
      details: { title: project.title, slug: project.slug, patch: true }
    })

    return NextResponse.json({ success: true, project })
  } catch (err) {
    console.error('Patch project error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
