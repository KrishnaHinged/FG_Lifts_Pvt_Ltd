/**
 * Enterprise Multi-Tier Caching Strategy Helper
 * FG Lifts Pvt. Ltd.
 */

const memoryCache = new Map()

export const cacheStrategy = {
  /**
   * Memory cache with TTL
   */
  getMemory: (key) => {
    const cached = memoryCache.get(key)
    if (!cached) return null
    if (Date.now() > cached.expiresAt) {
      memoryCache.delete(key)
      return null
    }
    return cached.data
  },

  setMemory: (key, data, ttlSeconds = 60) => {
    memoryCache.set(key, {
      data,
      expiresAt: Date.now() + (ttlSeconds * 1000)
    })
  },

  clearMemory: () => {
    memoryCache.clear()
  },

  /**
   * Browser LocalStorage cache with expiry wrapper
   */
  getStorage: (key) => {
    if (typeof window === 'undefined') return null
    try {
      const item = localStorage.getItem(`fg_cache_${key}`)
      if (!item) return null
      const parsed = JSON.parse(item)
      if (Date.now() > parsed.expiresAt) {
        localStorage.removeItem(`fg_cache_${key}`)
        return null
      }
      return parsed.data
    } catch {
      return null
    }
  },

  setStorage: (key, data, ttlSeconds = 300) => {
    if (typeof window === 'undefined') return
    try {
      const payload = {
        data,
        expiresAt: Date.now() + (ttlSeconds * 1000)
      }
      localStorage.setItem(`fg_cache_${key}`, JSON.stringify(payload))
    } catch {
      // Storage quota exceeded or disabled
    }
  }
}

export default cacheStrategy
