/**
 * In-Memory Sliding-Window Rate Limiter
 * FG Lift Pvt. Ltd.
 */

const rateLimitMap = new Map()

export function checkRateLimit(key, limit = 10, windowMs = 60000) {
  const now = Date.now()
  const record = rateLimitMap.get(key) || []

  // Filter out timestamps outside window
  const validTimestamps = record.filter(timestamp => now - timestamp < windowMs)

  if (validTimestamps.length >= limit) {
    return {
      allowed: false,
      remaining: 0,
      resetMs: windowMs - (now - validTimestamps[0])
    }
  }

  validTimestamps.push(now)
  rateLimitMap.set(key, validTimestamps)

  return {
    allowed: true,
    remaining: limit - validTimestamps.length,
    resetMs: windowMs
  }
}

export default checkRateLimit
