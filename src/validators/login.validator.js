import { validateRequired, validateEmail } from './validation.helper'

export function validateLogin(data) {
  const errors = {}

  const emailErr = validateEmail(data.email)
  if (emailErr) errors.email = emailErr

  const passErr = validateRequired(data.password, 'Password')
  if (passErr) errors.password = passErr

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

export default validateLogin
