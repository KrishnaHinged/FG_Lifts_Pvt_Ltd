import { NextResponse } from 'next/server'
import { getAdmin } from '@/lib/auth'
import { getMilestoneById, updateMilestone, deleteMilestone } from '@/services/timeline.service'
import { createAuditLog } from '@/services/audit.service'

export async function GET(req, { params }) {
  try {
    const { id } = await params
    const admin = getAdmin(req)
    if (!admin) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    const milestone = await getMilestoneById(id)
    return NextResponse.json({ success: true, milestone })
  } catch (err) {
    return NextResponse.json({ error: err.error || 'Server error' }, { status: err.status || 500 })
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params
    const admin = getAdmin(req)
    if (!admin) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    const body = await req.json()
    const milestone = await updateMilestone(id, body)

    try {
      await createAuditLog({
        action: 'timeline_updated',
        performedBy: admin,
        targetId: id,
        targetType: 'TimelineMilestone',
        details: { year: milestone.year, title: milestone.title },
        ipAddress: req.headers.get('x-forwarded-for') || 'unknown'
      })
    } catch (e) {
      console.warn('Audit log creation failed:', e.message)
    }

    return NextResponse.json({ success: true, milestone })
  } catch (err) {
    if (err.status === 400) {
      return NextResponse.json({ error: Object.values(err.errors || {})[0] || 'Bad request' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params
    const admin = getAdmin(req)
    if (!admin) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    const milestone = await deleteMilestone(id)

    try {
      await createAuditLog({
        action: 'timeline_deleted',
        performedBy: admin,
        targetId: id,
        targetType: 'TimelineMilestone',
        details: { year: milestone.year, title: milestone.title },
        ipAddress: req.headers.get('x-forwarded-for') || 'unknown'
      })
    } catch (e) {
      console.warn('Audit log creation failed:', e.message)
    }

    return NextResponse.json({ success: true, message: 'Milestone deleted successfully' })
  } catch (err) {
    return NextResponse.json({ error: err.error || 'Server error' }, { status: err.status || 500 })
  }
}
