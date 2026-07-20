import { ROLE_PERMISSIONS } from './roles.js'

export function hasPermission(admin, permission) {
  if (!admin || !admin.role) return false
  const perms = ROLE_PERMISSIONS[admin.role] || []
  return perms.includes(permission)
}

export function requirePermission(admin, permission) {
  if (!hasPermission(admin, permission)) {
    throw new Error(`403: Permission denied — ${permission} required.`)
  }
}

export function getAdminPermissions(role) {
  return ROLE_PERMISSIONS[role] || []
}
