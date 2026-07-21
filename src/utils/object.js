/**
 * Pure object utilities.
 */

export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime())
  if (obj instanceof RegExp) return new RegExp(obj)
  
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item))
  }
  
  const clone = Object.create(Object.getPrototypeOf(obj))
  for (const key of Object.getOwnPropertyNames(obj)) {
    clone[key] = deepClone(obj[key])
  }
  return clone
}

export function deepMerge(target, source) {
  const output = { ...target }
  if (target && typeof target === 'object' && source && typeof source === 'object') {
    Object.keys(source).forEach(key => {
      if (source[key] && typeof source[key] === 'object') {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] })
        } else {
          output[key] = deepMerge(target[key], source[key])
        }
      } else {
        Object.assign(output, { [key]: source[key] })
      }
    })
  }
  return output
}

export function isEmpty(obj) {
  if (obj === null || obj === undefined) return true
  if (Array.isArray(obj)) return obj.length === 0
  if (typeof obj === 'object') return Object.keys(obj).length === 0
  return false
}

export function pick(obj, keys = []) {
  if (!obj || typeof obj !== 'object') return {}
  return keys.reduce((acc, key) => {
    if (key in obj) acc[key] = obj[key]
    return acc
  }, {})
}

export function omit(obj, keys = []) {
  if (!obj || typeof obj !== 'object') return {}
  const result = { ...obj }
  keys.forEach(key => {
    delete result[key]
  })
  return result
}

export default {
  deepClone,
  deepMerge,
  isEmpty,
  pick,
  omit
}
