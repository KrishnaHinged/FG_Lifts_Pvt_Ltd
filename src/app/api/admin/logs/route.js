import { NextResponse } from 'next/server'
import { getAdmin } from '@/lib/auth'
import { getAuditLogs } from '@/services/audit.service'
import { hasPermission } from '@/permissions/permissions'
import { PERMISSIONS } from '@/permissions/roles'

export async function GET(req) {
  try {
    const admin = getAdmin(req)
    if (!admin || !hasPermission(admin, PERMISSIONS.VIEW_LOGS)) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page'), 10) || 1
    const limit = parseInt(searchParams.get('limit'), 10) || 50
    const action = searchParams.get('action') || null
    const adminId = searchParams.get('adminId') || null

    const result = await getAuditLogs({ page, limit, action, adminId })
    return NextResponse.json({ success: true, ...result })
  } catch (err) {
    console.error('Fetch logs API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
