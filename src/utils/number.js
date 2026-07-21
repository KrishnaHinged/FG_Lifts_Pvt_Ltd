/**
 * Number utility methods.
 */

export function formatNumber(num, options = {}) {
  if (typeof num !== 'number') return ''
  return new Intl.NumberFormat(options.locale || 'en-IN', options).format(num)
}

export function clamp(val, min, max) {
  return Math.max(min, Math.min(val, max))
}

export function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function percentage(part, total, decimals = 0) {
  if (!total) return '0%'
  const percent = (part / total) * 100
  return `${percent.toFixed(decimals)}%`
}

export default {
  formatNumber,
  clamp,
  randomBetween,
  percentage
}
