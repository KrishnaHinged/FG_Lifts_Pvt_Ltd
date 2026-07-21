import { validateRequired } from './validation.helper'

export function validateEmailTemplate(data) {
  const errors = {}

  const subjectErr = validateRequired(data.subject, 'Subject')
  if (subjectErr) errors.subject = subjectErr

  const bodyErr = validateRequired(data.body, 'Body')
  if (bodyErr) errors.body = bodyErr

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

export default validateEmailTemplate
