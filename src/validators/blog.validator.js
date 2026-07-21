import { validateRequired, validateSlug } from './validation.helper'

export function validateBlog(data) {
  const errors = {}

  const titleErr = validateRequired(data.title, 'Title')
  if (titleErr) errors.title = titleErr

  const slugErr = validateSlug(data.slug)
  if (slugErr) errors.slug = slugErr

  const contentErr = validateRequired(data.content, 'Content')
  if (contentErr) errors.content = contentErr

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

export default validateBlog
