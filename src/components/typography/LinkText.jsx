import React from 'react'
import Link from 'next/link'
import Typography from './Typography'

export function LinkText({ children, href = '#', className = '', ...props }) {
  return (
    <Link href={href} className="no-underline group inline-flex items-center">
      <Typography
        as="span"
        font="sans"
        size="base"
        weight="semibold"
        color="default"
        className={`group-hover:text-[#0E4FB3] transition-colors duration-200 ${className}`}
        {...props}
      >
        {children}
      </Typography>
    </Link>
  )
}

export default LinkText
