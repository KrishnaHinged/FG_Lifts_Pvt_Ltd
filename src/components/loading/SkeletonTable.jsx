'use client'

import React from 'react'
import Skeleton from './Skeleton'

export function SkeletonTable({ rows = 5, cols = 4, className = '' }) {
  return (
    <div className={`w-full overflow-hidden rounded-2xl border border-[#E8E2DA] bg-white ${className}`}>
      <div className="bg-[#EDE8E2]/50 border-b border-[#E8E2DA] px-6 py-4 flex gap-4">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} variant="text" className="h-4 w-1/4" />
        ))}
      </div>
      <div className="divide-y divide-[#E8E2DA]">
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="px-6 py-4 flex gap-4">
            {Array.from({ length: cols }).map((_, c) => (
              <Skeleton key={c} variant="text" className="h-4 w-1/4" />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SkeletonTable
