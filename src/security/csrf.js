/**
 * Anti-CSRF Token Helper
 * FG Lifts Pvt. Ltd.
 */

export function generateCsrfToken() {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID()
  }
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export function validateCsrfHeader(request, expectedToken) {
  if (!expectedToken) return false
  const headerToken = request.headers.get('x-csrf-token')
  return headerToken === expectedToken
}

export default {
  generateCsrfToken,
  validateCsrfHeader
}
