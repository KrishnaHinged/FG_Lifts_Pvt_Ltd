import { NextResponse } from 'next/server'
import { loginAdmin } from '@/services/admin.service'
import { createAuditLog } from '@/services/audit.service'
import { signToken, getCookieOptions } from '@/lib/auth'
import authConfig from '@/config/auth'

export async function POST(req) {
  try {
    const body = await req.json()
    const admin = await loginAdmin(body)

    const token = signToken({
      id:    admin.id,
      email: admin.email,
      name:  admin.name,
      role:  admin.role,
    })

    // Log the login event
    try {
      await createAuditLog({
        action: 'admin_login',
        performedBy: admin,
        ipAddress: req.headers.get('x-forwarded-for') || 'unknown'
      })
    } catch (logErr) {
      console.error('Failed to write login audit log:', logErr)
    }

    const response = NextResponse.json({
      success: true,
      admin
    })
    response.cookies.set(authConfig.cookieName, token, getCookieOptions())
    return response
  } catch (err) {
    if (err.status === 400) {
      return NextResponse.json({ error: Object.values(err.errors)[0] || 'Email and password required.' }, { status: 400 })
    }
    if (err.status === 401) {
      return NextResponse.json({ error: err.error || 'Invalid credentials.' }, { status: 401 })
    }
    console.error('Admin login API endpoint error:', err)
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}
