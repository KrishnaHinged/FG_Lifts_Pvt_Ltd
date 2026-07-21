import { validateRequired, validateSlug, validateArray } from './validation.helper'

export function validateProduct(data) {
  const errors = {}

  const nameErr = validateRequired(data.name, 'Name')
  if (nameErr) errors.name = nameErr

  const slugErr = validateSlug(data.slug)
  if (slugErr) errors.slug = slugErr

  const categoryErr = validateRequired(data.category, 'Category')
  if (categoryErr) errors.category = categoryErr

  const tabGroupErr = validateRequired(data.tabGroup, 'Tab Group')
  if (tabGroupErr) errors.tabGroup = tabGroupErr

  if (data.specifications) {
    const specsErr = validateArray(data.specifications, 'Specifications')
    if (specsErr) errors.specifications = specsErr
  }

  if (data.colorVariants) {
    const colorErr = validateArray(data.colorVariants, 'Color Variants')
    if (colorErr) errors.colorVariants = colorErr
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

export default validateProduct
