import { validateEmail } from './validation.helper'

export function validateNewsletter(data) {
  const errors = {}

  const emailErr = validateEmail(data.email)
  if (emailErr) errors.email = emailErr

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

export default validateNewsletter
