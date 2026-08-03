import { getAllProducts } from '@/repositories/product.repository'
import { generateSitemapEntries } from '@/seo/sitemap'

export default async function sitemap() {
  let products = []

  try {
    products = await getAllProducts()
  } catch (err) {
    console.warn('[sitemap.js] Failed to fetch products:', err.message)
  }

  return generateSitemapEntries({ products })
}
