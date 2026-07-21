import React from 'react'
import Container from '@/layouts/Container'
import Section from '@/layouts/Section'
import PageHero from '@/layouts/PageHero'
import SkeletonGrid from '@/components/loading/SkeletonGrid'

export default function BlogLoading() {
  return (
    <>
      <PageHero
        title="Editorial News"
        subtitle="Insights, engineering guidelines, component specifications, and brand updates."
        badge="News & Blog"
      />
      <Section background="cream">
        <Container>
          <SkeletonGrid count={6} cols="3" />
        </Container>
      </Section>
    </>
  )
}
