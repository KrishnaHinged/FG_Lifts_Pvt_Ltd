import React from 'react'
import Stack from './Stack'

export function SpaceBetween({ children, direction = 'horizontal', gap = '4', ...props }) {
  return (
    <Stack direction={direction} justify="between" align="center" gap={gap} {...props}>
      {children}
    </Stack>
  )
}

export default SpaceBetween
