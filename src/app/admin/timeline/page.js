import { getAdminMilestones } from '@/services/timeline.service'
import TimelineClient from './TimelineClient'

export const dynamic = 'force-dynamic'

export default async function AdminTimelinePage() {
  const milestones = await getAdminMilestones()
  return <TimelineClient initialMilestones={milestones} />
}
