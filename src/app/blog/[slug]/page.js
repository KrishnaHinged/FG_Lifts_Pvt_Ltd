import { getPostBySlug, getRelatedPosts, incrementPostViews, getAllPublishedPosts } from '@/repositories/blog.repository'
import BlogDetail from '@/components/blog/BlogDetail'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  try {
    const { slug } = await params
    const post = await getPostBySlug(slug)
    if (!post) return { title: 'Article Not Found | FG Lift' }
    return {
      title: `${post.title} | FG Lift Blog`,
      description: post.excerpt || post.title,
      openGraph: {
        title: post.title,
        description: post.excerpt || '',
        images: [post.coverImage || '/images/og-blog.jpg'],
        type: 'article',
        publishedTime: post.publishedAt,
      },
    }
  } catch {
    return { title: 'Article | FG Lift Blog' }
  }
}

export async function generateStaticParams() {
  try {
    const posts = await getAllPublishedPosts()
    return posts
      .filter(p => p.slug)
      .map(p => ({ slug: p.slug }))
  } catch {
    return []
  }
}

export const dynamicParams = true

export default async function BlogDetailPage({ params }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  // Increment views (fire and forget)
  incrementPostViews(slug).catch((err) =>
    console.error('View count error:', err)
  )

  // Related posts
  const relatedPosts = await getRelatedPosts(post.relatedSlugs || [], slug)

  // Serialize for client
  const serializedPost = {
    ...post,
    _id: post._id?.toString(),
    publishedAt: post.publishedAt?.toISOString() || null,
    createdAt: post.createdAt?.toISOString() || null,
    updatedAt: post.updatedAt?.toISOString() || null,
  }

  const serializedRelated = relatedPosts.map(p => ({
    ...p,
    _id: p._id?.toString(),
    publishedAt: p.publishedAt?.toISOString() || null,
    createdAt: p.createdAt?.toISOString() || null,
    updatedAt: p.updatedAt?.toISOString() || null,
  }))

  return <BlogDetail post={serializedPost} relatedPosts={serializedRelated} />
}
