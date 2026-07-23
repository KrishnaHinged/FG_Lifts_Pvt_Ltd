/**
 * OpenGraph Metadata Generator
 * FG Lift Pvt. Ltd.
 */

const DEFAULT_OG_IMAGE = '/images/projects-collage.png'
const SITE_NAME = 'FG Lift Pvt. Ltd.'

export function buildOpenGraph({
  title = 'FG Lift Pvt. Ltd. | Premium Elevator Manufacturing',
  description = 'Industry-leading elevator engineering, passenger lifts, goods elevators, and 360-degree interactive cabin design systems.',
  url = 'https://fglift.com',
  type = 'website',
  images = [],
  locale = 'en_US',
  siteName = SITE_NAME
} = {}) {
  const formattedImages = images.length > 0
    ? images.map(img => typeof img === 'string' ? { url: img, width: 1200, height: 630, alt: title } : img)
    : [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: title }]

  return {
    title,
    description,
    url,
    siteName,
    images: formattedImages,
    locale,
    type
  }
}

export default buildOpenGraph
