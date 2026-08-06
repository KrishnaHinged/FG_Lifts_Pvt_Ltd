import { NextResponse } from 'next/server'
import { getAdmin } from '@/lib/auth'
import { fetchSiteSettings, saveSiteSettings } from '@/services/siteSettings.service'
import { hasPermission } from '@/permissions/permissions'
import { PERMISSIONS } from '@/permissions/roles'

export async function GET(req) {
  try {
    const admin = getAdmin(req)
    if (!admin || (!hasPermission(admin, PERMISSIONS.VIEW_SETTINGS) && !hasPermission(admin, PERMISSIONS.MANAGE_SETTINGS))) {
      return NextResponse.json({ error: '403 Forbidden' }, { status: 403 })
    }

    const settings = await fetchSiteSettings()
    return NextResponse.json({ success: true, settings })
  } catch (err) {
    console.error('Fetch site settings API error:', err)
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}

export async function PUT(req) {
  try {
    const admin = getAdmin(req)
    if (!admin || !hasPermission(admin, PERMISSIONS.MANAGE_SETTINGS)) {
      return NextResponse.json({ error: '403 Forbidden — Settings management permission required.' }, { status: 403 })
    }

    const body = await req.json()
    const updatedSettings = await saveSiteSettings(body, admin)

    return NextResponse.json({
      success: true,
      message: 'Website settings updated successfully',
      settings: updatedSettings
    })
  } catch (err) {
    console.error('Update site settings API error:', err)
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 })
  }
}
