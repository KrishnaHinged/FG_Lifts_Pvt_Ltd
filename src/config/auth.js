export const authConfig = {
  cookieName: 'fg_admin_token',
  jwtSecret: process.env.JWT_SECRET || 'fallback-super-secret-key-32-chars-minimum',
  expiresIn: '24h',
  maxAgeSeconds: 24 * 60 * 60, // 24 hours
  roles: {
    SUPER_ADMIN: 'SUPER_ADMIN',
    SALES_MANAGER: 'SALES_MANAGER',
    SALES_EXECUTIVE: 'SALES_EXECUTIVE',
    MARKETING_MANAGER: 'MARKETING_MANAGER',
    CONTENT_EDITOR: 'CONTENT_EDITOR'
  },
  redirects: {
    login: '/admin/login',
    authenticatedDefault: '/admin/dashboard'
  }
}

export default authConfig
