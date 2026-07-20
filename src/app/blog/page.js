import { getAllPublishedPosts, getFeaturedPost, getAllCategories } from '@/repositories/blog.repository'
import BlogClient from '@/components/blog/BlogClient'

export const metadata = {
  title: 'Elevator Insights & Industry News | FG Lift Blog',
  description: 'Technical guides, project spotlights, product launches, and elevator industry insights from the FG Lift editorial team.',
  openGraph: {
    title: 'The FG Lift Journal',
    description: 'Industry expertise and engineering insights.',
    images: ['/images/og-blog.jpg'],
  },
}

export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  const [posts, featuredPost, categories] = await Promise.all([
    getAllPublishedPosts(),
    getFeaturedPost(),
    getAllCategories(),
  ])

  // Serialize Mongoose objects for client
  const serializedPosts = posts.map(p => ({
    ...p,
    _id: p._id?.toString(),
    publishedAt: p.publishedAt?.toISOString() || null,
    createdAt: p.createdAt?.toISOString() || null,
    updatedAt: p.updatedAt?.toISOString() || null,
  }))

  const serializedFeatured = featuredPost
    ? {
        ...featuredPost,
        _id: featuredPost._id?.toString(),
        publishedAt: featuredPost.publishedAt?.toISOString() || null,
        createdAt: featuredPost.createdAt?.toISOString() || null,
        updatedAt: featuredPost.updatedAt?.toISOString() || null,
      }
    : null

  return (
    <BlogClient
      initialPosts={serializedPosts}
      initialCategories={categories}
      featuredPost={serializedFeatured}
    />
  )
}
