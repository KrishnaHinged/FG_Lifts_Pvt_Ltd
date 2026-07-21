/**
 * Pure URL and query parameter utilities.
 */

export function parseSearchParams(urlStr) {
  if (!urlStr) return {}
  try {
    const search = urlStr.includes('?') ? urlStr.split('?')[1] : urlStr
    const params = new URLSearchParams(search)
    const result = {}
    for (const [key, value] of params.entries()) {
      result[key] = value
    }
    return result
  } catch (err) {
    return {}
  }
}

export function buildQueryString(params = {}) {
  const searchParams = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, String(value))
    }
  }
  const str = searchParams.toString()
  return str ? `?${str}` : ''
}

export function isAbsoluteUrl(url) {
  if (typeof url !== 'string') return false
  return /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(url)
}

export function joinPath(...parts) {
  return parts
    .map((part, index) => {
      if (index === 0) return part.replace(/\/+$/, '')
      return part.replace(/^\/+|\/+$/g, '')
    })
    .filter(Boolean)
    .join('/')
}

export default {
  parseSearchParams,
  buildQueryString,
  isAbsoluteUrl,
  joinPath
}
