import { getAssetUrl } from '@/adapters/storage.adapter'

export function mapToProductDTO(product) {
  if (!product) return null
  return {
    id: product._id?.toString(),
    slug: product.slug,
    name: product.name,
    tagline: product.tagline || '',
    category: product.category,
    subCategory: product.subCategory || '',
    tabGroup: product.tabGroup || 'Systems',
    description: product.description || '',
    specifications: (product.specifications || []).map(s => ({
      key: s.key,
      value: s.value
    })),
    features: product.features || [],
    applications: product.applications || [],
    images: (product.images || []).map(img => ({
      url: getAssetUrl(img.url),
      alt: img.alt || product.name
    })),
    brochureUrl: product.brochureUrl ? getAssetUrl(product.brochureUrl) : '',
    has360View: !!product.has360View,
    defaultColor: product.defaultColor || '',
    defaultFinish: product.defaultFinish || '',
    colorVariants: (product.colorVariants || []).map(c => ({
      name: c.name,
      hex: c.hex,
      panoramaImages: (c.panoramaImages || []).map(url => getAssetUrl(url)),
      isActive: !!c.isActive
    })),
    finishVariants: (product.finishVariants || []).map(f => ({
      name: f.name,
      isActive: !!f.isActive
    })),
    isFeatured: !!product.isFeatured,
    badge: product.badge || '',
    isActive: !!product.isActive,
    sortOrder: product.sortOrder || 0
  }
}

export function mapToProductListDTO(products) {
  if (!Array.isArray(products)) return []
  return products.map(mapToProductDTO)
}
