/**
 * Centralized Dynamic Metadata Generator
 * FG Lifts Pvt. Ltd.
 */

import { buildOpenGraph } from './openGraph'
import { buildTwitterCard } from './twitter'
import { getCanonicalUrl } from './canonical'
import { buildRobotsConfig } from './robots'
import { keywords as keywordsDict } from './keywords'

const DEFAULT_TITLE = 'FG Lifts Pvt. Ltd. | Premium Elevator Manufacturing & Architectural Lifts'
const DEFAULT_DESCRIPTION = 'Engineered vertical mobility systems, luxury passenger elevators, industrial goods lifts, and 360-degree interactive cabin design solutions.'

export function generatePageMetadata({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = '',
  image,
  keywords = [],
  noIndex = false
} = {}) {
  const canonical = getCanonicalUrl(path)
  const combinedKeywords = keywordsDict.getCombinedKeywords(keywords)
  const ogImages = image ? [image] : []

  return {
    title,
    description,
    keywords: combinedKeywords,
    alternates: {
      canonical
    },
    robots: noIndex
      ? { index: false, follow: false }
      : buildRobotsConfig(),
    openGraph: buildOpenGraph({
      title,
      description,
      url: canonical,
      images: ogImages
    }),
    twitter: buildTwitterCard({
      title,
      description,
      images: ogImages.length > 0 ? ogImages : undefined
    })
  }
}

export default generatePageMetadata
