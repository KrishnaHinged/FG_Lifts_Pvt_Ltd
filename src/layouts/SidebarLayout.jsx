'use client'

import React from 'react'
import Container from './Container'

export function SidebarLayout({
  sidebar,
  children,
  className = '',
  sidebarPosition = 'left', // left | right
  ...props
}) {
  const sidebarOrder = sidebarPosition === 'left' ? 'order-1' : 'order-1 lg:order-2'
  const contentOrder = sidebarPosition === 'left' ? 'order-2' : 'order-2 lg:order-1'

  return (
    <Container className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 ${className}`} {...props}>
      <aside className={`lg:col-span-4 xl:col-span-3 ${sidebarOrder}`}>
        {sidebar}
      </aside>
      <main className={`lg:col-span-8 xl:col-span-9 ${contentOrder}`}>
        {children}
      </main>
    </Container>
  )
}

export default SidebarLayout
