import { NextResponse } from 'next/server'
import { getAdmin } from '@/lib/auth'
import { getProjectById, updateProject, deleteProject } from '@/services/gallery.service'
import { createAuditLog } from '@/services/audit.service'
import { hasPermission } from '@/permissions/permissions'
import { PERMISSIONS } from '@/permissions/roles'

export async function GET(req, { params }) {
  try {
    const { id } = await params
    const admin = getAdmin(req)
    if (!admin || !hasPermission(admin, PERMISSIONS.VIEW_GALLERY)) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    const project = await getProjectById(id)
    return NextResponse.json({ success: true, project })
  } catch (err) {
    console.error('Fetch gallery project detail API error:', err)
    return NextResponse.json({ error: err.error || 'Server error' }, { status: err.status || 500 })
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
    const project = await updateProject(id, body)

    // Log action
    try {
      await createAuditLog({
        action: 'gallery_updated',
        performedBy: admin,
        targetId: id,
        targetType: 'GalleryProject',
        details: { title: project.title },
        ipAddress: req.headers.get('x-forwarded-for') || 'unknown'
      })
    } catch (logErr) {
      console.error('Failed to log gallery project update audit trail:', logErr)
    }

    return NextResponse.json({ success: true, project })
  } catch (err) {
    if (err.status === 400) {
      return NextResponse.json({ error: Object.values(err.errors)[0] || err.error }, { status: 400 })
    }
    console.error('Update gallery project API error:', err)
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

    const project = await deleteProject(id)

    // Log action
    try {
      await createAuditLog({
        action: 'gallery_deleted',
        performedBy: admin,
        targetId: id,
        targetType: 'GalleryProject',
        details: { title: project.title },
        ipAddress: req.headers.get('x-forwarded-for') || 'unknown'
      })
    } catch (logErr) {
      console.error('Failed to log gallery project deletion audit trail:', logErr)
    }

    return NextResponse.json({ success: true, message: 'Gallery project deleted successfully' })
  } catch (err) {
    console.error('Delete gallery project API error:', err)
    return NextResponse.json({ error: err.error || 'Server error' }, { status: err.status || 500 })
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
    const current = await getProjectById(id)
    const merged = { ...current, ...body }
    const project = await updateProject(id, merged)

    // Log action
    try {
      await createAuditLog({
        action: 'gallery_updated',
        performedBy: admin,
        targetId: id,
        targetType: 'GalleryProject',
        details: { title: project.title, patch: true },
        ipAddress: req.headers.get('x-forwarded-for') || 'unknown'
      })
    } catch (logErr) {
      console.error('Failed to log gallery project patch audit trail:', logErr)
    }

    return NextResponse.json({ success: true, project })
  } catch (err) {
    if (err.status === 400) {
      return NextResponse.json({ error: Object.values(err.errors)[0] || err.error }, { status: 400 })
    }
    console.error('Patch gallery project API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
