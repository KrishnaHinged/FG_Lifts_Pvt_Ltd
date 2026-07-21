import { getAssetUrl } from '@/adapters/storage.adapter'

export function mapToGalleryDTO(project) {
  if (!project) return null
  return {
    id: project._id?.toString(),
    title: project.title,
    location: project.location || '',
    clientType: project.clientType || '',
    category: project.category || '',
    year: project.year || null,
    description: project.description || '',
    coverImage: getAssetUrl(project.coverImage),
    images: (project.images || []).map(getAssetUrl),
    relatedProductSlugs: project.relatedProductSlugs || [],
    isActive: !!project.isActive,
    sortOrder: project.sortOrder || 0
  }
}

export function mapToGalleryListDTO(projects) {
  if (!Array.isArray(projects)) return []
  return projects.map(mapToGalleryDTO)
}
