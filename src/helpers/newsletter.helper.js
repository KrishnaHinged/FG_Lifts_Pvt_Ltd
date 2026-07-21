/**
 * Project-specific Newsletter helper.
 */

export function formatSubscriberStats(stats) {
  if (!stats) return { totalLabel: '0', activeLabel: '0', unsubscribeLabel: '0' }
  return {
    totalLabel: Number(stats.total || 0).toLocaleString('en-IN'),
    activeLabel: Number(stats.active || 0).toLocaleString('en-IN'),
    unsubscribeLabel: Number(stats.unsubscribed || 0).toLocaleString('en-IN')
  }
}

export function calculateGrowthRate(current, previous) {
  if (!previous) return 0
  return Math.round(((current - previous) / previous) * 100)
}

export default {
  formatSubscriberStats,
  calculateGrowthRate
}
