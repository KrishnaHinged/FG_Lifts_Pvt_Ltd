import * as productRepo from '@/repositories/product.repository'
import { validateProduct } from '@/validators/product.validator'
import { mapToProductDTO, mapToProductListDTO } from '@/mappers/product.mapper'

export async function getActiveProducts(filters = {}) {
  const list = await productRepo.getAllProducts(filters)
  return mapToProductListDTO(list)
}

export async function getFeaturedProduct() {
  const p = await productRepo.getFeaturedProduct()
  return mapToProductDTO(p)
}

export async function getProductBySlug(slug) {
  const p = await productRepo.getProductBySlug(slug)
  if (!p) return null
  return mapToProductDTO(p)
}

export async function getRelatedProducts(category, excludeSlug) {
  const list = await productRepo.getRelatedProducts(category, excludeSlug)
  return mapToProductListDTO(list)
}

// Admin Services
export async function getAllProductsAdmin() {
  // Queries all products including inactive ones
  const list = await productRepo.getAllProductsAdmin()
  return mapToProductListDTO(list)
}

export async function getProductById(id) {
  const p = await productRepo.getProductById(id)
  if (!p) {
    throw { status: 404, error: 'Product not found.' }
  }
  return mapToProductDTO(p)
}

export async function createProduct(data) {
  const { isValid, errors } = validateProduct(data)
  if (!isValid) {
    throw { status: 400, errors }
  }

  // Check unique slug (raw including inactive ones to prevent DB duplicate key exception)
  const existing = await productRepo.getProductBySlugRaw(data.slug)
  if (existing) {
    throw { status: 400, error: 'Product with this slug already exists.' }
  }

  const p = await productRepo.createProduct(data)
  return mapToProductDTO(p)
}

export async function updateProduct(id, data) {
  const { isValid, errors } = validateProduct(data)
  if (!isValid) {
    throw { status: 400, errors }
  }

  // Check unique slug (raw including inactive ones to prevent DB duplicate key exception)
  const existing = await productRepo.getProductBySlugRaw(data.slug)
  if (existing && existing._id?.toString() !== id) {
    throw { status: 400, error: 'Product with this slug already exists.' }
  }

  const updated = await productRepo.updateProduct(id, data)
  if (!updated) {
    throw { status: 404, error: 'Product not found.' }
  }
  return mapToProductDTO(updated)
}

export async function deleteProduct(id) {
  const deleted = await productRepo.deleteProduct(id)
  if (!deleted) {
    throw { status: 404, error: 'Product not found.' }
  }
  return mapToProductDTO(deleted)
}

export async function countProducts(query = {}) {
  return productRepo.countProducts(query)
}
