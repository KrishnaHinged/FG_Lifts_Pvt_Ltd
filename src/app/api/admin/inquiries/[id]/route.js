import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Inquiry from '@/models/Inquiry'
import Admin from '@/models/Admin'
import { verifyToken, COOKIE_NAME } from '@/lib/auth'
import { hasPermission } from '@/permissions/permissions'
import { PERMISSIONS } from '@/permissions/roles'
import { createLog } from '@/repositories/auditLog.repository'

function getAdmin(req) {
  const token = req.cookies.get(COOKIE_NAME)?.value
  return token ? verifyToken(token) : null
}

export async function GET(req, { params }) {
  try {
    const { id } = await params
    const admin = getAdmin(req)
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await connectDB()
    const inquiry = await Inquiry.findById(id)
      .populate('assignedTo', 'name email role')
      .populate('assignedBy', 'name email')
      .lean()

    if (!inquiry) return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 })

    // Sales Executive can only view their own
    if (admin.role === 'SALES_EXECUTIVE' && inquiry.assignedTo?._id?.toString() !== admin.id) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    return NextResponse.json({ success: true, inquiry })
  } catch (err) {
    console.error('Fetch inquiry detail error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function PATCH(req, { params }) {
  try {
    const { id } = await params
    const admin = getAdmin(req)
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { note, noteText, status, assignedTo } = await req.json()

    await connectDB()
    const inquiry = await Inquiry.findById(id)
    if (!inquiry) return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 })

    // Sales Executive can only modify their own
    if (admin.role === 'SALES_EXECUTIVE' && inquiry.assignedTo?.toString() !== admin.id) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    let updated = false

    // Note adding
    const targetNote = noteText || note
    if (targetNote !== undefined) {
      if (!hasPermission(admin, PERMISSIONS.ADD_INQUIRY_NOTE)) {
        return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
      }
      if (!targetNote.trim()) {
        return NextResponse.json({ error: 'Note text cannot be empty' }, { status: 400 })
      }

      inquiry.notes.push({
        text: targetNote,
        adminName: admin.name,
        adminId: admin.id,
        createdAt: new Date()
      })
      updated = true

      // Log audit trail
      await createLog({
        action: 'inquiry_note_added',
        performedBy: { adminId: admin.id, name: admin.name, email: admin.email, role: admin.role },
        targetId: inquiry._id.toString(),
        targetType: 'Inquiry',
        details: { noteSnippet: targetNote.slice(0, 100) }
      })
    }

    // Status Changer
    if (status !== undefined) {
      if (!hasPermission(admin, PERMISSIONS.UPDATE_INQUIRY_STATUS)) {
        return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
      }
      const oldStatus = inquiry.status
      inquiry.status = status
      updated = true

      // Log audit trail
      await createLog({
        action: 'inquiry_status_changed',
        performedBy: { adminId: admin.id, name: admin.name, email: admin.email, role: admin.role },
        targetId: inquiry._id.toString(),
        targetType: 'Inquiry',
        details: { oldStatus, newStatus: status }
      })
    }

    // Assignment Changer
    if (assignedTo !== undefined) {
      if (!hasPermission(admin, PERMISSIONS.ASSIGN_INQUIRY)) {
        return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
      }
      const previousAssignedTo = inquiry.assignedTo
      inquiry.assignedTo = assignedTo || null
      inquiry.assignedBy = admin.id
      inquiry.assignedAt = assignedTo ? new Date() : null
      updated = true

      // Log audit trail
      await createLog({
        action: 'inquiry_assigned',
        performedBy: { adminId: admin.id, name: admin.name, email: admin.email, role: admin.role },
        targetId: inquiry._id.toString(),
        targetType: 'Inquiry',
        details: { previousAssignedTo, newAssignedTo: assignedTo }
      })

      // Send email notification
      if (assignedTo) {
        try {
          const executive = await Admin.findById(assignedTo)
          if (executive) {
            const { sendLeadAssignedEmail } = await import('@/services/email.service')
            await sendLeadAssignedEmail({ executive, inquiry, manager: admin })
          }
        } catch (emailErr) {
          console.error('Failed to send lead assignment email:', emailErr)
        }
      }
    }

    if (updated) {
      await inquiry.save()
    }

    // Populate assignedTo and assignedBy for returning
    const populatedInquiry = await Inquiry.findById(inquiry._id)
      .populate('assignedTo', 'name email role')
      .populate('assignedBy', 'name email')
      .lean()

    return NextResponse.json({ success: true, inquiry: populatedInquiry })
  } catch (err) {
    console.error('Update inquiry error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params
    const admin = getAdmin(req)
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    if (!hasPermission(admin, PERMISSIONS.DELETE_INQUIRY)) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    await connectDB()
    const inquiry = await Inquiry.findByIdAndDelete(id)
    if (!inquiry) return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 })

    // Log audit trail
    await createLog({
      action: 'inquiry_deleted',
      performedBy: { adminId: admin.id, name: admin.name, email: admin.email, role: admin.role },
      targetId: id,
      targetType: 'Inquiry',
      details: { name: inquiry.name, email: inquiry.email }
    })

    return NextResponse.json({ success: true, message: 'Inquiry deleted successfully' })
  } catch (err) {
    console.error('Delete inquiry error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
