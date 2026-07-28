import { NextResponse } from 'next/server'
import { loginAdmin } from '@/services/admin.service'
import { createAuditLog } from '@/services/audit.service'
import { signToken, getCookieOptions } from '@/lib/auth'
import authConfig from '@/config/auth'
import { checkRateLimit } from '@/security/rateLimit'

export const dynamic = 'force-dynamic'

export async function POST(req) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1'
    const rateCheck = checkRateLimit(`login:${ip}`, 30, 15 * 60 * 1000) // max 30 attempts per 15 mins
    if (!rateCheck.allowed) {
      return NextResponse.json({ error: 'Too many login attempts. Please try again in 15 minutes.' }, { status: 429 })
    }

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
        ipAddress: ip
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
    if (err?.status === 400) {
      const msg = err.error || (err.errors ? (typeof err.errors === 'string' ? err.errors : Object.values(err.errors)[0]) : 'Email and password required.')
      return NextResponse.json({ error: msg }, { status: 400 })
    }
    if (err?.status === 401) {
      return NextResponse.json({ error: err.error || 'Invalid credentials.' }, { status: 401 })
    }
    console.error('Admin login API endpoint error:', err)

    // Detect MongoDB Atlas IP whitelist / connection errors
    const errMsg = err?.message || ''
    if (errMsg.includes('whitelist') || errMsg.includes('Could not connect') || errMsg.includes('ECONNREFUSED') || errMsg.includes('MongoServerSelectionError')) {
      return NextResponse.json({
        error: 'Database connection failed. Please ensure the server IP is whitelisted in MongoDB Atlas Network Access (set 0.0.0.0/0 for Vercel).'
      }, { status: 503 })
    }

    return NextResponse.json({ error: 'Server error during login. Please try again.' }, { status: 500 })
  }
}
