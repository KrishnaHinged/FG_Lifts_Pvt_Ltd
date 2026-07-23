/**
 * Input Sanitizer (XSS, Injection, Malformed URLs)
 * FG Lift Pvt. Ltd.
 */

export function sanitizeString(input = '') {
  if (typeof input !== 'string') return ''
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim()
}

export function sanitizeObject(obj = {}) {
  if (typeof obj !== 'object' || obj === null) return obj
  const cleanObj = Array.isArray(obj) ? [] : {}

  for (const [key, val] of Object.entries(obj)) {
    if (typeof val === 'string') {
      cleanObj[key] = sanitizeString(val)
    } else if (typeof val === 'object' && val !== null) {
      cleanObj[key] = sanitizeObject(val)
    } else {
      cleanObj[key] = val
    }
  }

  return cleanObj
}

export function isValidUrl(url = '') {
  try {
    const parsed = new URL(url, 'https://fglift.com')
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

export default {
  sanitizeString,
  sanitizeObject,
  isValidUrl
}
