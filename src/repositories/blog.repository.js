import { connectDB } from '@/lib/mongodb'
import BlogPost from '@/models/BlogPost'

export async function getAllPublishedPosts(filters = {}) {
  await connectDB()
  const query = { isPublished: true }
  if (filters.category && filters.category !== 'All') query.category = filters.category
  if (filters.tag) query.tags = { $in: [filters.tag] }
  return BlogPost.find(query)
    .sort({ publishedAt: -1 })
    .select('-content')
    .lean()
}

export async function getFeaturedPost() {
  await connectDB()
  return BlogPost.findOne({ isPublished: true, isFeatured: true })
    .select('-content')
    .lean()
}

export async function getPostBySlug(slug) {
  await connectDB()
  return BlogPost.findOne({ slug, isPublished: true }).lean()
}

export async function getRelatedPosts(slugs = [], currentSlug) {
  await connectDB()
  if (!slugs.length) return []
  return BlogPost.find({
    slug: { $in: slugs, $ne: currentSlug },
    isPublished: true
  }).select('-content').limit(3).lean()
}

export async function incrementPostViews(slug) {
  await connectDB()
  return BlogPost.findOneAndUpdate({ slug }, { $inc: { views: 1 } })
}

export async function getAllCategories() {
  await connectDB()
  return BlogPost.distinct('category', { isPublished: true })
}

// Admin database queries
export async function getAllPostsAdmin() {
  await connectDB()
  return BlogPost.find().sort({ createdAt: -1 }).lean()
}

export async function getPostById(id) {
  await connectDB()
  return BlogPost.findById(id).lean()
}

export async function createPost(data) {
  await connectDB()
  return BlogPost.create(data)
}

export async function updatePost(id, data) {
  await connectDB()
  return BlogPost.findByIdAndUpdate(id, data, { new: true }).lean()
}

export async function deletePost(id) {
  await connectDB()
  return BlogPost.findByIdAndDelete(id).lean()
}

export async function countPosts(query = {}) {
  await connectDB()
  return BlogPost.countDocuments(query)
}
