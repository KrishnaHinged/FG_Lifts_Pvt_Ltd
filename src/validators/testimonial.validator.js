import { validateRequired } from './validation.helper'

export function validateTestimonial(data) {
  const errors = {}

  const nameErr = validateRequired(data.name, 'Name')
  if (nameErr) errors.name = nameErr

  const titleErr = validateRequired(data.title, 'Job Title / Designation')
  if (titleErr) errors.title = titleErr

  const quoteErr = validateRequired(data.quote, 'Testimonial Quote')
  if (quoteErr) errors.quote = quoteErr

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

export default validateTestimonial
