import { NextResponse } from 'next/server'
import { fetchSiteSettings } from '@/services/siteSettings.service'

export async function GET() {
  try {
    const settings = await fetchSiteSettings()
    return NextResponse.json({ success: true, settings })
  } catch (err) {
    console.error('Public fetch settings API error:', err)
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}
