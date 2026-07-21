/**
 * Project-specific Gallery helper.
 */

export function groupProjectsByCategory(projects) {
  if (!Array.isArray(projects)) return {}
  return projects.reduce((acc, project) => {
    const category = project.category || 'Other'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(project)
    return acc
  }, {})
}

export function generateCategoryList(projects) {
  if (!Array.isArray(projects)) return ['All']
  const categories = new Set(projects.map(p => p.category).filter(Boolean))
  return ['All', ...Array.from(categories)]
}

export function sortByYear(projects, direction = 'desc') {
  if (!Array.isArray(projects)) return []
  return [...projects].sort((a, b) => {
    const yearA = a.year || 0
    const yearB = b.year || 0
    return direction === 'desc' ? yearB - yearA : yearA - yearB
  })
}

export function getFeaturedProjects(projects) {
  if (!Array.isArray(projects)) return []
  return projects.filter(p => p.isActive && p.sortOrder <= 2)
}

export default {
  groupProjectsByCategory,
  generateCategoryList,
  sortByYear,
  getFeaturedProjects
}
