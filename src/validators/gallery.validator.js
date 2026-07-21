import { validateRequired, validateArray } from './validation.helper'

export function validateGallery(data) {
  const errors = {}

  const titleErr = validateRequired(data.title, 'Title')
  if (titleErr) errors.title = titleErr

  const coverErr = validateRequired(data.coverImage, 'Cover Image')
  if (coverErr) errors.coverImage = coverErr

  if (data.images) {
    const imagesErr = validateArray(data.images, 'Gallery Images')
    if (imagesErr) errors.images = imagesErr
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

export default validateGallery
