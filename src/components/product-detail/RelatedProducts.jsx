'use client'

import ProductCard from '@/components/products/ProductCard'

export default function RelatedProducts({ products = [] }) {
  if (!products || products.length === 0) return null

  return (
    <div className="w-full mt-20">
      <h3 className="font-display text-2xl sm:text-3xl text-fg-dark mb-8 text-center lg:text-left">
        You May Also Consider
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  )
}
