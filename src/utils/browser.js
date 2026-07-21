/**
 * Environment detection helper utilities.
 */

export const isBrowser = typeof window !== 'undefined'
export const isServer = !isBrowser

export function isTouchDevice() {
  if (isServer) return false
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

export function getOS() {
  if (isServer) return 'unknown'
  const ua = window.navigator.userAgent
  if (/Mac/.test(ua)) return 'mac'
  if (/Windows/.test(ua)) return 'windows'
  if (/Linux/.test(ua)) return 'linux'
  return 'other'
}

export default {
  isBrowser,
  isServer,
  isTouchDevice,
  getOS
}
