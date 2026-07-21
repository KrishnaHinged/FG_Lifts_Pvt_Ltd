import { validateRequired, validateEmail, validatePassword } from './validation.helper'

export function validateAdmin(data, isUpdate = false) {
  const errors = {}

  const nameErr = validateRequired(data.name, 'Name')
  if (nameErr) errors.name = nameErr

  const emailErr = validateEmail(data.email)
  if (emailErr) errors.email = emailErr

  if (!isUpdate || data.password) {
    const passwordErr = validatePassword(data.password)
    if (passwordErr) errors.password = passwordErr
  }

  const roleErr = validateRequired(data.role, 'Role')
  if (roleErr) errors.role = roleErr

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

export default validateAdmin
