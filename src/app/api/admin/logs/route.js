import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { getLogs } from '@/repositories/auditLog.repository'
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
    if (!admin || !hasPermission(admin, PERMISSIONS.VIEW_LOGS)) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page')) || 1
    const limit = parseInt(searchParams.get('limit')) || 50
    const action = searchParams.get('action') || null
    const adminId = searchParams.get('adminId') || null

    await connectDB()
    const result = await getLogs({ page, limit, action, adminId })
    return NextResponse.json({ success: true, ...result })
  } catch (err) {
    console.error('Fetch logs error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
