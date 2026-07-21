'use client'

import React from 'react'
import Skeleton from './Skeleton'

export function SkeletonCard({ className = '' }) {
  return (
    <div className={`bg-white border border-[#E8E2DA] rounded-[32px] p-6 space-y-4 ${className}`}>
      <Skeleton variant="rectangular" className="h-[200px] w-full" />
      <Skeleton variant="text" className="w-1/3 h-5" />
      <Skeleton variant="text" className="w-3/4 h-6" />
      <Skeleton variant="text" className="w-5/6 h-4" />
      <div className="flex gap-2 pt-2">
        <Skeleton variant="circular" className="h-6 w-12" />
        <Skeleton variant="circular" className="h-6 w-16" />
      </div>
    </div>
  )
}

export default SkeletonCard
