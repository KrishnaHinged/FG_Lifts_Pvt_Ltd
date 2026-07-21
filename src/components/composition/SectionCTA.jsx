import React from 'react'
import Section from '@/components/layouts/Section'
import Container from '@/components/layouts/Container'
import BannerCTA from './BannerCTA'

export function SectionCTA({ onClick, ...props }) {
  return (
    <Section background="cream" size="compact" {...props}>
      <Container>
        <BannerCTA onClick={onClick} />
      </Container>
    </Section>
  )
}

export default SectionCTA
