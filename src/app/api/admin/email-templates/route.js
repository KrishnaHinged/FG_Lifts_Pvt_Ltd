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
