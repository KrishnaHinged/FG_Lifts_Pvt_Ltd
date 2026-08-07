import { NextResponse } from 'next/server'
import { getActiveProjects } from '@/services/gallery.service'

export const dynamic = 'force-dynamic'

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    const projects = await getActiveProjects(category)
    return NextResponse.json({ success: true, projects })
  } catch (err) {
    console.error('Fetch gallery public API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
