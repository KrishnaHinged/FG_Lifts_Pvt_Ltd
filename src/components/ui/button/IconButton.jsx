'use client'

import React from 'react'
import Button from '../Button'

export function IconButton({ icon: Icon, size = 'md', ...props }) {
  return (
    <Button 
      variant="outline" 
      size={size} 
      className="p-3 min-w-0 rounded-full flex items-center justify-center"
      {...props}
    >
      <Icon size={16} />
    </Button>
  )
}

export default IconButton
