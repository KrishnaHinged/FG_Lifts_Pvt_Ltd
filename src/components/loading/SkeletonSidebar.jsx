'use client'

import React from 'react'
import Skeleton from './Skeleton'

export function SkeletonSidebar({ className = '' }) {
  return (
    <div className={`h-full w-full bg-[#111111] p-6 space-y-8 flex flex-col justify-between ${className}`}>
      <div className="space-y-6">
        <Skeleton variant="rectangular" className="h-6 w-24 bg-white/10" />
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton variant="circular" className="h-5 w-5 bg-white/10" />
              <Skeleton variant="text" className="h-4 w-28 bg-white/10" />
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Skeleton variant="circular" className="h-8 w-8 bg-white/10" />
        <Skeleton variant="text" className="h-4 w-20 bg-white/10" />
      </div>
    </div>
  )
}

export default SkeletonSidebar
