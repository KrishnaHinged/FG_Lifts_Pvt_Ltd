export function validateEmail(email) {
  if (!email) return 'Email is required.'
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) return 'Invalid email address format.'
  return null
}

export function validatePhone(phone) {
  if (!phone) return 'Phone number is required.'
  // Allow international/standard formats: optional leading +, digits, spaces, hyphens, parentheses
  const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/
  if (!phoneRegex.test(phone)) return 'Invalid phone number format.'
  return null
}

export function validateRequired(value, fieldName) {
  if (value === undefined || value === null || (typeof value === 'string' && value.trim() === '')) {
    return `${fieldName || 'Field'} is required.`
  }
  return null
}

export function validateSlug(slug) {
  if (!slug) return 'Slug is required.'
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
  if (!slugRegex.test(slug)) return 'Slug must be lower-case alphanumeric words separated by hyphens.'
  return null
}

export function validateUrl(url, fieldName) {
  if (!url) return null // URL is optional unless validateRequired is called first
  try {
    new URL(url)
    return null
  } catch (err) {
    return `${fieldName || 'URL'} must be a valid absolute URL.`
  }
}

export function validatePassword(password) {
  if (!password) return 'Password is required.'
  if (password.length < 6) return 'Password must be at least 6 characters long.'
  return null
}

export function validateArray(arr, fieldName) {
  if (!Array.isArray(arr)) {
    return `${fieldName || 'Field'} must be an array.`
  }
  return null
}

export function validateObject(obj, fieldName) {
  if (typeof obj !== 'object' || obj === null) {
    return `${fieldName || 'Field'} must be an object.`
  }
  return null
}
