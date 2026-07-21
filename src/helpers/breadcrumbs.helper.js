import routesConfig from '@/config/routes'
import { capitalize } from '@/utils/string'

/**
 * Navigation Breadcrumb path builder helper.
 */

export function getBreadcrumbsForRoute(pathname) {
  if (!pathname || pathname === '/') return []

  const parts = pathname.split('/').filter(Boolean)
  const list = []

  let accumulatedPath = ''

  // Add home root first
  list.push({ label: 'Home', href: routesConfig.home })

  parts.forEach((part, index) => {
    accumulatedPath += `/${part}`
    const isLast = index === parts.length - 1

    let label = capitalize(part.replace(/-/g, ' '))
    
    // Explicit label overrides
    if (part === 'about') label = 'About Us'
    if (part === 'products') label = 'Products Catalog'
    if (part === 'gallery') label = 'Masonry Case Studies'
    if (part === 'blog') label = 'News & Articles'
    if (part === 'admin') label = 'Control Desk'

    list.push({
      label,
      href: isLast ? null : accumulatedPath
    })
  })

  return list
}

export default {
  getBreadcrumbsForRoute
}
