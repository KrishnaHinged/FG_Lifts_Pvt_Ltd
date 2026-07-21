import { NextResponse } from 'next/server'
import { getAdmin } from '@/lib/auth'
import { getAllAdmins, createAdmin } from '@/services/admin.service'
import { createAuditLog } from '@/services/audit.service'
import { hasPermission } from '@/permissions/permissions'
import { PERMISSIONS } from '@/permissions/roles'

export async function GET(req) {
  try {
    const admin = getAdmin(req)
    if (!admin || !hasPermission(admin, PERMISSIONS.VIEW_USERS)) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    const users = await getAllAdmins()
    return NextResponse.json({ success: true, users })
  } catch (err) {
    console.error('Fetch users admin API error:', err)
    return NextResponse.json({ error: err.error || 'Server error' }, { status: err.status || 500 })
  }
}

export async function POST(req) {
  try {
    const admin = getAdmin(req)
    if (!admin || !hasPermission(admin, PERMISSIONS.CREATE_USER)) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    const body = await req.json()
    const { role } = body

    // Role restrictions: only SUPER_ADMIN can assign SUPER_ADMIN role
    if (role === 'SUPER_ADMIN' && admin.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: '403 Forbidden — Cannot assign Super Admin role' }, { status: 403 })
    }

    const newUser = await createAdmin(body, admin)

    // Log action
    try {
      await createAuditLog({
        action: 'user_created',
        performedBy: admin,
        targetId: newUser.id,
        targetType: 'Admin',
        details: { name: newUser.name, email: newUser.email, role: newUser.role },
        ipAddress: req.headers.get('x-forwarded-for') || 'unknown'
      })
    } catch (logErr) {
      console.error('Failed to log user creation audit trail:', logErr)
    }

    return NextResponse.json({
      success: true,
      user: newUser
    }, { status: 201 })
  } catch (err) {
    if (err.status === 400) {
      return NextResponse.json({ error: Object.values(err.errors)[0] || err.error }, { status: 400 })
    }
    console.error('Create user API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
