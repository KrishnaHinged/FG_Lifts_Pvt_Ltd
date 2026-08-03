/**
 * Dynamic Sitemap Generator Helper
 * FG Lifts Pvt. Ltd.
 */

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://fglifts.com'

export function generateSitemapEntries({ products = [], galleryProjects = [] } = {}) {
  const staticRoutes = [
    '',
    '/about',
    '/products',
    '/gallery',
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

  return [...staticRoutes, ...productRoutes]
}

export default generateSitemapEntries
