/**
 * Dynamic Sitemap Generator Helper
 * FG Lifts Pvt. Ltd.
 */

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://fglifts.com'

export function generateSitemapEntries({ products = [], posts = [], galleryProjects = [] } = {}) {
  const staticRoutes = [
    '',
    '/about',
    '/products',
    '/gallery',
    '/blog',
  ].map(route => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8
  }))

  const productRoutes = products.map(prod => ({
    url: `${BASE_URL}/products/${prod.slug}`,
    lastModified: prod.updatedAt || new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.9
  }))

  const blogRoutes = posts.map(post => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.updatedAt || post.publishedAt || new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.7
  }))

  return [...staticRoutes, ...productRoutes, ...blogRoutes]
}

export default generateSitemapEntries
