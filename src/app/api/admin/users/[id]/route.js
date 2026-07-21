import { NextResponse } from 'next/server'
import { getAdmin } from '@/lib/auth'
import { updateAdmin, deleteAdmin, getAdminById } from '@/services/admin.service'
import { createAuditLog } from '@/services/audit.service'
import { hasPermission } from '@/permissions/permissions'
import { PERMISSIONS } from '@/permissions/roles'

export async function PUT(req, { params }) {
  try {
    const { id } = await params
    const admin = getAdmin(req)
    if (!admin || !hasPermission(admin, PERMISSIONS.EDIT_USER)) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    const body = await req.json()

    // Restrictions: only SUPER_ADMIN can assign SUPER_ADMIN role
    if (body.role === 'SUPER_ADMIN' && admin.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: '403 Forbidden — Cannot assign Super Admin role' }, { status: 403 })
    }

    const original = await getAdminById(id)
    const updated = await updateAdmin(id, body, admin)

    // Log action
    try {
      if (body.isActive !== undefined && body.isActive !== original.isActive) {
        await createAuditLog({
          action: body.isActive ? 'user_created' : 'user_deactivated',
          performedBy: admin,
          targetId: id,
          targetType: 'Admin',
          details: { name: updated.name, email: updated.email, isActive: body.isActive },
          ipAddress: req.headers.get('x-forwarded-for') || 'unknown'
        })
      } else {
        await createAuditLog({
          action: 'user_created',
          performedBy: admin,
          targetId: id,
          targetType: 'Admin',
          details: { name: updated.name, email: updated.email, updated: true },
          ipAddress: req.headers.get('x-forwarded-for') || 'unknown'
        })
      }
    } catch (logErr) {
      console.error('Failed to log user update audit trail:', logErr)
    }

    return NextResponse.json({ success: true, user: updated })
  } catch (err) {
    if (err.status === 400) {
      return NextResponse.json({ error: err.error }, { status: 400 })
    }
    console.error('Update user API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params
    const admin = getAdmin(req)
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // Only SUPER_ADMIN can delete users
    if (admin.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    const deletedUser = await deleteAdmin(id, admin)

    // Log action
    try {
      await createAuditLog({
        action: 'user_deactivated',
        performedBy: admin,
        targetId: id,
        targetType: 'Admin',
        details: { name: deletedUser.name, email: deletedUser.email, deleted: true },
        ipAddress: req.headers.get('x-forwarded-for') || 'unknown'
      })
    } catch (logErr) {
      console.error('Failed to log user deletion audit trail:', logErr)
    }

    return NextResponse.json({ success: true, message: 'User deleted successfully' })
  } catch (err) {
    if (err.status === 400) {
      return NextResponse.json({ error: err.error }, { status: 400 })
    }
    console.error('Delete user API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
