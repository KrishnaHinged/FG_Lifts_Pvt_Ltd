'use client'

import React from 'react'
import Skeleton from './Skeleton'

export function SkeletonText({ lines = 3, className = '' }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton 
          key={i} 
          variant="text" 
          className={i === lines - 1 && lines > 1 ? 'w-2/3' : 'w-full'} 
        />
      ))}
    </div>
  )
}

export default SkeletonText
