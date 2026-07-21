import { truncate as rawTruncate } from './string.js'

export function truncate(str, length, suffix) {
  return rawTruncate(str, length, suffix)
}

export default truncate
