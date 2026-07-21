'use client'

import React from 'react'
import Skeleton from './Skeleton'
import SkeletonGrid from './SkeletonGrid'
import SkeletonTable from './SkeletonTable'

export function SkeletonDashboard({ className = '' }) {
  return (
    <div className={`space-y-8 ${className}`}>
      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white border border-[#E8E2DA] rounded-[32px] p-6 space-y-3">
            <Skeleton variant="text" className="w-1/2 h-4" />
            <Skeleton variant="text" className="w-1/3 h-8" />
            <Skeleton variant="text" className="w-2/3 h-4" />
          </div>
        ))}
      </div>

      {/* Primary Analytics & Recent rows split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white border border-[#E8E2DA] rounded-[32px] p-6 h-[350px] flex items-end gap-6 justify-around">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} variant="rectangular" className="w-10 h-2/3" />
          ))}
        </div>
        <div className="lg:col-span-4 bg-white border border-[#E8E2DA] rounded-[32px] p-6 space-y-6">
          <Skeleton variant="text" className="w-1/2 h-5" />
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="space-y-1.5 w-2/3">
                  <Skeleton variant="text" className="w-full h-4" />
                  <Skeleton variant="text" className="w-1/2 h-3" />
                </div>
                <Skeleton variant="circular" className="h-6 w-12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonDashboard
