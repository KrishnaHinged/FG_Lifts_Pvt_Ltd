import { connectDB } from '@/lib/mongodb'
import Product from '@/models/Product'

export async function getAllProducts(filters = {}) {
  await connectDB()
  const query = { isActive: true }
  if (filters.tabGroup)  query.tabGroup  = filters.tabGroup
  if (filters.category)  query.category  = filters.category
  return Product.find(query).sort({ sortOrder: 1, createdAt: -1 }).lean()
}

export async function getProductBySlug(slug) {
  await connectDB()
  return Product.findOne({ slug, isActive: true }).lean()
}

export async function getFeaturedProduct() {
  await connectDB()
  return Product.findOne({ isFeatured: true, isActive: true }).lean()
}

export async function getRelatedProducts(category, excludeSlug) {
  await connectDB()
  return Product.find({
    category,
    slug: { $ne: excludeSlug },
    isActive: true
  }).limit(4).sort({ sortOrder: 1 }).lean()
}
