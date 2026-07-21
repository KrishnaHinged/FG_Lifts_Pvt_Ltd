import { NextResponse } from 'next/server'
import { getAdmin } from '@/lib/auth'
import { updateEmailTemplate } from '@/services/email.service'
import { createAuditLog } from '@/services/audit.service'
import { hasPermission } from '@/permissions/permissions'
import { PERMISSIONS } from '@/permissions/roles'

export async function PUT(req, { params }) {
  try {
    const { id } = await params
    const admin = getAdmin(req)
    if (!admin || !hasPermission(admin, PERMISSIONS.EDIT_EMAIL_TEMPLATES)) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    const body = await req.json()
    const template = await updateEmailTemplate(id, body)

    // Log action
    try {
      await createAuditLog({
        action: 'template_updated',
        performedBy: admin,
        targetId: id,
        targetType: 'EmailTemplate',
        details: { name: template.name, subject: template.subject },
        ipAddress: req.headers.get('x-forwarded-for') || 'unknown'
      })
    } catch (logErr) {
      console.error('Failed to log template update audit trail:', logErr)
    }

    return NextResponse.json({ success: true, template })
  } catch (err) {
    if (err.status === 400) {
      return NextResponse.json({ error: Object.values(err.errors)[0] || 'Subject and body are required' }, { status: 400 })
    }
    console.error('Update template API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
