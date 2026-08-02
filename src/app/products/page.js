import ProductsClient from '@/components/products/ProductsClient'
import { getAllProducts } from '@/repositories/product.repository'

export const metadata = {
  title: 'Elevator Solutions & Products | FG Lifts Pvt. Ltd.',
  description: 'Explore FG Lift\'s complete range — passenger lifts, capsule elevators, goods lifts, home lifts, hospital lifts, and luxury cabin systems engineered for modern India.',
  openGraph: {
    title: 'Elevator Solutions & Products | FG Lift',
    description: 'Browse our complete vertical mobility catalog.',
    images: ['/images/og-products.jpg'],
  },
}

export default async function ProductsPage() {
  // Fetch products database entries
  const allProducts = await getAllProducts()
  const plainProducts = JSON.parse(JSON.stringify(allProducts))

  return (
    <ProductsClient initialProducts={plainProducts} />
  )
}
