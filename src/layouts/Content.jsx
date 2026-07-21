'use client'

import React from 'react'

export function Content({
  children,
  className = '',
  as: Component = 'article',
  ...props
}) {
  return (
    <Component
      className={`w-full max-w-[780px] mx-auto font-sans text-[#525252] leading-relaxed text-base prose prose-neutral ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Content
