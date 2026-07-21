import React from 'react'
import Container from '@/layouts/Container'
import Section from '@/layouts/Section'
import Skeleton from '@/components/loading/Skeleton'
import SkeletonImage from '@/components/loading/SkeletonImage'
import SkeletonText from '@/components/loading/SkeletonText'

export default function ProductDetailLoading() {
  return (
    <>
      <Section background="dark" size="compact" className="h-[400px] flex items-center">
        <Container>
          <div className="space-y-4">
            <Skeleton variant="text" className="w-1/4 h-5 bg-white/10" />
            <Skeleton variant="text" className="w-1/2 h-12 bg-white/10" />
            <Skeleton variant="text" className="w-1/3 h-6 bg-white/10" />
          </div>
        </Container>
      </Section>
      <Section background="cream">
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <SkeletonImage className="h-[450px]" />
          <div className="space-y-6">
            <Skeleton variant="text" className="w-1/3 h-6" />
            <SkeletonText lines={6} />
            <div className="pt-6 grid grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} variant="rectangular" className="h-20" />
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
