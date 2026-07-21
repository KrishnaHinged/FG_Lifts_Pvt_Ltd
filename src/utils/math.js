/**
 * Math utility methods.
 */

export function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end
}

export function mapRange(value, inMin, inMax, outMin, outMax) {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}

export function roundTo(num, decimals = 0) {
  const multiplier = Math.pow(10, decimals)
  return Math.round(num * multiplier) / multiplier
}

export default {
  lerp,
  mapRange,
  roundTo
}
