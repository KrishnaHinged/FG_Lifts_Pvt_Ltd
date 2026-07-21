/**
 * @fileoverview Data contract for sitemaps and navigation items.
 */

/**
 * @typedef {Object} NavItem
 * @property {string} label - Display name of navigation link.
 * @property {string} href - URL routing destination.
 */

/**
 * @typedef {Object} BreadcrumbItem
 * @property {string} label - Display label (e.g. "Products").
 * @property {string} [href] - Target URL path (optional if current active page).
 */

/**
 * @typedef {Object} SidebarItem
 * @property {string} label - Display item label.
 * @property {string} href - Target router destination path.
 * @property {string} [icon] - Lucide icon name lookup code.
 */

export const NavigationContract = {
  label: '',
  href: ''
}
export default NavigationContract
