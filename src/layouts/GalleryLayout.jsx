'use client'

import React from 'react'
import Container from './Container'
import Section from './Section'

export function GalleryLayout({
  filterBar,
  projectsGrid,
  className = '',
  ...props
}) {
  return (
    <Section background="cream" size="default" className={className} {...props}>
      <Container>
        {filterBar && <div className="mb-12 flex justify-center">{filterBar}</div>}
        <div className="w-full">
          {projectsGrid}
        </div>
      </Container>
    </Section>
  )
}

export default GalleryLayout
