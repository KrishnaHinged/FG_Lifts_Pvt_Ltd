import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { updateTemplate } from '@/repositories/emailTemplate.repository'
import { verifyToken, COOKIE_NAME } from '@/lib/auth'
import { hasPermission } from '@/permissions/permissions'
import { PERMISSIONS } from '@/permissions/roles'
import { createLog } from '@/repositories/auditLog.repository'

function getAdmin(req) {
  const token = req.cookies.get(COOKIE_NAME)?.value
  return token ? verifyToken(token) : null
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params
    const admin = getAdmin(req)
    if (!admin || !hasPermission(admin, PERMISSIONS.EDIT_EMAIL_TEMPLATES)) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    const { subject, body } = await req.json()
    if (!subject || !body) {
      return NextResponse.json({ error: 'Subject and body are required' }, { status: 400 })
    }

    await connectDB()
    const template = await updateTemplate(id, { subject, body })
    if (!template) return NextResponse.json({ error: 'Template not found' }, { status: 404 })

    // Log action
    await createLog({
      action: 'template_updated',
      performedBy: { adminId: admin.id, name: admin.name, email: admin.email, role: admin.role },
      targetId: id,
      targetType: 'EmailTemplate',
      details: { name: template.name, subject: template.subject }
    })

    return NextResponse.json({ success: true, template })
  } catch (err) {
    console.error('Update template error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
