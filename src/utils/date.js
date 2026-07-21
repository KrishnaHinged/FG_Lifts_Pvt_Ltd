/**
 * Date utility methods.
 */

export function formatDate(date, formatStr = 'en-IN') {
  if (!date) return ''
  const parsed = new Date(date)
  if (isNaN(parsed.getTime())) return ''
  return parsed.toLocaleDateString(formatStr, {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}

export function formatRelativeTime(date) {
  if (!date) return ''
  const parsed = new Date(date)
  if (isNaN(parsed.getTime())) return ''
  
  const now = new Date()
  const diffMs = now.getTime() - parsed.getTime()
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHr = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHr / 24)

  if (diffSec < 60) return 'just now'
  if (diffMin < 60) return `${diffMin}m ago`
  if (diffHr < 24) return `${diffHr}h ago`
  if (diffDay === 1) return 'yesterday'
  return `${diffDay}d ago`
}

export function daysBetween(date1, date2 = new Date()) {
  const d1 = new Date(date1)
  const d2 = new Date(date2)
  const oneDay = 24 * 60 * 60 * 1000
  return Math.round(Math.abs((d1 - d2) / oneDay))
}

export function isToday(date) {
  const d = new Date(date)
  const today = new Date()
  return d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
}

export default {
  formatDate,
  formatRelativeTime,
  daysBetween,
  isToday
}
