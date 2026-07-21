/**
 * Project-specific Blog helper.
 */

export function estimateReadTime(content) {
  if (!content) return 1
  const wordCount = content.replace(/<[^>]+>/g, '').split(/\s+/).length
  return Math.max(1, Math.ceil(wordCount / 200))
}

export function generateExcerpt(content, maxLength = 160) {
  if (!content) return ''
  const cleanText = content.replace(/<[^>]+>/g, '')
  if (cleanText.length <= maxLength) return cleanText
  return cleanText.slice(0, maxLength).trim() + '...'
}

export function generateSharingLinks(post) {
  if (!post || !post.slug) return {}
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://fglifts.com'
  const url = encodeURIComponent(`${baseUrl}/blog/${post.slug}`)
  const title = encodeURIComponent(post.title || '')
  
  return {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
    whatsapp: `https://api.whatsapp.com/send?text=${title}%20${url}`
  }
}

export default {
  estimateReadTime,
  generateExcerpt,
  generateSharingLinks
}
