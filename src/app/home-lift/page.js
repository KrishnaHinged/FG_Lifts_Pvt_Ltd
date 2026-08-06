import HomeLiftClient from './HomeLiftClient'
import { getAllProducts } from '@/repositories/product.repository'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'FG Homelift Series | German Engineering Elevators | FG Lifts Pvt. Ltd.',
  description: 'Discover the FG Homelift Series — FG160 steel rope and FG320S steel belt home elevators. Premium German engineering, space-saving shaft layouts, and luxury cabin customizable finishes.',
  openGraph: {
    title: 'FG Homelift Series | Luxury Home Lifts',
    description: 'Building Artistic Quality for Private Luxury Residences.',
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
