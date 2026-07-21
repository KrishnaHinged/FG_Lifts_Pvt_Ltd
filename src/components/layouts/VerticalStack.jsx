import React from 'react'
import Stack from './Stack'

export function VerticalStack({ children, gap = '6', ...props }) {
  return (
    <Stack direction="vertical" gap={gap} {...props}>
      {children}
    </Stack>
  )
}

export default VerticalStack
