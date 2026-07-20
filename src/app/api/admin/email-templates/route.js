import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { getAllTemplates } from '@/repositories/emailTemplate.repository'
import { verifyToken, COOKIE_NAME } from '@/lib/auth'
import { hasPermission } from '@/permissions/permissions'
import { PERMISSIONS } from '@/permissions/roles'

function getAdmin(req) {
  const token = req.cookies.get(COOKIE_NAME)?.value
  return token ? verifyToken(token) : null
}

export async function GET(req) {
  try {
    const admin = getAdmin(req)
    if (!admin || !hasPermission(admin, PERMISSIONS.VIEW_EMAIL_TEMPLATES)) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    await connectDB()
    const templates = await getAllTemplates()
    return NextResponse.json({ success: true, templates })
  } catch (err) {
    console.error('Fetch templates error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
