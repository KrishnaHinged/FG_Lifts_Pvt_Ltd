import { NextResponse } from 'next/server'
import { getAdmin } from '@/lib/auth'
import { getLeads, assignLead, updateLeadStatus } from '@/services/inquiry.service'
import { createAuditLog } from '@/services/audit.service'
import { hasPermission } from '@/permissions/permissions'
import { PERMISSIONS } from '@/permissions/roles'

export async function GET(req) {
  try {
    const admin = getAdmin(req)
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const statusParam = searchParams.get('status') || null
    const assignedTo = searchParams.get('assignedTo') || null

    const inquiries = await getLeads({ status: statusParam, assignedTo }, admin)
    return NextResponse.json({ success: true, inquiries })
  } catch (err) {
    console.error('Admin inquiries GET error:', err)
    return NextResponse.json({ error: err.error || 'Server error' }, { status: err.status || 500 })
  }
}

export async function PATCH(req) {
  try {
    const admin = getAdmin(req)
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id, assignedTo, status } = await req.json()

    let updatedLead = null

    // 1. Assignment
    if (assignedTo !== undefined) {
      if (!hasPermission(admin, PERMISSIONS.ASSIGN_INQUIRY)) {
        return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
      }

      const previousLead = await getLeads({ id }, admin)
      const prevAssigned = previousLead?.[0]?.assignedTo?.id || null

      updatedLead = await assignLead(id, assignedTo, admin)

      // Write audit log
      try {
        await createAuditLog({
          action: 'inquiry_assigned',
          performedBy: admin,
          targetId: id,
          targetType: 'Inquiry',
          details: { previousAssignedTo: prevAssigned, newAssignedTo: assignedTo },
          ipAddress: req.headers.get('x-forwarded-for') || 'unknown'
        })
      } catch (logErr) {
        console.error('Failed to write assign audit log:', logErr)
      }
    }

    // 2. Status update
    if (status !== undefined) {
      if (!hasPermission(admin, PERMISSIONS.UPDATE_INQUIRY_STATUS)) {
        return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
      }

      const previousLead = await getLeads({ id }, admin)
      const oldStatus = previousLead?.[0]?.status || ''

      updatedLead = await updateLeadStatus(id, status, admin)

      // Write audit log
      try {
        await createAuditLog({
          action: 'inquiry_status_changed',
          performedBy: admin,
          targetId: id,
          targetType: 'Inquiry',
          details: { oldStatus, newStatus: status },
          ipAddress: req.headers.get('x-forwarded-for') || 'unknown'
        })
      } catch (logErr) {
        console.error('Failed to write status audit log:', logErr)
      }
    }

    return NextResponse.json({ success: true, inquiry: updatedLead })
  } catch (err) {
    console.error('Admin inquiries PATCH error:', err)
    return NextResponse.json({ error: err.error || 'Server error' }, { status: err.status || 500 })
  }
}
