'use client'

import React from 'react'
import Container from './Container'
import Section from './Section'

export function ProductLayout({
  hero,
  gallery,
  configurator,
  specifications,
  cta,
  className = '',
  ...props
}) {
  return (
    <div className={`space-y-0 ${className}`} {...props}>
      {hero}
      {configurator && <Section background="dark" size="default">{configurator}</Section>}
      {gallery && <Section background="cream" size="default">{gallery}</Section>}
      {specifications && <Section background="creamAlt" size="compact">{specifications}</Section>}
      {cta && <Section background="cream" size="compact">{cta}</Section>}
    </div>
  )
}

export default ProductLayout
