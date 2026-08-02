/**
 * Image SEO Helper Utility
 * FG Lifts Pvt. Ltd.
 */

const DEFAULT_ALT = 'FG Lifts Pvt. Ltd. Elevator Engineering'
const DEFAULT_FALLBACK_IMAGE = '/images/projects-collage.png'

export function buildImageSeoProps({
  src,
  alt,
  title,
  width = 1200,
  height = 630,
  priority = false
} = {}) {
  const safeSrc = src || DEFAULT_FALLBACK_IMAGE
  const safeAlt = alt || title || DEFAULT_ALT

  return {
    src: safeSrc,
    alt: safeAlt,
    title: title || safeAlt,
    width,
    height,
    priority,
    loading: priority ? 'eager' : 'lazy'
  }
}

export default buildImageSeoProps
