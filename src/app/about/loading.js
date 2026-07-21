import React from 'react'
import Container from '@/layouts/Container'
import Section from '@/layouts/Section'
import PageHero from '@/layouts/PageHero'
import Skeleton from '@/components/loading/Skeleton'
import SkeletonText from '@/components/loading/SkeletonText'

export default function AboutLoading() {
  return (
    <>
      <PageHero
        title="Our Legacy"
        subtitle="Precision elevator engineering pioneering vertical mobility since 1993."
        badge="Established 1993"
      />
      <Section background="cream">
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Skeleton variant="text" className="w-1/3 h-6" />
            <SkeletonText lines={6} />
          </div>
          <Skeleton variant="rectangular" className="h-[350px] w-full" />
        </Container>
      </Section>
    </>
  )
}
