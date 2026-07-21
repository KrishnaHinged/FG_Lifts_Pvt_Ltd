/**
 * @fileoverview Data contract for security permissions and roles.
 */

/**
 * @typedef {Object} RolePermissionMap
 * @property {string[]} SUPER_ADMIN - All system permissions.
 * @property {string[]} SALES_MANAGER - Inquiry allocation and viewing permissions.
 * @property {string[]} SALES_EXECUTIVE - Ownership inquiry processing.
 * @property {string[]} MARKETING_MANAGER - Newsletters and editing.
 * @property {string[]} CONTENT_EDITOR - Products and Blog edits.
 */

export const PermissionsContract = {
  SUPER_ADMIN: [],
  SALES_MANAGER: [],
  SALES_EXECUTIVE: [],
  MARKETING_MANAGER: [],
  CONTENT_EDITOR: []
}
export default PermissionsContract
