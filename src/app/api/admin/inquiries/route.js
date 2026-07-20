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

export async function GET(req) {
  try {
    const admin = getAdmin(req)
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await connectDB()

    const { searchParams } = new URL(req.url)
    const statusParam = searchParams.get('status')

    let query = {}
    if (statusParam) {
      query.status = statusParam
    }

    // Sales Executive only sees their own
    if (admin.role === 'SALES_EXECUTIVE') {
      query.assignedTo = admin.id
    }

    const inquiries = await Inquiry.find(query)
      .populate('assignedTo', 'name email role')
      .populate('assignedBy', 'name email')
      .sort({ createdAt: -1 })
      .lean()

    return NextResponse.json({ success: true, inquiries })
  } catch (err) {
    console.error('Fetch inquiries error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function PATCH(req) {
  try {
    const admin = getAdmin(req)
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id, assignedTo, status } = await req.json()

    await connectDB()
    const inquiry = await Inquiry.findById(id)
    if (!inquiry) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    // Assignment — Sales Manager and Super Admin only
    if (assignedTo !== undefined) {
      if (!hasPermission(admin, PERMISSIONS.ASSIGN_INQUIRY)) {
        return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
      }
      
      const previousAssignedTo = inquiry.assignedTo;
      
      inquiry.assignedTo  = assignedTo || null
      inquiry.assignedBy  = admin.id
      inquiry.assignedAt  = assignedTo ? new Date() : null

      await inquiry.save()

      // Log audit trail
      await createLog({
        action: 'inquiry_assigned',
        performedBy: { adminId: admin.id, name: admin.name, email: admin.email, role: admin.role },
        targetId: inquiry._id.toString(),
        targetType: 'Inquiry',
        details: { previousAssignedTo, newAssignedTo: assignedTo }
      })

      // Send lead assigned email to the executive
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

    // Status update
    if (status !== undefined) {
      if (!hasPermission(admin, PERMISSIONS.UPDATE_INQUIRY_STATUS)) {
        return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
      }
      
      // Sales Executive can only update their own
      if (admin.role === 'SALES_EXECUTIVE' && inquiry.assignedTo?.toString() !== admin.id) {
        return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
      }

      const oldStatus = inquiry.status
      inquiry.status = status

      await inquiry.save()

      // Log audit trail
      await createLog({
        action: 'inquiry_status_changed',
        performedBy: { adminId: admin.id, name: admin.name, email: admin.email, role: admin.role },
        targetId: inquiry._id.toString(),
        targetType: 'Inquiry',
        details: { oldStatus, newStatus: status }
      })
    }

    return NextResponse.json({ success: true, inquiry })
  } catch (err) {
    console.error('Update inquiry error:', err)
    return NextResponse.json({ error: 'Server error: ' + err.message }, { status: 500 })
  }
}
