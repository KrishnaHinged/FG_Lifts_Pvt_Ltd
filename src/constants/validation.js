import { REGEX } from './regex.js'

export const VALIDATION = Object.freeze({
  LIMITS: Object.freeze({
    NAME_MIN: 2,
    NAME_MAX: 100,
    MESSAGE_MIN: 10,
    MESSAGE_MAX: 1000,
    PASSWORD_MIN: 8
  }),
  PATTERNS: Object.freeze(REGEX)
})

export default VALIDATION
