import { NextResponse } from 'next/server'
import { getAdmin } from '@/lib/auth'
import { getAllProjectsAdmin, createProject } from '@/services/gallery.service'
import { createAuditLog } from '@/services/audit.service'
import { hasPermission } from '@/permissions/permissions'
import { PERMISSIONS } from '@/permissions/roles'

export async function GET(req) {
  try {
    const admin = getAdmin(req)
    if (!admin || !hasPermission(admin, PERMISSIONS.VIEW_GALLERY)) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    const projects = await getAllProjectsAdmin()
    return NextResponse.json({ success: true, projects })
  } catch (err) {
    console.error('Fetch gallery projects admin API error:', err)
    return NextResponse.json({ error: err.error || 'Server error' }, { status: err.status || 500 })
  }
}

export async function POST(req) {
  try {
    const admin = getAdmin(req)
    if (!admin || !hasPermission(admin, PERMISSIONS.CREATE_GALLERY)) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    const body = await req.json()
    const project = await createProject(body)

    // Log action
    try {
      await createAuditLog({
        action: 'gallery_created',
        performedBy: admin,
        targetId: project.id,
        targetType: 'GalleryProject',
        details: { title: project.title },
        ipAddress: req.headers.get('x-forwarded-for') || 'unknown'
      })
    } catch (logErr) {
      console.error('Failed to log gallery creation audit trail:', logErr)
    }

    return NextResponse.json({ success: true, project }, { status: 201 })
  } catch (err) {
    if (err.status === 400) {
      return NextResponse.json({ error: Object.values(err.errors)[0] || err.error }, { status: 400 })
    }
    console.error('Create gallery project API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
