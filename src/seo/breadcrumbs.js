/**
 * Automatic Breadcrumb Structure Builder
 * FG Lifts Pvt. Ltd.
 */

export function generateBreadcrumbsFromPath(pathname = '') {
  if (!pathname || pathname === '/') {
    return [{ name: 'Home', url: '/' }]
  }

  const segments = pathname.split('/').filter(Boolean)
  const breadcrumbs = [{ name: 'Home', url: '/' }]

  let accumulatedPath = ''
  segments.forEach(segment => {
    accumulatedPath += `/${segment}`
    // Format label: capitalize and replace hyphens with spaces
    const name = segment
      .replace(/-/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase())

    breadcrumbs.push({
      name,
      url: accumulatedPath
    })
  })

  return breadcrumbs
}

export default generateBreadcrumbsFromPath
