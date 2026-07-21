import React from 'react'
import Section from './Section'

export function DarkSection({ children, ...props }) {
  return (
    <Section background="dark" {...props}>
      {children}
    </Section>
  )
}

export default DarkSection
