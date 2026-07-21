export function mapToAdminDTO(admin) {
  if (!admin) return null
  return {
    id: admin._id?.toString() || admin.id || '',
    name: admin.name,
    email: admin.email,
    role: admin.role,
    isActive: !!admin.isActive,
    permissions: admin.permissions || [],
    lastLoginAt: admin.lastLoginAt || null,
    createdBy: admin.createdBy?.toString() || null,
    createdAt: admin.createdAt
  }
}

export function mapToAdminListDTO(admins) {
  if (!Array.isArray(admins)) return []
  return admins.map(mapToAdminDTO)
}
