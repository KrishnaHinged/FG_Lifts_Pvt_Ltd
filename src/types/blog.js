/**
 * @fileoverview Data contract for Blog posts.
 */

/**
 * @typedef {Object} BlogAuthor
 * @property {string} name - Author profile name.
 * @property {string} [avatar] - Image path of the author.
 * @property {string} [title] - Job title or division.
 */

/**
 * @typedef {Object} BlogPost
 * @property {string} [id] - Unique Database Identifier.
 * @property {string} slug - Unique URL-friendly slug.
 * @property {string} title - Headline.
 * @property {string} [excerpt] - Condensed synopsis.
 * @property {string} [coverImage] - Banner image path.
 * @property {string} [coverImageAlt] - Accessibility alternative.
 * @property {string} [content] - Full HTML/Markdown content.
 * @property {string} [category] - General classification.
 * @property {string[]} tags - Filter tag keywords.
 * @property {BlogAuthor} [author] - Profile of the creator.
 * @property {number} [readTime] - Calculated minutes to read.
 * @property {boolean} isPublished - Active availability status.
 * @property {boolean} isFeatured - Spotlight highlight status.
 * @property {string|Date} [publishedAt] - ISO timestamp or Date object.
 * @property {number} views - Counter metrics.
 * @property {string[]} relatedSlugs - Slugs of other related blog posts.
 */

export const BlogPostContract = {
  slug: '',
  title: '',
  excerpt: '',
  coverImage: '',
  coverImageAlt: '',
  content: '',
  category: '',
  tags: [],
  author: {
    name: 'FG Lift Editorial Team',
    avatar: '',
    title: 'Content Team'
  },
  readTime: 1,
  isPublished: false,
  isFeatured: false,
  publishedAt: null,
  views: 0,
  relatedSlugs: []
}

export default BlogPostContract
