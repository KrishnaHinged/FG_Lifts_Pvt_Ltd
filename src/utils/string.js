/**
 * Central string utilities.
 */

export function capitalize(str) {
  if (typeof str !== 'string' || !str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function truncate(str, length = 100, suffix = '...') {
  if (typeof str !== 'string' || !str) return ''
  if (str.length <= length) return str
  return str.slice(0, length) + suffix
}

export function slugify(str) {
  if (typeof str !== 'string' || !str) return ''
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function camelCase(str) {
  if (typeof str !== 'string' || !str) return ''
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase()
    })
    .replace(/\s+/g, '')
}

export function kebabCase(str) {
  if (typeof str !== 'string' || !str) return ''
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
}

export function titleCase(str) {
  if (typeof str !== 'string' || !str) return ''
  return str
    .split(/[-_\s]+/)
    .map(word => capitalize(word))
    .join(' ')
}

export default {
  capitalize,
  truncate,
  slugify,
  camelCase,
  kebabCase,
  titleCase
}
