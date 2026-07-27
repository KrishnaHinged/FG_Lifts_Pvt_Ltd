import * as testimonialRepo from '@/repositories/testimonial.repository'
import { validateTestimonial } from '@/validators/testimonial.validator'
import { mapToTestimonialDTO, mapToTestimonialListDTO } from '@/mappers/testimonial.mapper'

export async function getActiveTestimonials() {
  const list = await testimonialRepo.getAllTestimonials({ isActive: true })
  return mapToTestimonialListDTO(list)
}

export async function getAllTestimonialsAdmin() {
  const list = await testimonialRepo.getAllTestimonials()
  return mapToTestimonialListDTO(list)
}

export async function getTestimonialById(id) {
  const t = await testimonialRepo.getTestimonialById(id)
  if (!t) {
    throw { status: 404, error: 'Testimonial not found.' }
  }
  return mapToTestimonialDTO(t)
}

export async function createTestimonial(data) {
  const { isValid, errors } = validateTestimonial(data)
  if (!isValid) {
    throw { status: 400, errors }
  }
  const t = await testimonialRepo.createTestimonial(data)
  return mapToTestimonialDTO(t)
}

export async function updateTestimonial(id, data) {
  const { isValid, errors } = validateTestimonial(data)
  if (!isValid) {
    throw { status: 400, errors }
  }
  const updated = await testimonialRepo.updateTestimonial(id, data)
  if (!updated) {
    throw { status: 404, error: 'Testimonial not found.' }
  }
  return mapToTestimonialDTO(updated)
}

export async function deleteTestimonial(id) {
  const deleted = await testimonialRepo.deleteTestimonial(id)
  if (!deleted) {
    throw { status: 404, error: 'Testimonial not found.' }
  }
  return mapToTestimonialDTO(deleted)
}

export async function countTestimonials(query = {}) {
  return testimonialRepo.countTestimonials(query)
}
