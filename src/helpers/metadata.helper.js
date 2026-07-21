import seoConfig from '@/config/seo'
import companyConfig from '@/config/company'

/**
 * Standard NextJS dynamic Metadata formatting helper.
 */

export function generatePageMetadata({ title, description, ogImage, path = '' } = {}) {
  const baseTitle = title || seoConfig.default.title
  const baseDesc = description || seoConfig.default.description
  const images = ogImage ? [ogImage] : seoConfig.default.openGraph.images
  const canonicalUrl = `${process.env.NEXT_PUBLIC_URL || 'https://fglifts.com'}${path}`

  return {
    title: `${baseTitle} | ${companyConfig.name}`,
    description: baseDesc,
    metadataBase: new URL(process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'),
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title: baseTitle,
      description: baseDesc,
      url: canonicalUrl,
      siteName: companyConfig.name,
      images: images.map(img => ({
        url: img,
        width: 1200,
        height: 630,
        alt: baseTitle
      })),
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: baseTitle,
      description: baseDesc,
      images
    }
  }
}

export default {
  generatePageMetadata
}
