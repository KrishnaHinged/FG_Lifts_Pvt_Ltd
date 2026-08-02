/**
 * Role-Based Access Enforcement Security Facade
 * FG Lifts Pvt. Ltd.
 */

import { hasPermission as checkPermission } from '@/permissions/permissions'
import { PERMISSIONS } from '@/permissions/roles'

export function enforcePermission(user, requiredPermission) {
  if (!user) return false
  return checkPermission(user, requiredPermission)
}

export function enforceAnyPermission(user, permissionsList = []) {
  if (!user || !Array.isArray(permissionsList)) return false
  return permissionsList.some(perm => checkPermission(user, perm))
}

export { PERMISSIONS }
export default {
  enforcePermission,
  enforceAnyPermission,
  PERMISSIONS
}
