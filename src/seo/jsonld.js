/**
 * Enterprise JSON-LD Structured Data Builder Functions
 * FG Lift Pvt. Ltd.
 */

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://fglift.com'

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: 'FG Lift Pvt. Ltd.',
    legalName: 'FG Lift Private Limited',
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo.png`,
    sameAs: [
      'https://www.linkedin.com/posts/fg-lifts-private-limited_firozgerelevator-elevatorsolutions-homeelevator-activity-7487362742073393152-W7fZ',
      'https://www.facebook.com/share/v/19Gssv8PnP/',
      'https://www.instagram.com/fgliftspvtltd'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-7046055586',
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi', 'Gujarati']
    }
  }
}

export function buildLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BASE_URL}/#localbusiness`,
    name: 'FG Lift Pvt. Ltd.',
    image: `${BASE_URL}/images/projects-collage.png`,
    telephone: '+91-7046055586',
    email: 'info@fglift.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'FG Industrial Estate',
      addressLocality: 'Ahmedabad',
      addressRegion: 'Gujarat',
      postalCode: '380001',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 23.0225,
      longitude: 72.5714
    },
    priceRange: '₹₹₹'
  }
}

export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: BASE_URL,
    name: 'FG Lift Pvt. Ltd.',
    publisher: {
      '@id': `${BASE_URL}/#organization`
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${BASE_URL}/products?search={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  }
}

export function buildBreadcrumbSchema(items = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`
    }))
  }
}

export function buildArticleSchema({ title, description, slug, image, author, datePublished, dateModified }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blog/${slug}`
    },
    headline: title,
    description: description,
    image: image ? [image.startsWith('http') ? image : `${BASE_URL}${image}`] : [`${BASE_URL}/images/projects-collage.png`],
    datePublished: datePublished || new Date().toISOString(),
    dateModified: dateModified || datePublished || new Date().toISOString(),
    author: {
      '@type': 'Person',
      name: author || 'FG Lift Editorial Team'
    },
    publisher: {
      '@id': `${BASE_URL}/#organization`
    }
  }
}

export function buildProductSchema({ name, description, slug, category, image }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: name,
    description: description,
    image: image ? [image.startsWith('http') ? image : `${BASE_URL}${image}`] : [`${BASE_URL}/images/projects-collage.png`],
    category: category,
    brand: {
      '@type': 'Brand',
      name: 'FG Lift'
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock'
    }
  }
}

export function buildFAQSchema(faqs = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }
}

export function buildServiceSchema({ name, description }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: name,
    provider: {
      '@id': `${BASE_URL}/#organization`
    },
    description: description
  }
}
