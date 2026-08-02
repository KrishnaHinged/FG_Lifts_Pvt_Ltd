/**
 * Route & Resource Prefetching Utility
 * FG Lifts Pvt. Ltd.
 */

const prefetchedUrls = new Set()

export function prefetchRoute(router, href) {
  if (!router || !href || prefetchedUrls.has(href)) return
  try {
    router.prefetch(href)
    prefetchedUrls.add(href)
  } catch {
    // Silent catch
  }
}

export function prefetchImage(src) {
  if (typeof window === 'undefined' || !src || prefetchedUrls.has(src)) return
  const img = new Image()
  img.src = src
  prefetchedUrls.add(src)
}

export default {
  route: prefetchRoute,
  image: prefetchImage
}
