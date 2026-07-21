import React from 'react'
import Container from '@/layouts/Container'
import Section from '@/layouts/Section'
import Skeleton from '@/components/loading/Skeleton'
import SkeletonImage from '@/components/loading/SkeletonImage'
import SkeletonText from '@/components/loading/SkeletonText'

export default function BlogPostDetailLoading() {
  return (
    <>
      <Section background="dark" size="compact" className="h-[300px] flex items-center">
        <Container size="compact">
          <div className="space-y-4 text-center">
            <Skeleton variant="text" className="w-1/4 h-5 bg-white/10 mx-auto" />
            <Skeleton variant="text" className="w-3/4 h-10 bg-white/10 mx-auto" />
            <div className="flex justify-center items-center gap-3 pt-2">
              <Skeleton variant="circular" className="h-8 w-8 bg-white/10" />
              <Skeleton variant="text" className="w-20 h-4 bg-white/10" />
            </div>
          </div>
        </Container>
      </Section>
      <Section background="cream">
        <Container size="compact" className="space-y-8">
          <SkeletonImage className="h-[400px]" />
          <SkeletonText lines={12} />
        </Container>
      </Section>
    </>
  )
}
