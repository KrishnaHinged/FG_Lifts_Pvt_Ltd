import { hasPermission } from '@/permissions/permissions.js'
import { PERMISSIONS } from '@/permissions/roles.js'

/**
 * Clean permission checks helpers. Prevent writing permission checks inline.
 */

export function canEdit(admin) {
  return hasPermission(admin, PERMISSIONS.EDIT_PRODUCT) || 
         hasPermission(admin, PERMISSIONS.EDIT_GALLERY) || 
         hasPermission(admin, PERMISSIONS.EDIT_BLOG)
}

export function canDelete(admin) {
  return hasPermission(admin, PERMISSIONS.DELETE_INQUIRY) || 
         hasPermission(admin, PERMISSIONS.DELETE_PRODUCT) || 
         hasPermission(admin, PERMISSIONS.DELETE_GALLERY) || 
         hasPermission(admin, PERMISSIONS.DELETE_BLOG)
}

export function canPublish(admin) {
  return hasPermission(admin, PERMISSIONS.PUBLISH_BLOG)
}

export function canExport(admin) {
  return hasPermission(admin, PERMISSIONS.EXPORT_CRM) || 
         hasPermission(admin, PERMISSIONS.EXPORT_SUBSCRIBERS)
}

export function canAssign(admin) {
  return hasPermission(admin, PERMISSIONS.ASSIGN_INQUIRY)
}

export function canView(admin, type) {
  const map = {
    inquiries: PERMISSIONS.VIEW_ALL_INQUIRIES,
    products: PERMISSIONS.VIEW_PRODUCTS,
    gallery: PERMISSIONS.VIEW_GALLERY,
    blog: PERMISSIONS.VIEW_BLOG,
    subscribers: PERMISSIONS.VIEW_SUBSCRIBERS,
    users: PERMISSIONS.VIEW_USERS,
    logs: PERMISSIONS.VIEW_LOGS
  }
  return hasPermission(admin, map[type])
}

export function canManage(admin, type) {
  if (admin?.role === 'SUPER_ADMIN') return true
  return false
}

export default {
  canEdit,
  canDelete,
  canPublish,
  canExport,
  canAssign,
  canView,
  canManage
}
