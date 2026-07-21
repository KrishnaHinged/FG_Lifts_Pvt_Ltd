/**
 * Time utility methods.
 */

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function formatDuration(seconds) {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s < 10 ? '0' : ''}${s}`
}

export function msToSeconds(ms) {
  return ms / 1000
}

export default {
  sleep,
  formatDuration,
  msToSeconds
}
