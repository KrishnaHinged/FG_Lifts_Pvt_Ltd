import * as blogRepo from '@/repositories/blog.repository'
import { validateBlog } from '@/validators/blog.validator'
import { mapToBlogDTO, mapToBlogListDTO } from '@/mappers/blog.mapper'

export async function getPublishedPosts(filters = {}) {
  const list = await blogRepo.getAllPublishedPosts(filters)
  return mapToBlogListDTO(list)
}

export async function getFeaturedPost() {
  const post = await blogRepo.getFeaturedPost()
  return mapToBlogDTO(post)
}

export async function getPostBySlug(slug) {
  const post = await blogRepo.getPostBySlug(slug)
  if (post) {
    await blogRepo.incrementPostViews(slug)
  }
  return mapToBlogDTO(post)
}

export async function getRelatedPosts(slugs = [], currentSlug) {
  const list = await blogRepo.getRelatedPosts(slugs, currentSlug)
  return mapToBlogListDTO(list)
}

export async function getCategories() {
  return blogRepo.getAllCategories()
}

// Admin Services
export async function getAllPostsAdmin() {
  const list = await blogRepo.getAllPostsAdmin()
  return mapToBlogListDTO(list)
}

export async function getPostById(id) {
  const post = await blogRepo.getPostById(id)
  if (!post) {
    throw { status: 404, error: 'Blog post not found.' }
  }
  return mapToBlogDTO(post)
}

export async function createPost(data) {
  const { isValid, errors } = validateBlog(data)
  if (!isValid) {
    throw { status: 400, errors }
  }

  // Check unique slug
  const existing = await blogRepo.getPostBySlug(data.slug)
  if (existing) {
    throw { status: 400, error: 'A post with this slug already exists.' }
  }

  const p = await blogRepo.createPost(data)
  return mapToBlogDTO(p)
}

export async function updatePost(id, data) {
  const { isValid, errors } = validateBlog(data)
  if (!isValid) {
    throw { status: 400, errors }
  }

  // Check unique slug (exclude this post)
  const existing = await blogRepo.getPostBySlug(data.slug)
  if (existing && existing._id?.toString() !== id) {
    throw { status: 400, error: 'A post with this slug already exists.' }
  }

  const updated = await blogRepo.updatePost(id, data)
  if (!updated) {
    throw { status: 404, error: 'Blog post not found.' }
  }
  return mapToBlogDTO(updated)
}

export async function deletePost(id) {
  const deleted = await blogRepo.deletePost(id)
  if (!deleted) {
    throw { status: 404, error: 'Blog post not found.' }
  }
  return mapToBlogDTO(deleted)
}

export async function countPosts(query = {}) {
  return blogRepo.countPosts(query)
}
