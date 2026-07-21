/**
 * @fileoverview Data contract for Gallery projects.
 */

/**
 * @typedef {Object} GalleryProject
 * @property {string} [id] - Unique Database Identifier.
 * @property {string} title - Project title (e.g. "Grand Hyatt Executive Tower").
 * @property {string} [location] - Location (e.g. "Mumbai, Maharashtra").
 * @property {string} [clientType] - Client classification (e.g. "Residential").
 * @property {string} [category] - Page routing category.
 * @property {number} [year] - Handover year.
 * @property {string} [description] - Narrative study.
 * @property {string} coverImage - Primary highlight image URL.
 * @property {string[]} images - Carousel project images.
 * @property {string[]} relatedProductSlugs - Slugs of systems/cabins installed.
 * @property {boolean} isActive - Publication state.
 * @property {number} sortOrder - Placement weight.
 */

export const GalleryProjectContract = {
  title: '',
  location: '',
  clientType: '',
  category: '',
  year: null,
  description: '',
  coverImage: '',
  images: [],
  relatedProductSlugs: [],
  isActive: true,
  sortOrder: 0
}

export default GalleryProjectContract
