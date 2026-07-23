/**
 * Enterprise Auth Security Helpers
 * FG Lift Pvt. Ltd.
 */

import { verifyToken, COOKIE_NAME } from '@/lib/auth'

export function validateSession(request) {
  try {
    const token = request.cookies.get(COOKIE_NAME)?.value
    if (!token) return { isValid: false, admin: null }

    const admin = verifyToken(token)
    if (!admin) return { isValid: false, admin: null }

    return { isValid: true, admin }
  } catch {
    return { isValid: false, admin: null }
  }
}

export function isSessionExpired(issuedAtTimestamp, maxAgeSeconds = 86400) {
  if (!issuedAtTimestamp) return true
  const now = Math.floor(Date.now() / 1000)
  return now - issuedAtTimestamp > maxAgeSeconds
}

export default {
  validateSession,
  isSessionExpired
}
