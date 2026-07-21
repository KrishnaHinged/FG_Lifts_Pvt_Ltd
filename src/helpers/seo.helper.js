import companyConfig from '@/config/company'
import seoConfig from '@/config/seo'

/**
 * Project-specific SEO helpers.
 */

export function buildCanonicalUrl(pathname) {
  const base = process.env.NEXT_PUBLIC_URL || 'https://fglifts.com'
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`
  return `${base}${path}`
}

export function buildSitemapEntry(path, changefreq = 'monthly', priority = 0.7) {
  const url = buildCanonicalUrl(path)
  return {
    url,
    lastModified: new Date().toISOString(),
    changeFrequency: changefreq,
    priority
  }
}

export function generateCorporateJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: companyConfig.name,
    image: `${process.env.NEXT_PUBLIC_URL || 'https://fglifts.com'}/images/og-home.jpg`,
    '@id': buildCanonicalUrl('/'),
    url: buildCanonicalUrl('/'),
    telephone: companyConfig.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: companyConfig.addresses.headquarters.street,
      addressLocality: companyConfig.addresses.headquarters.city,
      addressRegion: companyConfig.addresses.headquarters.state,
      postalCode: companyConfig.addresses.headquarters.pincode,
      addressCountry: 'IN'
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ],
      opens: '09:00',
      closes: '18:00'
    }
  }
}

export default {
  buildCanonicalUrl,
  buildSitemapEntry,
  generateCorporateJsonLd
}
