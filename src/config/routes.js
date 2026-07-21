export const routesConfig = {
  home: '/',
  about: '/about',
  products: '/products',
  productDetail: (slug) => `/products/${slug}`,
  gallery: '/gallery',
  blog: '/blog',
  blogDetail: (slug) => `/blog/${slug}`,
  admin: {
    root: '/admin',
    login: '/admin/login',
    dashboard: '/admin/dashboard',
    inquiries: '/admin/inquiries',
    products: '/admin/products',
    newProduct: '/admin/products/new',
    editProduct: (id) => `/admin/products/${id}/edit`,
    gallery: '/admin/gallery',
    newProject: '/admin/gallery/new',
    editProject: (id) => `/admin/gallery/${id}/edit`,
    blog: '/admin/blog',
    newPost: '/admin/blog/new',
    editPost: (id) => `/admin/blog/${id}/edit`,
    newsletter: '/admin/newsletter',
    users: '/admin/users',
    emailTemplates: '/admin/email-templates',
    logs: '/admin/logs'
  },
  api: {
    contact: '/api/contact',
    newsletter: '/api/newsletter',
    blog: '/api/blog',
    products: '/api/products',
    admin: {
      auth: {
        login: '/api/admin/auth/login',
        logout: '/api/admin/auth/logout'
      },
      inquiries: {
        base: '/api/admin/inquiries',
        detail: (id) => `/api/admin/inquiries/${id}`,
        export: '/api/admin/inquiries/export'
      },
      products: {
        base: '/api/admin/products',
        detail: (id) => `/api/admin/products/${id}`
      },
      gallery: {
        base: '/api/admin/gallery',
        detail: (id) => `/api/admin/gallery/${id}`
      },
      blog: {
        base: '/api/admin/blog',
        detail: (id) => `/api/admin/blog/${id}`
      },
      newsletter: {
        base: '/api/admin/newsletter'
      },
      users: {
        base: '/api/admin/users',
        detail: (id) => `/api/admin/users/${id}`
      },
      emailTemplates: {
        base: '/api/admin/email-templates',
        detail: (id) => `/api/admin/email-templates/${id}`
      },
      logs: {
        base: '/api/admin/logs'
      }
    }
  }
}

export default routesConfig
