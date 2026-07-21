'use client'

import React from 'react'
import Skeleton from './Skeleton'

export function SkeletonImage({ className = 'h-[250px] w-full' }) {
  return (
    <div className={`relative overflow-hidden bg-[#EDE8E2]/40 rounded-2xl flex items-center justify-center ${className}`}>
      <Skeleton variant="rectangular" className="absolute inset-0 h-full w-full" />
    </div>
  )
}

export default SkeletonImage
