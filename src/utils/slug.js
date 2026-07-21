import { slugify } from './string.js'

export function generateSlug(str) {
  return slugify(str)
}

export function isValidSlug(slug) {
  if (typeof slug !== 'string') return false
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
  return slugRegex.test(slug)
}

export default {
  generateSlug,
  isValidSlug
}
