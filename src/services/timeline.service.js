import * as timelineRepo from '@/repositories/timeline.repository'
import { createAuditLog } from '@/services/audit.service'

export async function getPublicMilestones() {
  const milestones = await timelineRepo.getAllMilestonesPublic()
  return (milestones || []).map(m => ({
    id: m._id?.toString(),
    _id: m._id?.toString(),
    year: m.year,
    title: m.title,
    desc: m.desc,
    image: m.image || '',
    highlight: !!m.highlight,
    sortOrder: m.sortOrder || 0,
    isActive: typeof m.isActive === 'boolean' ? m.isActive : true
  }))
}

export async function getAdminMilestones() {
  const milestones = await timelineRepo.getAllMilestonesAdmin()
  return (milestones || []).map(m => ({
    id: m._id?.toString(),
    _id: m._id?.toString(),
    year: m.year,
    title: m.title,
    desc: m.desc,
    image: m.image || '',
    highlight: !!m.highlight,
    sortOrder: m.sortOrder || 0,
    isActive: typeof m.isActive === 'boolean' ? m.isActive : true
  }))
}

export async function getMilestoneById(id) {
  const m = await timelineRepo.getMilestoneById(id)
  if (!m) throw { status: 404, error: 'Milestone not found' }
  return {
    id: m._id?.toString(),
    _id: m._id?.toString(),
    year: m.year,
    title: m.title,
    desc: m.desc,
    image: m.image || '',
    highlight: !!m.highlight,
    sortOrder: m.sortOrder || 0,
    isActive: typeof m.isActive === 'boolean' ? m.isActive : true
  }
}

export async function createMilestone(data) {
  if (!data.year || !data.title || !data.desc) {
    throw { status: 400, errors: { year: 'Year, Title, and Description are required.' } }
  }
  const created = await timelineRepo.createMilestone(data)
  return created
}

export async function updateMilestone(id, data) {
  if (!data.year || !data.title || !data.desc) {
    throw { status: 400, errors: { year: 'Year, Title, and Description are required.' } }
  }
  const updated = await timelineRepo.updateMilestone(id, data)
  if (!updated) throw { status: 404, error: 'Milestone not found' }
  return updated
}

export async function deleteMilestone(id) {
  const deleted = await timelineRepo.deleteMilestone(id)
  if (!deleted) throw { status: 404, error: 'Milestone not found' }
  return deleted
}
