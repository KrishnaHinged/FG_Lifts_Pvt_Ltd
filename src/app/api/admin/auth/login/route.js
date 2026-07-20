import { NextResponse } from 'next/server'
import { findAdminByEmail, updateLastLogin } from '@/repositories/admin.repository'
import { comparePassword, signToken, getCookieOptions, COOKIE_NAME } from '@/lib/auth'
import { createLog } from '@/repositories/auditLog.repository'

export async function POST(req) {
  try {
    const { email, password } = await req.json()
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required.' }, { status: 400 })
    }

    const admin = await findAdminByEmail(email)
    if (!admin) {
      return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 })
    }

    const valid = await comparePassword(password, admin.password)
    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 })
    }

    await updateLastLogin(admin._id)

    const token = signToken({
      id:    admin._id.toString(),
      email: admin.email,
      name:  admin.name,
      role:  admin.role,
    })

    await createLog({
      action:      'admin_login',
      performedBy: { adminId: admin._id, name: admin.name, email: admin.email, role: admin.role },
      ipAddress:   req.headers.get('x-forwarded-for') || 'unknown',
    })

    const response = NextResponse.json({
      success: true,
      admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role }
    })
    response.cookies.set(COOKIE_NAME, token, getCookieOptions())
    return response
  } catch (err) {
    console.error('Login error:', err)
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}
