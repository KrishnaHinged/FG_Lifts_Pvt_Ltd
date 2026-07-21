import routesConfig from '@/config/routes'

/**
 * Project-specific navigation state helpers.
 */

export function isActiveRoute(currentPath, targetHref) {
  if (targetHref === '/') return currentPath === '/'
  if (targetHref.includes('#')) return false
  return currentPath === targetHref || currentPath.startsWith(targetHref)
}

export function getNextPage(currentPath) {
  // Simple wizard navigation assistant helper
  const flow = [
    routesConfig.home,
    routesConfig.about,
    routesConfig.products,
    routesConfig.gallery,
    routesConfig.blog
  ]
  const idx = flow.indexOf(currentPath)
  if (idx !== -1 && idx < flow.length - 1) return flow[idx + 1]
  return null
}

export function getPreviousPage(currentPath) {
  const flow = [
    routesConfig.home,
    routesConfig.about,
    routesConfig.products,
    routesConfig.gallery,
    routesConfig.blog
  ]
  const idx = flow.indexOf(currentPath)
  if (idx > 0) return flow[idx - 1]
  return null
}

export default {
  isActiveRoute,
  getNextPage,
  getPreviousPage
}
