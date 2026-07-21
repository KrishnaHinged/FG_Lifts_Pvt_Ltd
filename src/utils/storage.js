/**
 * Safe localStorage and sessionStorage wrappers.
 */

export function setItem(key, value, useSession = false) {
  if (typeof window === 'undefined') return
  try {
    const storage = useSession ? window.sessionStorage : window.localStorage
    storage.setItem(key, JSON.stringify(value))
  } catch (err) {
    console.error('Storage write error:', err)
  }
}

export function getItem(key, defaultValue = null, useSession = false) {
  if (typeof window === 'undefined') return defaultValue
  try {
    const storage = useSession ? window.sessionStorage : window.localStorage
    const item = storage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (err) {
    console.error('Storage read error:', err)
    return defaultValue
  }
}

export function removeItem(key, useSession = false) {
  if (typeof window === 'undefined') return
  try {
    const storage = useSession ? window.sessionStorage : window.localStorage
    storage.removeItem(key)
  } catch (err) {
    console.error('Storage delete error:', err)
  }
}

export default {
  setItem,
  getItem,
  removeItem
}
