import React from 'react'
import Section from './Section'

export function CTASection({ children, ...props }) {
  return (
    <Section background="creamAlt" className="py-20 lg:py-28" {...props}>
      {children}
    </Section>
  )
}

export default CTASection
