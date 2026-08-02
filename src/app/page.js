import HomeClient from '@/components/home/HomeClient'

export const metadata = {
  title: 'FG Lifts Pvt. Ltd. | Premium Vertical Mobility Solutions',
  description: 'FG Lift — Future & Growth. Premium passenger lifts, capsule elevators, goods lifts, home elevators, and vertical mobility solutions engineered for modern infrastructure across India.',
  openGraph: {
    title: 'FG Lifts Pvt. Ltd. | Premium Elevator Solutions',
    description: 'Custom luxury cabins and precision-engineered vertical mobility systems. Passenger, capsule, goods, home, and hospital lifts.',
    images: ['/images/hero-bg.jpg'],
  },
}

export default function HomePage() {
  return <HomeClient />
}
