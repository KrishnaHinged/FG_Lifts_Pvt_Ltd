/**
 * Pure array utilities.
 */

export function uniqueArray(arr) {
  if (!Array.isArray(arr)) return []
  return [...new Set(arr)]
}

export function chunk(arr, size = 1) {
  if (!Array.isArray(arr) || size <= 0) return []
  const result = []
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}

export function flatten(arr) {
  if (!Array.isArray(arr)) return []
  return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val), [])
}

export function groupBy(arr, key) {
  if (!Array.isArray(arr)) return {}
  return arr.reduce((acc, item) => {
    const groupKey = typeof key === 'function' ? key(item) : item[key]
    if (!acc[groupKey]) {
      acc[groupKey] = []
    }
    acc[groupKey].push(item)
    return acc
  }, {})
}

export function sortBy(arr, key, direction = 'asc') {
  if (!Array.isArray(arr)) return []
  const copy = [...arr]
  const isDesc = direction.toLowerCase() === 'desc'
  return copy.sort((a, b) => {
    const valA = typeof key === 'function' ? key(a) : a[key]
    const valB = typeof key === 'function' ? key(b) : b[key]

    if (valA === valB) return 0
    if (valA === undefined || valA === null) return 1
    if (valB === undefined || valB === null) return -1

    if (typeof valA === 'string' && typeof valB === 'string') {
      return isDesc ? valB.localeCompare(valA) : valA.localeCompare(valB)
    }
    return isDesc ? valB - valA : valA - valB
  })
}

export default {
  uniqueArray,
  chunk,
  flatten,
  groupBy,
  sortBy
}
