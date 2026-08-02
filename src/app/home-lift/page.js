import HomeLiftClient from './HomeLiftClient'
import { getAllProducts } from '@/repositories/product.repository'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Glarie Homelift Series | German Engineering Elevators | FG Lifts Pvt. Ltd.',
  description: 'Discover the Glarie Homelift Series — GEH160 steel rope and GEH320S steel belt home elevators. Premium German engineering, space-saving shaft layouts, and luxury cabin customizable finishes.',
  openGraph: {
    title: 'Glarie Homelift Series | Luxury Home Lifts',
    description: 'German noble demeanor, building legendary artistic quality for private luxury residences.',
    images: ['/images/elevator-gold.jpg'],
  },
}

export default async function HomeLiftPage() {
  // Fetch only Home Lift products from database
  const homeLifts = await getAllProducts({ category: 'Home Lift' })
  const plainProducts = JSON.parse(JSON.stringify(homeLifts))

  return (
    <HomeLiftClient initialProducts={plainProducts} />
  )
}
