import { NextResponse } from 'next/server'
import { getAdmin } from '@/lib/auth'
import { exportLeadsToCSV } from '@/services/inquiry.service'
import { createAuditLog } from '@/services/audit.service'
import { hasPermission } from '@/permissions/permissions'
import { PERMISSIONS } from '@/permissions/roles'

export async function GET(req) {
  try {
    const admin = getAdmin(req)
    if (!admin || !hasPermission(admin, PERMISSIONS.EXPORT_CRM)) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    const csv = await exportLeadsToCSV()

    // Log the export action
    try {
      await createAuditLog({
        action: 'subscriber_exported', // Keep consistent with database expectations
        performedBy: admin,
        details: { exportType: 'CRM Inquiries' },
        ipAddress: req.headers.get('x-forwarded-for') || 'unknown'
      })
    } catch (logErr) {
      console.error('Failed to log inquiry export audit trail:', logErr)
    }

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="fg-lift-inquiries-${Date.now()}.csv"`
      }
    })
  } catch (err) {
    console.error('Inquiries export API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
