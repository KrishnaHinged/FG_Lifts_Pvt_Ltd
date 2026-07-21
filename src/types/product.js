/**
 * @fileoverview Data contract for Products and related sub-structures.
 */

/**
 * @typedef {Object} Specification
 * @property {string} key - The label/key of the specification item (e.g. "Capacity").
 * @property {string} value - The value (e.g. "800 kg").
 */

/**
 * @typedef {Object} PanoramaImages
 * @property {string} [front] - URL for front texture.
 * @property {string} [back] - URL for back texture.
 * @property {string} [left] - URL for left texture.
 * @property {string} [right] - URL for right texture.
 * @property {string} [ceiling] - URL for ceiling texture.
 * @property {string} [floor] - URL for floor texture.
 */

/**
 * @typedef {Object} ColorVariant
 * @property {string} name - Color variant name (e.g. "Champagne Gold").
 * @property {string} [hex] - Hexadecimal code (e.g. "#C9A84C").
 * @property {PanoramaImages} [panoramaImages] - Three.js Panorama texturing files.
 * @property {boolean} isActive - Whether the color variant is active.
 */

/**
 * @typedef {Object} FinishVariant
 * @property {string} name - Finish type (e.g. "Mirror Finish").
 * @property {boolean} isActive - Whether the finish is active.
 */

/**
 * @typedef {Object} ProductImage
 * @property {string} url - Absolute or relative image asset path.
 * @property {string} alt - Alternate accessibility text.
 */

/**
 * @typedef {Object} Product
 * @property {string} [id] - Unique Database Identifier.
 * @property {string} slug - Unique URL-friendly slug.
 * @property {string} name - Name of the product system.
 * @property {string} [tagline] - A brief summary or selling point.
 * @property {string} category - Primary category (e.g., "Passenger", "Capsule").
 * @property {string} [subCategory] - Secondary category details.
 * @property {'Systems'|'Cabins'|'Components'} tabGroup - Grouping key for tabs.
 * @property {string} [description] - Detailed HTML or markdown description.
 * @property {Specification[]} specifications - List of tech specs.
 * @property {string[]} features - Highlights or selling points.
 * @property {string[]} applications - Safe sectors (e.g. Residential, Industrial).
 * @property {ProductImage[]} images - Associated images.
 * @property {string} [brochureUrl] - Path to downloadable PDF.
 * @property {boolean} has360View - Indicates if 360 viewer is available.
 * @property {string} [defaultColor] - Initial color key.
 * @property {string} [defaultFinish] - Initial finish key.
 * @property {ColorVariant[]} colorVariants - Configurable color values.
 * @property {FinishVariant[]} finishVariants - Configurable finish values.
 * @property {boolean} isFeatured - Promoted status.
 * @property {string} [badge] - Label text (e.g., "NEW", "Bestseller").
 * @property {boolean} isActive - Publication state.
 * @property {number} sortOrder - Rendering order weights.
 */

export const ProductContract = {
  specifications: [{ key: '', value: '' }],
  colorVariants: [{ name: '', hex: '', panoramaImages: {}, isActive: true }],
  finishVariants: [{ name: '', isActive: true }],
  images: [{ url: '', alt: '' }],
  features: [],
  applications: [],
  has360View: false,
  isFeatured: false,
  isActive: true,
  sortOrder: 0
}

export default ProductContract
