import { getAssetUrl } from '@/adapters/storage.adapter'

export function mapToBlogDTO(post) {
  if (!post) return null
  return {
    id: post._id?.toString(),
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt || '',
    coverImage: post.coverImage ? getAssetUrl(post.coverImage) : '',
    coverImageAlt: post.coverImageAlt || '',
    content: post.content || '',
    category: post.category || '',
    tags: post.tags || [],
    author: post.author ? {
      name: post.author.name || '',
      avatar: post.author.avatar ? getAssetUrl(post.author.avatar) : '',
      title: post.author.title || ''
    } : null,
    readTime: post.readTime || 1,
    isPublished: !!post.isPublished,
    isFeatured: !!post.isFeatured,
    publishedAt: post.publishedAt || null,
    views: post.views || 0,
    relatedSlugs: post.relatedSlugs || []
  }
}

export function mapToBlogListDTO(posts) {
  if (!Array.isArray(posts)) return []
  return posts.map(mapToBlogDTO)
}
