/**
 * @fileoverview Data contract for admin users and credentials.
 */

/**
 * @typedef {Object} AdminUser
 * @property {string} [id] - Unique Database Identifier.
 * @property {string} name - Complete name of the administrative user.
 * @property {string} email - Unique login email.
 * @property {string} [password] - Hashed password string (hidden from frontend).
 * @property {'SUPER_ADMIN'|'SALES_MANAGER'|'SALES_EXECUTIVE'|'MARKETING_MANAGER'|'CONTENT_EDITOR'} role - Security tier role.
 * @property {boolean} isActive - Status parameter.
 * @property {string[]} [permissions] - Cached array of active permission codes.
 * @property {string|Date|null} [lastLoginAt] - Last access timestamp.
 * @property {string|null} [createdBy] - ID of Super Admin who invited/created this account.
 * @property {string|Date} [createdAt] - Record generation timestamp.
 */

/**
 * @typedef {Object} AdminSession
 * @property {string} id - Active Admin ID.
 * @property {string} name - Active Admin Name.
 * @property {string} email - Active Admin Email.
 * @property {string} role - Security role designation.
 * @property {number} exp - Epoch expiration of current session JWT token.
 */

export const AdminUserContract = {
  role: 'SALES_EXECUTIVE',
  isActive: true,
  permissions: []
}

export default AdminUserContract
