/**
 * @fileoverview Data contract for standard API responses.
 */

/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success - Indicates if operation was successful.
 * @property {*} [data] - The main payload returned.
 * @property {string} [message] - Success or status description message.
 */

/**
 * @typedef {Object} ApiError
 * @property {boolean} success - Always false.
 * @property {string} error - The primary error message.
 * @property {Object.<string, string>} [details] - Key-value map of validation field errors.
 */

/**
 * @typedef {Object} PaginatedResponse
 * @property {boolean} success - Indicates if query was successful.
 * @property {Array.<*>} results - Main payload items.
 * @property {number} total - Total matching records.
 * @property {number} page - Current page number.
 * @property {number} pages - Total pages.
 */

export const ApiResponseContract = {
  success: true
}
export default ApiResponseContract
