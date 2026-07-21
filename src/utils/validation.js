import REGEX from '@/constants/regex'

/**
 * Pure validation utility routines using project regular expressions.
 */

export function isEmail(val) {
  if (typeof val !== 'string') return false
  return REGEX.EMAIL.test(val)
}

export function isPhone(val) {
  if (typeof val !== 'string') return false
  return REGEX.PHONE.test(val)
}

export function isUrl(val) {
  if (typeof val !== 'string') return false
  return REGEX.URL.test(val)
}

export function isSlug(val) {
  if (typeof val !== 'string') return false
  return REGEX.SLUG.test(val)
}

export function isGST(val) {
  if (typeof val !== 'string') return false
  return REGEX.GST.test(val)
}

export default {
  isEmail,
  isPhone,
  isUrl,
  isSlug,
  isGST
}
