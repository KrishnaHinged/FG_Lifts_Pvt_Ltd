import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Subscriber from '@/models/Subscriber'
import { verifyToken, COOKIE_NAME } from '@/lib/auth'
import { hasPermission } from '@/permissions/permissions'
import { PERMISSIONS } from '@/permissions/roles'
import { createLog } from '@/repositories/auditLog.repository'

function getAdmin(req) {
  const token = req.cookies.get(COOKIE_NAME)?.value
  return token ? verifyToken(token) : null
}

export async function GET(req) {
  try {
    const admin = getAdmin(req)
    if (!admin || !hasPermission(admin, PERMISSIONS.VIEW_SUBSCRIBERS)) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(req.url)
    const isExport = searchParams.get('export') === 'true'

    await connectDB()

    if (isExport) {
      if (!hasPermission(admin, PERMISSIONS.EXPORT_SUBSCRIBERS)) {
        return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
      }

      const activeSubscribers = await Subscriber.find({ isActive: true }).sort({ createdAt: -1 }).lean()
      const header = ['Email', 'Name', 'Source', 'Subscribed At']
      const rows = activeSubscribers.map(s => [
        s.email,
        s.name || '',
        s.source || 'Footer Form',
        new Date(s.createdAt).toLocaleDateString('en-IN')
      ])

      const csv = [header, ...rows]
        .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
        .join('\n')

      // Log action
      await createLog({
        action: 'subscriber_exported',
        performedBy: { adminId: admin.id, name: admin.name, email: admin.email, role: admin.role },
        details: { exportCount: activeSubscribers.length }
      })

      return new NextResponse(csv, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="fg-lift-subscribers-${Date.now()}.csv"`,
        }
      })
    }

    // Paginated list
    const page = parseInt(searchParams.get('page')) || 1
    const limit = parseInt(searchParams.get('limit')) || 50
    const search = searchParams.get('search') || ''
    const statusFilter = searchParams.get('status') || 'All' // All | Active | Unsubscribed

    const query = {}
    if (search) {
      query.email = { $regex: search, $options: 'i' }
    }
    if (statusFilter === 'Active') {
      query.isActive = true
    } else if (statusFilter === 'Unsubscribed') {
      query.isActive = false
    }

    const skip = (page - 1) * limit
    const [subscribers, total] = await Promise.all([
      Subscriber.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Subscriber.countDocuments(query)
    ])

    // Get aggregated stats
    const [totalCount, activeCount, unsubscribedCount] = await Promise.all([
      Subscriber.countDocuments(),
      Subscriber.countDocuments({ isActive: true }),
      Subscriber.countDocuments({ isActive: false })
    ])

    return NextResponse.json({
      success: true,
      subscribers,
      total,
      page,
      pages: Math.ceil(total / limit),
      stats: {
        total: totalCount,
        active: activeCount,
        unsubscribed: unsubscribedCount
      }
    })
  } catch (err) {
    console.error('Fetch subscribers error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
