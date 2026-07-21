import React from 'react'
import Section from './Section'

export function LightSection({ children, ...props }) {
  return (
    <Section background="cream" {...props}>
      {children}
    </Section>
  )
}

export default LightSection
