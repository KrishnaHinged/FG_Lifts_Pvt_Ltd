import { validateRequired, validateEmail, validatePhone } from './validation.helper'

export function validateContact(data) {
  const errors = {}

  const nameErr = validateRequired(data.name, 'Name')
  if (nameErr) errors.name = nameErr

  const emailErr = validateEmail(data.email)
  if (emailErr) errors.email = emailErr

  const phoneErr = validatePhone(data.phone)
  if (phoneErr) errors.phone = phoneErr

  if (data.message && typeof data.message === 'string' && data.message.length > 5000) {
    errors.message = 'Message cannot exceed 5000 characters.'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

export default validateContact
