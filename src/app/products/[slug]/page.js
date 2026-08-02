import { notFound } from 'next/navigation'
import { getProductBySlug, getRelatedProducts, getAllProducts } from '@/repositories/product.repository'
import ProductDetailClient from '@/components/product-detail/ProductDetailClient'
import { SchemaScript } from '@/seo/schema'
import { buildProductSchema, buildBreadcrumbSchema } from '@/seo/jsonld'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://fglifts.com'

export async function generateMetadata({ params }) {
  try {
    const { slug } = await params
    const product = await getProductBySlug(slug)
    if (!product) return { title: 'Product Not Found | FG Lift' }

    const title = product.metaTitle || `${product.name} | FG Lifts Pvt. Ltd.`
    const description = product.metaDescription || product.description?.slice(0, 155) || `${product.name} — premium elevator solution by FG Lift.`
    const keywords = product.metaKeywords || ''
    const imageUrl = product.images?.[0]?.url || '/images/og-home.jpg'

    return {
      title,
      description,
      keywords,
      alternates: {
        canonical: `${SITE_URL}/products/${slug}`
      },
      openGraph: {
        title: product.metaTitle || product.name,
        description: product.metaDescription || product.tagline || product.description?.slice(0, 155) || '',
        url: `${SITE_URL}/products/${slug}`,
        images: [{ url: imageUrl, alt: product.name }],
        type: 'website'
      },
      twitter: {
        card: 'summary_large_image',
        title: product.metaTitle || product.name,
        description: product.metaDescription || product.tagline || '',
        images: [imageUrl]
      }
    }
  } catch {
    return { title: 'Product | FG Lifts Pvt. Ltd.' }
  }
}

export async function generateStaticParams() {
  try {
    const products = await getAllProducts()
    return products
      .filter(p => p.isActive && p.slug)
      .map(p => ({ slug: p.slug }))
  } catch {
    return []
  }
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const related = await getRelatedProducts(product.category, product.slug)

  // Serialize objects for client components safely
  const serialize = (doc) => {
    if (!doc) return null
    if (Array.isArray(doc)) return doc.map(serialize)
    const obj = { ...doc }
    if (obj._id) obj._id = obj._id.toString()
    if (obj.createdAt) obj.createdAt = obj.createdAt.toString()
    if (obj.updatedAt) obj.updatedAt = obj.updatedAt.toString()
    return obj
  }

  const productSchema = buildProductSchema({
    name: product.name,
    description: product.metaDescription || product.description || product.tagline,
    slug: product.slug,
    category: product.category,
    image: product.images?.[0]?.url
  })

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Products', url: '/products' },
    { name: product.name, url: `/products/${product.slug}` }
  ])

  return (
    <>
      <SchemaScript schema={productSchema} />
      <SchemaScript schema={breadcrumbSchema} />
      <ProductDetailClient 
        product={serialize(product)} 
        related={serialize(related)} 
      />
    </>
  )
}
