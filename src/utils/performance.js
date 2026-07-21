/**
 * Central metrics and latency tracking utility.
 */

export function measureTime(label, fn) {
  const start = performance.now()
  const result = fn()
  const end = performance.now()
  console.log(`[PERFORMANCE] ${label} took ${(end - start).toFixed(2)}ms`)
  return result
}

export async function measureAsyncTime(label, asyncFn) {
  const start = performance.now()
  const result = await asyncFn()
  const end = performance.now()
  console.log(`[PERFORMANCE] ${label} took ${(end - start).toFixed(2)}ms`)
  return result
}

export default {
  measureTime,
  measureAsyncTime
}
