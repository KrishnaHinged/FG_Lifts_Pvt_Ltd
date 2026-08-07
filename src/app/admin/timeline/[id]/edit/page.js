import { getMilestoneById } from '@/services/timeline.service'
import EditMilestoneClient from './EditMilestoneClient'

export const dynamic = 'force-dynamic'

export default async function EditMilestonePage({ params }) {
  const { id } = await params
  const milestone = await getMilestoneById(id)
  return <EditMilestoneClient milestone={milestone} />
}
