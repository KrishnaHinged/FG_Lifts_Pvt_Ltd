import { connectDB } from '@/lib/mongodb'
import Product from '@/models/Product'
import { cacheStrategy } from '@/performance/cache'
import mockProducts from '@/lib/mockProducts.json'

export async function getAllProducts(filters = {}) {
  const cacheKey = `products_${JSON.stringify(filters)}`
  const cachedData = cacheStrategy.getMemory(cacheKey)
  if (cachedData) return cachedData

  let result
  try {
    await connectDB()
    const query = { isActive: true }
    if (filters.tabGroup) query.tabGroup = filters.tabGroup
    if (filters.category) query.category = filters.category
    
    result = await Product.find(query)
      .select('-colorVariants.panoramaImages -colorVariants.finishTextures -finishVariants')
      .sort({ sortOrder: 1, createdAt: -1 })
      .lean()
  } catch (dbErr) {
    console.warn(`[product.repository] getAllProducts failed (${dbErr.message}). Falling back to static mock data...`)
    result = mockProducts.filter(p => {
      if (!p.isActive) return false
      if (filters.tabGroup && p.tabGroup !== filters.tabGroup) return false
      if (filters.category && p.category?.toLowerCase() !== filters.category?.toLowerCase()) return false
      return true
    }).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
  }

  cacheStrategy.setMemory(cacheKey, result, 300)
  return result
}

export async function getProductBySlug(slug) {
  const cacheKey = `product_slug_${slug}`
  const cachedData = cacheStrategy.getMemory(cacheKey)
  if (cachedData) return cachedData

  let result
  try {
    await connectDB()
    result = await Product.findOne({ slug, isActive: true }).lean()
  } catch (dbErr) {
    console.warn(`[product.repository] getProductBySlug(${slug}) failed (${dbErr.message}). Falling back to static mock data...`)
    result = mockProducts.find(p => p.slug === slug && p.isActive) || null
  }
  
  if (result) {
    cacheStrategy.setMemory(cacheKey, result, 300)
  }
  return result
}

export async function getProductBySlugRaw(slug) {
  try {
    await connectDB()
    return await Product.findOne({ slug }).lean()
  } catch (dbErr) {
    console.warn(`[product.repository] getProductBySlugRaw(${slug}) failed. Falling back to static mock data...`)
    return mockProducts.find(p => p.slug === slug) || null
  }
}

export async function getFeaturedProduct() {
  const cacheKey = `product_featured`
  const cachedData = cacheStrategy.getMemory(cacheKey)
  if (cachedData) return cachedData

  let result
  try {
    await connectDB()
    result = await Product.findOne({ isFeatured: true, isActive: true }).lean()
  } catch (dbErr) {
    console.warn(`[product.repository] getFeaturedProduct failed (${dbErr.message}). Falling back to static mock data...`)
    result = mockProducts.find(p => p.isFeatured && p.isActive) || null
  }
  if (result) {
    cacheStrategy.setMemory(cacheKey, result, 300)
  }
  return result
}

export async function getRelatedProducts(category, excludeSlug) {
  const cacheKey = `related_products_${category}_${excludeSlug}`
  const cachedData = cacheStrategy.getMemory(cacheKey)
  if (cachedData) return cachedData

  let result
  try {
    await connectDB()
    result = await Product.find({
      category,
      slug: { $ne: excludeSlug },
      isActive: true
    })
      .select('-colorVariants.panoramaImages -colorVariants.finishTextures -finishVariants')
      .limit(4)
      .sort({ sortOrder: 1 })
      .lean()
  } catch (dbErr) {
    console.warn(`[product.repository] getRelatedProducts failed (${dbErr.message}). Falling back to static mock data...`)
    result = mockProducts
      .filter(p => p.category === category && p.slug !== excludeSlug && p.isActive)
      .slice(0, 4)
      .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
  }

  cacheStrategy.setMemory(cacheKey, result, 300)
  return result
}

// Admin database queries
export async function getAllProductsAdmin() {
  try {
    await connectDB()
    return await Product.find().sort({ sortOrder: 1, createdAt: -1 }).lean()
  } catch (dbErr) {
    console.warn(`[product.repository] getAllProductsAdmin failed. Falling back to static mock data...`)
    return mockProducts
  }
}

export async function getProductById(id) {
  try {
    await connectDB()
    return await Product.findById(id).lean()
  } catch (dbErr) {
    console.warn(`[product.repository] getProductById(${id}) failed. Falling back to static mock data...`)
    return mockProducts.find(p => p._id === id || p.slug === id) || null
  }
}

export async function createProduct(data) {
  await connectDB()
  const result = await Product.create(data)
  cacheStrategy.clearMemory()
  return result
}

export async function updateProduct(id, data) {
  await connectDB()
  const result = await Product.findByIdAndUpdate(id, data, { returnDocument: 'after' }).lean()
  cacheStrategy.clearMemory()
  return result
}

export async function deleteProduct(id) {
  await connectDB()
  const result = await Product.findByIdAndDelete(id).lean()
  cacheStrategy.clearMemory()
  return result
}

export async function countProducts(query = {}) {
  try {
    await connectDB()
    return await Product.countDocuments(query)
  } catch (dbErr) {
    return mockProducts.length
  }
}
