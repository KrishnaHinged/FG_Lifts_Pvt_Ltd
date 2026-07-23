import { NextResponse } from 'next/server'
import { getAdmin } from '@/lib/auth'
import { getAllEmailTemplates } from '@/services/email.service'
import { hasPermission } from '@/permissions/permissions'
import { PERMISSIONS } from '@/permissions/roles'

export async function GET(req) {
  try {
    const admin = getAdmin(req)
    if (!admin || !hasPermission(admin, PERMISSIONS.VIEW_EMAIL_TEMPLATES)) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    const templates = await getAllEmailTemplates()
    return NextResponse.json({ success: true, templates })
  } catch (err) {
    console.error('Fetch email templates API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const admin = getAdmin(req)
    if (!admin || !hasPermission(admin, PERMISSIONS.EDIT_EMAIL_TEMPLATES)) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    const { connectDB } = await import('@/lib/mongodb')
    const EmailTemplate = (await import('@/models/EmailTemplate')).default
    await connectDB()

    const defaultTemplates = [
      {
        name: 'Inquiry Received Confirmation',
        code: 'inquiry_received',
        subject: 'Inquiry Received - Reference #{{referenceId}}',
        body: `<div style="font-family: sans-serif; padding: 24px; color: #111111; max-width: 600px; margin: 0 auto; border: 1px solid #E5E7EB; border-radius: 12px;"><h2 style="color: #0E4FB3;">FG Lift Pvt. Ltd.</h2><p>Dear {{name}},</p><p>Thank you for reaching out to us. We have received your product inquiry for <strong>{{product}}</strong>.</p><p style="margin-top: 30px; font-size: 12px; color: #7A7A7A;">Reference ID: {{referenceId}}</p></div>`,
        variables: ['{{name}}', '{{product}}', '{{referenceId}}']
      },
      {
        name: 'Lead Assignment Notification',
        code: 'lead_assigned',
        subject: 'Lead Assigned: {{clientName}}',
        body: `<div style="font-family: sans-serif; padding: 24px; color: #111111; max-width: 600px; margin: 0 auto; border: 1px solid #E5E7EB; border-radius: 12px;"><h2 style="color: #0E4FB3;">CRM Notification</h2><p>Hello {{executiveName}},</p><p>You have been assigned a new lead from <strong>{{clientName}}</strong> by <strong>{{assignedBy}}</strong>.</p></div>`,
        variables: ['{{executiveName}}', '{{clientName}}', '{{assignedBy}}']
      },
      {
        name: 'Newsletter Welcome Email',
        code: 'newsletter_welcome',
        subject: 'Welcome to FG Lift Insights!',
        body: `<div style="font-family: sans-serif; padding: 24px; color: #111111; max-width: 600px; margin: 0 auto; border: 1px solid #E5E7EB; border-radius: 12px;"><h2 style="color: #0E4FB3;">FG Lift Insights</h2><p>Hello {{name}},</p><p>Thank you for subscribing to our newsletter!</p></div>`,
        variables: ['{{name}}']
      }
    ]

    for (const temp of defaultTemplates) {
      const exists = await EmailTemplate.findOne({ code: temp.code })
      if (!exists) {
        await EmailTemplate.create(temp)
      }
    }

    const templates = await EmailTemplate.find().sort({ name: 1 }).lean()
    return NextResponse.json({ success: true, templates })
  } catch (err) {
    console.error('Seed email templates error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
