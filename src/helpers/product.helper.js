import { getAssetUrl } from '@/adapters/storage.adapter'

/**
 * Project-specific Product catalog helper.
 */

export function buildSpecificationTable(product) {
  if (!product || !Array.isArray(product.specifications)) return []
  return product.specifications.map(spec => ({
    label: spec.key,
    value: spec.value
  }))
}

export function generateBadge(product) {
  if (!product) return ''
  if (product.badge) return product.badge
  if (product.has360View) return '360° View'
  if (product.isFeatured) return 'Featured'
  return ''
}

export function normalizeProduct(product) {
  if (!product) return null
  return {
    ...product,
    badgeText: generateBadge(product),
    coverImage: product.images?.[0]?.url || '/images/placeholder.jpg'
  }
}

export function getProductCategories() {
  return ['Passenger', 'Goods', 'Capsule', 'Home', 'Hospital', 'Panoramic']
}

export default {
  buildSpecificationTable,
  generateBadge,
  normalizeProduct,
  getProductCategories
}
