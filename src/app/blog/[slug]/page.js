import { getPostBySlug, getRelatedPosts, incrementPostViews, getAllPublishedPosts } from '@/repositories/blog.repository'
import BlogDetail from '@/components/blog/BlogDetail'
import { notFound } from 'next/navigation'
import { SchemaScript } from '@/seo/schema'
import { buildArticleSchema, buildBreadcrumbSchema } from '@/seo/jsonld'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://fglifts.com'

export async function generateMetadata({ params }) {
  try {
    const { slug } = await params
    const post = await getPostBySlug(slug)
    if (!post) return { title: 'Article Not Found | FG Lift' }

    const title = `${post.title} | FG Lifts Blog`
    const description = post.excerpt || post.title
    const imageUrl = post.coverImage || '/images/og-blog.jpg'

    return {
      title,
      description,
      alternates: {
        canonical: `${SITE_URL}/blog/${slug}`
      },
      openGraph: {
        title: post.title,
        description,
        url: `${SITE_URL}/blog/${slug}`,
        images: [{ url: imageUrl, alt: post.title }],
        type: 'article',
        publishedTime: post.publishedAt,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description,
        images: [imageUrl]
      }
    }
  } catch {
    return { title: 'Article | FG Lifts Blog' }
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

  const articleSchema = buildArticleSchema({
    title: post.title,
    description: post.excerpt || post.title,
    slug: post.slug,
    image: post.coverImage,
    author: post.author || 'FG Lifts Editorial Team',
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt?.toISOString()
  })

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.title, url: `/blog/${post.slug}` }
  ])

  return (
    <>
      <SchemaScript schema={articleSchema} />
      <SchemaScript schema={breadcrumbSchema} />
      <BlogDetail post={serializedPost} relatedPosts={serializedRelated} />
    </>
  )
}
