import { isServer } from './browser.js'

/**
 * System preference and device capability checking utilities.
 */

export function prefersReducedMotion() {
  if (isServer) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function prefersColorScheme() {
  if (isServer) return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function isRetina() {
  if (isServer) return false
  return window.devicePixelRatio > 1
}

export default {
  prefersReducedMotion,
  prefersColorScheme,
  isRetina
}
