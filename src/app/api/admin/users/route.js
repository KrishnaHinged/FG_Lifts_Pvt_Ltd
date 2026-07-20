import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { getAllAdmins, createAdmin } from '@/repositories/admin.repository'
import { verifyToken, COOKIE_NAME } from '@/lib/auth'
import { hasPermission } from '@/permissions/permissions'
import { PERMISSIONS } from '@/permissions/roles'
import { createLog } from '@/repositories/auditLog.repository'
import Admin from '@/models/Admin'

function getAdmin(req) {
  const token = req.cookies.get(COOKIE_NAME)?.value
  return token ? verifyToken(token) : null
}

export async function GET(req) {
  try {
    const admin = getAdmin(req)
    if (!admin || !hasPermission(admin, PERMISSIONS.VIEW_USERS)) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    const users = await getAllAdmins()
    return NextResponse.json({ success: true, users })
  } catch (err) {
    console.error('Fetch users error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const admin = getAdmin(req)
    if (!admin || !hasPermission(admin, PERMISSIONS.CREATE_USER)) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    const { name, email, password, role } = await req.json()
    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    // Role restrictions: only SUPER_ADMIN can assign SUPER_ADMIN role
    if (role === 'SUPER_ADMIN' && admin.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: '403 Forbidden — Cannot assign Super Admin role' }, { status: 403 })
    }

    await connectDB()
    const existing = await Admin.findOne({ email: email.toLowerCase() })
    if (existing) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 409 })
    }

    const newUser = await createAdmin({
      name,
      email,
      password,
      role,
      createdBy: admin.id
    })

    // Log action
    await createLog({
      action: 'user_created',
      performedBy: { adminId: admin.id, name: admin.name, email: admin.email, role: admin.role },
      targetId: newUser._id.toString(),
      targetType: 'Admin',
      details: { name: newUser.name, email: newUser.email, role: newUser.role }
    })

    return NextResponse.json({
      success: true,
      user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role }
    }, { status: 201 })
  } catch (err) {
    console.error('Create user error:', err)
    return NextResponse.json({ error: 'Server error: ' + err.message }, { status: 500 })
  }
}
