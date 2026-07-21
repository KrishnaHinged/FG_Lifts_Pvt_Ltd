/**
 * Project-specific Admin account helper.
 */

export function formatAdminName(admin) {
  if (!admin) return ''
  return admin.name || admin.email || 'Admin User'
}

export function isCurrentUser(admin, session) {
  if (!admin || !session) return false
  return admin.id === session.id || admin._id?.toString() === session.id
}

export function getRoleBadgeColor(role) {
  const colors = {
    SUPER_ADMIN: 'bg-red-50 text-red-700 border-red-200',
    SALES_MANAGER: 'bg-blue-50 text-blue-700 border-blue-200',
    SALES_EXECUTIVE: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    MARKETING_MANAGER: 'bg-amber-50 text-amber-700 border-amber-200',
    CONTENT_EDITOR: 'bg-neutral-50 text-neutral-700 border-neutral-200'
  }
  return colors[role] || 'bg-neutral-50 text-neutral-700'
}

export default {
  formatAdminName,
  isCurrentUser,
  getRoleBadgeColor
}
