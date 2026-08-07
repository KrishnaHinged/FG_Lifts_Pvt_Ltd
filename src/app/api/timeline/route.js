import { NextResponse } from 'next/server'
import { getPublicMilestones } from '@/services/timeline.service'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const milestones = await getPublicMilestones()
    return NextResponse.json({ success: true, milestones })
  } catch (err) {
    console.error('Fetch public timeline API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
