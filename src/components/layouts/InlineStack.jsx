import React from 'react'
import Stack from './Stack'

export function InlineStack({ children, align = 'center', gap = '4', ...props }) {
  return (
    <Stack direction="horizontal" align={align} gap={gap} {...props}>
      {children}
    </Stack>
  )
}

export default InlineStack
