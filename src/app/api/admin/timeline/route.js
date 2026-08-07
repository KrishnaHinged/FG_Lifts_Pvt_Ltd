import { NextResponse } from 'next/server'
import { getAdmin } from '@/lib/auth'
import { getAdminMilestones, createMilestone } from '@/services/timeline.service'
import { createAuditLog } from '@/services/audit.service'

export async function GET(req) {
  try {
    const admin = getAdmin(req)
    if (!admin) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    const milestones = await getAdminMilestones()
    return NextResponse.json({ success: true, milestones })
  } catch (err) {
    console.error('Fetch admin timeline API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const admin = getAdmin(req)
    if (!admin) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    const body = await req.json()
    const milestone = await createMilestone(body)

    try {
      await createAuditLog({
        action: 'timeline_created',
        performedBy: admin,
        targetId: milestone._id?.toString(),
        targetType: 'TimelineMilestone',
        details: { year: milestone.year, title: milestone.title },
        ipAddress: req.headers.get('x-forwarded-for') || 'unknown'
      })
    } catch (e) {
      console.warn('Audit log creation failed:', e.message)
    }

    return NextResponse.json({ success: true, milestone }, { status: 201 })
  } catch (err) {
    if (err.status === 400) {
      return NextResponse.json({ error: Object.values(err.errors || {})[0] || 'Bad request' }, { status: 400 })
    }
    console.error('Create timeline milestone API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
