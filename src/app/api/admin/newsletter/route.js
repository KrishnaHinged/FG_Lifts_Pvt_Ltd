import { NextResponse } from 'next/server'
import { getAdmin } from '@/lib/auth'
import { getSubscribersList, getNewsletterStats, exportSubscribersToCSV } from '@/services/subscriber.service'
import { createAuditLog } from '@/services/audit.service'
import { hasPermission } from '@/permissions/permissions'
import { PERMISSIONS } from '@/permissions/roles'

export async function GET(req) {
  try {
    const admin = getAdmin(req)
    if (!admin || !hasPermission(admin, PERMISSIONS.VIEW_SUBSCRIBERS)) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(req.url)
    const isExport = searchParams.get('export') === 'true'

    if (isExport) {
      if (!hasPermission(admin, PERMISSIONS.EXPORT_SUBSCRIBERS)) {
        return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
      }

      const csv = await exportSubscribersToCSV()

      // Log action
      try {
        await createAuditLog({
          action: 'subscriber_exported',
          performedBy: admin,
          details: { exportType: 'Newsletter Subscribers' },
          ipAddress: req.headers.get('x-forwarded-for') || 'unknown'
        })
      } catch (logErr) {
        console.error('Failed to log subscriber export audit trail:', logErr)
      }

      return new NextResponse(csv, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="fg-lift-subscribers-${Date.now()}.csv"`
        }
      })
    }

    // Paginated list & Search
    const page = parseInt(searchParams.get('page'), 10) || 1
    const limit = parseInt(searchParams.get('limit'), 10) || 50
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || 'All'

    const result = await getSubscribersList({ page, limit, search, status })
    const stats = await getNewsletterStats()

    return NextResponse.json({
      success: true,
      subscribers: result.subscribers,
      total: result.total,
      page: result.page,
      pages: result.pages,
      stats
    })
  } catch (err) {
    console.error('Fetch subscribers API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
