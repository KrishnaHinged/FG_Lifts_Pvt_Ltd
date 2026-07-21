import React from 'react'
import Container from '@/layouts/Container'
import Section from '@/layouts/Section'
import PageHero from '@/layouts/PageHero'
import SkeletonGrid from '@/components/loading/SkeletonGrid'

export default function ProductsLoading() {
  return (
    <>
      <PageHero 
        title="Products Catalog" 
        subtitle="Elevators, custom cabins, and vertical transit components."
        badge="Systems & Components"
      />
      <Section background="cream">
        <Container>
          <div className="flex gap-4 mb-8 justify-center">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-[#EDE8E2] h-10 w-24 rounded-full" />
            ))}
          </div>
          <SkeletonGrid count={6} cols="3" />
        </Container>
      </Section>
    </>
  )
}
