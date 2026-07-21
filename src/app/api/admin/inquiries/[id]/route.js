import { NextResponse } from 'next/server'
import { getAdmin } from '@/lib/auth'
import { getLeadById, addLeadNote, updateLeadStatus, assignLead, deleteLead } from '@/services/inquiry.service'
import { createAuditLog } from '@/services/audit.service'
import { hasPermission } from '@/permissions/permissions'
import { PERMISSIONS } from '@/permissions/roles'

export async function GET(req, { params }) {
  try {
    const { id } = await params
    const admin = getAdmin(req)
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const lead = await getLeadById(id, admin)
    return NextResponse.json({ success: true, inquiry: lead })
  } catch (err) {
    console.error('Fetch inquiry detail API error:', err)
    return NextResponse.json({ error: err.error || 'Server error' }, { status: err.status || 500 })
  }
}

export async function PATCH(req, { params }) {
  try {
    const { id } = await params
    const admin = getAdmin(req)
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { note, noteText, status, assignedTo } = await req.json()

    let updatedLead = null

    // 1. Note addition
    const targetNote = noteText || note
    if (targetNote !== undefined) {
      if (!hasPermission(admin, PERMISSIONS.ADD_INQUIRY_NOTE)) {
        return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
      }
      updatedLead = await addLeadNote(id, targetNote, admin)

      try {
        await createAuditLog({
          action: 'inquiry_note_added',
          performedBy: admin,
          targetId: id,
          targetType: 'Inquiry',
          details: { noteSnippet: targetNote.slice(0, 100) },
          ipAddress: req.headers.get('x-forwarded-for') || 'unknown'
        })
      } catch (logErr) {
        console.error('Failed to log note audit trail:', logErr)
      }
    }

    // 2. Status update
    if (status !== undefined) {
      if (!hasPermission(admin, PERMISSIONS.UPDATE_INQUIRY_STATUS)) {
        return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
      }
      const previousLead = await getLeadById(id, admin)
      const oldStatus = previousLead.status

      updatedLead = await updateLeadStatus(id, status, admin)

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
        console.error('Failed to log status audit trail:', logErr)
      }
    }

    // 3. Lead assignment
    if (assignedTo !== undefined) {
      if (!hasPermission(admin, PERMISSIONS.ASSIGN_INQUIRY)) {
        return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
      }
      const previousLead = await getLeadById(id, admin)
      const prevAssigned = previousLead.assignedTo?.id || null

      updatedLead = await assignLead(id, assignedTo, admin)

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
        console.error('Failed to log assign audit trail:', logErr)
      }
    }

    // If nothing was updated, load current state
    if (!updatedLead) {
      updatedLead = await getLeadById(id, admin)
    }

    return NextResponse.json({ success: true, inquiry: updatedLead })
  } catch (err) {
    console.error('Update inquiry API error:', err)
    return NextResponse.json({ error: err.error || 'Server error' }, { status: err.status || 500 })
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params
    const admin = getAdmin(req)
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!hasPermission(admin, PERMISSIONS.DELETE_INQUIRY)) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    const lead = await deleteLead(id, admin)

    try {
      await createAuditLog({
        action: 'inquiry_deleted',
        performedBy: admin,
        targetId: id,
        targetType: 'Inquiry',
        details: { name: lead.name, email: lead.email },
        ipAddress: req.headers.get('x-forwarded-for') || 'unknown'
      })
    } catch (logErr) {
      console.error('Failed to log delete audit trail:', logErr)
    }

    return NextResponse.json({ success: true, message: 'Inquiry deleted successfully' })
  } catch (err) {
    console.error('Delete inquiry API error:', err)
    return NextResponse.json({ error: err.error || 'Server error' }, { status: err.status || 500 })
  }
}
