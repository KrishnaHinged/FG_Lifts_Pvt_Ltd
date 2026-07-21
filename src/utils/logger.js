/**
 * Log writing utility. Output is omitted in production environments.
 */

const isDev = process.env.NODE_ENV !== 'production'

export function debug(...args) {
  if (isDev) console.log('[DEBUG]', ...args)
}

export function info(...args) {
  if (isDev) console.info('[INFO]', ...args)
}

export function warn(...args) {
  if (isDev) console.warn('[WARN]', ...args)
}

export function error(...args) {
  console.error('[ERROR]', ...args)
}

export function success(...args) {
  if (isDev) console.log('[SUCCESS] ✅', ...args)
}

export default {
  debug,
  info,
  warn,
  error,
  success
}
