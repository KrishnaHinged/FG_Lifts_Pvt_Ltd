/**
 * @fileoverview Data contract for SEO optimization structures.
 */

/**
 * @typedef {Object} OpenGraphData
 * @property {string} title - Open Graph title tag.
 * @property {string} description - Open Graph description tag.
 * @property {string[]} images - Social media preview card image URLs.
 * @property {string} [type] - OG context type (e.g. website, article).
 */

/**
 * @typedef {Object} TwitterData
 * @property {string} [card] - Twitter card type (e.g. summary_large_image).
 * @property {string} title - Twitter headline.
 * @property {string} description - Twitter snippet.
 * @property {string[]} [images] - Twitter preview images.
 */

/**
 * @typedef {Object} SEOMetadata
 * @property {string} title - Page title tag.
 * @property {string} description - Page meta description.
 * @property {OpenGraphData} [openGraph] - OG configurations.
 * @property {TwitterData} [twitter] - Twitter card configurations.
 * @property {string} [canonical] - Absolute canonical URL.
 */

export const SEOContract = {
  title: '',
  description: '',
  openGraph: { title: '', description: '', images: [], type: 'website' }
}
export default SEOContract
