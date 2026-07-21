/**
 * @fileoverview Data contract for dynamic meta configurations.
 */

/**
 * @typedef {Object} PageMetadata
 * @property {string} title - Page document title.
 * @property {string} description - Page descriptive snippet.
 * @property {Object} [openGraph] - Optional OG configurations.
 */

/**
 * @typedef {Object} DynamicMetadata
 * @property {string} [title] - Override title string.
 * @property {string} [description] - Override description tag.
 * @property {string} [ogImage] - Social media image preview path.
 */

export const MetadataContract = {
  title: '',
  description: ''
}
export default MetadataContract
