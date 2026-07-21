'use client'

import React from 'react'
import Container from './Container'
import Section from './Section'
import Content from './Content'

export function ArticleLayout({
  children,
  header,
  footer,
  className = '',
  ...props
}) {
  return (
    <Section background="cream" className={className} {...props}>
      <Container size="compact">
        {header && <header className="mb-10 text-center">{header}</header>}
        <Content>
          {children}
        </Content>
        {footer && <footer className="mt-16 border-t border-[#E8E2DA] pt-8">{footer}</footer>}
      </Container>
    </Section>
  )
}

export default ArticleLayout
