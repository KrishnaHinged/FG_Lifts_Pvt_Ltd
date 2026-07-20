import AboutHero from '@/components/about/AboutHero'
import BrandStory from '@/components/about/BrandStory'
import VisionMission from '@/components/about/VisionMission'
import ManufacturingBlock from '@/components/about/ManufacturingBlock'
import Leadership from '@/components/about/Leadership'
import MilestoneTimeline from '@/components/about/MilestoneTimeline'
import CertificationsStrip from '@/components/about/CertificationsStrip'
import AboutCTA from '@/components/about/AboutCTA'

export const metadata = {
  title: 'About FG Lift Pvt. Ltd. | Our Story & Manufacturing',
  description: 'Learn about FG Lift — our history, manufacturing capabilities, leadership team, and commitment to precision vertical mobility solutions across India.',
  openGraph: {
    title: 'About FG Lift Pvt. Ltd.',
    description: 'Premium elevator manufacturing excellence since establishment.',
    images: ['/images/og-about.jpg'],
  },
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <BrandStory />
      <VisionMission />
      <ManufacturingBlock />
      <Leadership />
      <MilestoneTimeline />
      <CertificationsStrip />
      <AboutCTA />
    </>
  )
}
