/**
 * Currency formatter utility.
 */

export function formatINR(amount) {
  if (typeof amount !== 'number') return ''
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount)
}

export function formatUSD(amount) {
  if (typeof amount !== 'number') return ''
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount)
}

export default {
  formatINR,
  formatUSD
}
