import { getAllProducts } from '@/repositories/product.repository'
import { getAllPublishedPosts } from '@/repositories/blog.repository'
import { generateSitemapEntries } from '@/seo/sitemap'

export default async function sitemap() {
  let products = []
  let posts = []

  try {
    products = await getAllProducts()
  } catch (err) {
    console.warn('[sitemap.js] Failed to fetch products:', err.message)
  }

  try {
    posts = await getAllPublishedPosts()
  } catch (err) {
    console.warn('[sitemap.js] Failed to fetch blog posts:', err.message)
  }

  return generateSitemapEntries({ products, posts })
}
