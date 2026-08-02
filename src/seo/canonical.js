/**
 * Canonical URL Generator Helper
 * FG Lifts Pvt. Ltd.
 */

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://fglifts.com'

export function getCanonicalUrl(path = '') {
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${BASE_URL}${cleanPath === '/' ? '' : cleanPath}`
}

export default getCanonicalUrl
