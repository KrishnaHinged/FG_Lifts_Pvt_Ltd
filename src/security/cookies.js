/**
 * Enterprise Secure Cookie Configurations
 * FG Lift Pvt. Ltd.
 */

export const SECURE_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  path: '/',
  maxAge: 86400 // 24 hours
}

export function buildCookieHeader(name, value, customOptions = {}) {
  const options = { ...SECURE_COOKIE_OPTIONS, ...customOptions }
  let header = `${name}=${encodeURIComponent(value)}; Path=${options.path}; Max-Age=${options.maxAge}; SameSite=${options.sameSite}`
  if (options.httpOnly) header += '; HttpOnly'
  if (options.secure) header += '; Secure'
  return header
}

export default {
  SECURE_COOKIE_OPTIONS,
  buildCookieHeader
}
