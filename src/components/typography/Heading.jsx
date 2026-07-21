import React from 'react'
import Typography from './Typography'

export function Heading({ children, level = '1', ...props }) {
  const sizeMap = {
    1: 'xl',
    2: 'lg',
    3: 'md',
    4: 'base'
  }

  return (
    <Typography as={`h${level}`} font="sans" size={sizeMap[level]} weight="bold" {...props}>
      {children}
    </Typography>
  )
}

export default Heading
