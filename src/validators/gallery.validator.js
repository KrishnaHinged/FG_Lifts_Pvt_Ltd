import { validateRequired } from './validation.helper'

export function validateGallery(data) {
  const errors = {}

  const titleErr = validateRequired(data.title, 'Title')
  if (titleErr) errors.title = titleErr

  const coverImg = data.coverImage || (Array.isArray(data.images) && data.images.length > 0 ? (typeof data.images[0] === 'string' ? data.images[0] : data.images[0]?.url) : '')
  const coverErr = validateRequired(coverImg, 'Cover Image')
  if (coverErr) errors.coverImage = coverErr

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

export default validateGallery
