import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { updateAdmin, toggleAdminStatus } from '@/repositories/admin.repository'
import { verifyToken, COOKIE_NAME } from '@/lib/auth'
import { hasPermission } from '@/permissions/permissions'
import { PERMISSIONS } from '@/permissions/roles'
import { createLog } from '@/repositories/auditLog.repository'
import Admin from '@/models/Admin'

function getAdmin(req) {
  const token = req.cookies.get(COOKIE_NAME)?.value
  return token ? verifyToken(token) : null
}

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

    await connectDB()
    const target = await Admin.findById(id)
    if (!target) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    // Prevent deactivating self
    if (body.isActive === false && id === admin.id) {
      return NextResponse.json({ error: 'Cannot deactivate yourself' }, { status: 400 })
    }

    // Prevent changing role of last SUPER_ADMIN
    if (target.role === 'SUPER_ADMIN' && body.role !== 'SUPER_ADMIN' && body.role !== undefined) {
      const superAdminsCount = await Admin.countDocuments({ role: 'SUPER_ADMIN', isActive: true })
      if (superAdminsCount <= 1) {
        return NextResponse.json({ error: 'Cannot downgrade the last Super Admin' }, { status: 400 })
      }
    }

    const updated = await updateAdmin(id, body)

    // Log action
    if (body.isActive !== undefined && body.isActive !== target.isActive) {
      await createLog({
        action: body.isActive ? 'user_created' : 'user_deactivated', // closest action logs
        performedBy: { adminId: admin.id, name: admin.name, email: admin.email, role: admin.role },
        targetId: id,
        targetType: 'Admin',
        details: { name: updated.name, email: updated.email, isActive: body.isActive }
      })
    } else {
      await createLog({
        action: 'user_created',
        performedBy: { adminId: admin.id, name: admin.name, email: admin.email, role: admin.role },
        targetId: id,
        targetType: 'Admin',
        details: { name: updated.name, email: updated.email, updated: true }
      })
    }

    return NextResponse.json({ success: true, user: updated })
  } catch (err) {
    console.error('Update user error:', err)
    return NextResponse.json({ error: 'Server error: ' + err.message }, { status: 500 })
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

    // Prevent deleting self
    if (id === admin.id) {
      return NextResponse.json({ error: 'Cannot delete yourself' }, { status: 400 })
    }

    await connectDB()
    const target = await Admin.findById(id)
    if (!target) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    // Prevent deleting the last active SUPER_ADMIN
    if (target.role === 'SUPER_ADMIN') {
      const superAdminsCount = await Admin.countDocuments({ role: 'SUPER_ADMIN', isActive: true })
      if (superAdminsCount <= 1) {
        return NextResponse.json({ error: 'Cannot delete the last Super Admin' }, { status: 400 })
      }
    }

    await Admin.findByIdAndDelete(id)

    // Log action
    await createLog({
      action: 'user_deactivated', // closest delete/deactivate log code
      performedBy: { adminId: admin.id, name: admin.name, email: admin.email, role: admin.role },
      targetId: id,
      targetType: 'Admin',
      details: { name: target.name, email: target.email, deleted: true }
    })

    return NextResponse.json({ success: true, message: 'User deleted successfully' })
  } catch (err) {
    console.error('Delete user error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
