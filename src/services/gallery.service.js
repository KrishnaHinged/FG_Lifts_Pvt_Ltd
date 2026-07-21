import * as galleryRepo from '@/repositories/gallery.repository'
import { validateGallery } from '@/validators/gallery.validator'
import { mapToGalleryDTO, mapToGalleryListDTO } from '@/mappers/gallery.mapper'

export async function getActiveProjects(category = null) {
  const list = await galleryRepo.getAllProjects(category)
  return mapToGalleryListDTO(list)
}

export async function getProjectById(id) {
  const project = await galleryRepo.getProjectById(id)
  if (!project) {
    throw { status: 404, error: 'Project not found.' }
  }
  return mapToGalleryDTO(project)
}

// Admin Services
export async function getAllProjectsAdmin() {
  const list = await galleryRepo.getAllProjectsAdmin()
  return mapToGalleryListDTO(list)
}

export async function createProject(data) {
  const { isValid, errors } = validateGallery(data)
  if (!isValid) {
    throw { status: 400, errors }
  }

  const p = await galleryRepo.createProject(data)
  return mapToGalleryDTO(p)
}

export async function updateProject(id, data) {
  const { isValid, errors } = validateGallery(data)
  if (!isValid) {
    throw { status: 400, errors }
  }

  const updated = await galleryRepo.updateProject(id, data)
  if (!updated) {
    throw { status: 404, error: 'Project not found.' }
  }
  return mapToGalleryDTO(updated)
}

export async function deleteProject(id) {
  const deleted = await galleryRepo.deleteProject(id)
  if (!deleted) {
    throw { status: 404, error: 'Project not found.' }
  }
  return mapToGalleryDTO(deleted)
}

export async function countProjects(query = {}) {
  return galleryRepo.countProjects(query)
}
