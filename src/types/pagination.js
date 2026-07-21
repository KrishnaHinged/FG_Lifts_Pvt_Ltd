/**
 * @fileoverview Data contract for pagination params.
 */

/**
 * @typedef {Object} PaginationParams
 * @property {number} [page] - The active page (1-indexed).
 * @property {number} [limit] - Size of the page list items.
 * @property {string} [search] - Optional query string to filter fields.
 */

/**
 * @typedef {Object} PaginationResult
 * @property {number} total - Total number of documents.
 * @property {number} page - Current page.
 * @property {number} pages - Calculated pages count.
 * @property {number} limit - Limit parameter.
 */

export const PaginationContract = {
  page: 1,
  limit: 50,
  search: ''
}
export default PaginationContract
