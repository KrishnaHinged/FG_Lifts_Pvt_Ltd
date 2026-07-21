import companyConfig from '@/config/company'

/**
 * Pure SEO metatag generators.
 */

export function createMetaTitle(pageTitle) {
  if (!pageTitle) return companyConfig.name
  return `${pageTitle} | ${companyConfig.name}`
}

export function createCanonical(pathname) {
  const base = process.env.NEXT_PUBLIC_URL || 'https://fglifts.com'
  const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`
  return `${base}${cleanPath}`
}

export function generateJsonLd(type, data = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    ...data
  }
}

export default {
  createMetaTitle,
  createCanonical,
  generateJsonLd
}
