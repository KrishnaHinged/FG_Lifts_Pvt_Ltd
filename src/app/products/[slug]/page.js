import { notFound } from 'next/navigation'
import { getProductBySlug, getRelatedProducts, getAllProducts } from '@/repositories/product.repository'
import ProductDetailClient from '@/components/product-detail/ProductDetailClient'

export async function generateMetadata({ params }) {
  try {
    const { slug } = await params
    const product = await getProductBySlug(slug)
    if (!product) return { title: 'Product Not Found | FG Lift' }

    const title = product.metaTitle || `${product.name} | FG Lift Pvt. Ltd.`
    const description = product.metaDescription || product.description?.slice(0, 155) || `${product.name} — premium elevator solution by FG Lift.`
    const keywords = product.metaKeywords || ''

    return {
      title,
      description,
      keywords,
      openGraph: {
        title: product.metaTitle || product.name,
        description: product.metaDescription || product.tagline || product.description?.slice(0, 100) || '',
        images: [product.images?.[0]?.url || '/images/og-home.jpg'],
      },
    }
  } catch {
    return { title: 'Product | FG Lift' }
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

  return (
    <ProductDetailClient 
      product={serialize(product)} 
      related={serialize(related)} 
    />
  )
}
