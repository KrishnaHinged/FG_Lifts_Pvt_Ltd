import { getAssetUrl } from '@/adapters/storage.adapter'

export function mapToGalleryDTO(project) {
  if (!project) return null
  return {
    id: project._id?.toString(),
    _id: project._id?.toString(),
    title: project.title || '',
    subtitle: project.subtitle || '',
    slug: project.slug || '',
    location: project.location || '',
    clientType: project.clientType || '',
    category: project.category || project.clientType || '',
    year: project.year || project.completionYear || null,
    completionYear: project.completionYear || project.year || new Date().getFullYear(),
    description: project.description || '',
    coverImage: getAssetUrl(project.coverImage || (Array.isArray(project.images) && project.images[0] ? project.images[0] : '')),
    images: (project.images || []).map(img => typeof img === 'string' ? getAssetUrl(img) : getAssetUrl(img.url)),
    badge: project.badge || '',
    isFeatured: !!project.isFeatured,
    isActive: typeof project.isActive === 'boolean' ? project.isActive : true,
    sortOrder: project.sortOrder || 0,
    linkedProducts: project.linkedProducts || [],
    relatedProductSlugs: project.relatedProductSlugs || [],
    seoTitle: project.seoTitle || '',
    seoDescription: project.seoDescription || '',
    seoKeywords: project.seoKeywords || '',
  }
}

export function mapToGalleryListDTO(projects) {
  if (!Array.isArray(projects)) return []
  return projects.map(mapToGalleryDTO)
}

