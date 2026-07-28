import React from 'react'
import Skeleton from '@/components/loading/Skeleton'
import SkeletonImage from '@/components/loading/SkeletonImage'
import SkeletonText from '@/components/loading/SkeletonText'

export default function ProductDetailLoading() {
  return (
    <div className="bg-[#F5F0EB] pt-32 pb-20 relative overflow-hidden select-none min-h-screen">
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-8">
        
        {/* Breadcrumb Navigation Skeleton */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] text-[#6B6B6B] uppercase tracking-[0.18em] mb-10 select-none">
          <Skeleton variant="text" className="w-16 h-3" />
          <span className="text-[#E8E2DA]">/</span>
          <Skeleton variant="text" className="w-20 h-3" />
          <span className="text-[#E8E2DA]">/</span>
          <Skeleton variant="text" className="w-16 h-3" />
          <span className="text-[#E8E2DA]">/</span>
          <Skeleton variant="text" className="w-24 h-3" />
        </div>

        {/* Main Grid - Two Columns Layout */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-20">
          
          {/* Left Column - Product Gallery Skeleton */}
          <div className="lg:col-span-7 w-full">
            {/* View Mode Toggle Strip Skeleton */}
            <div className="w-full h-[52px] bg-[#EDE8E2]/60 animate-pulse rounded-2xl mb-4" />
            
            {/* Main Image Aspect Ratio skeleton */}
            <div className="w-full aspect-[4/3]">
              <SkeletonImage className="h-full w-full" />
            </div>

            {/* Thumbnail Bar Skeleton */}
            <div className="flex gap-2.5 mt-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} variant="rectangular" className="w-[72px] h-[72px] rounded-xl flex-shrink-0" />
              ))}
            </div>
          </div>

          {/* Right Column - Product Specs Details */}
          <div className="lg:col-span-5 flex flex-col items-start gap-8">
            
            {/* Title & Badge */}
            <div className="w-full space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0E4FB3]/40" />
                <Skeleton variant="text" className="w-32 h-3" />
              </div>

              <Skeleton variant="text" className="w-4/5 h-10 rounded-xl" />
              <Skeleton variant="text" className="w-3/5 h-6 rounded-lg" />
            </div>

            {/* Description */}
            <SkeletonText lines={5} className="w-full" />

            {/* Divider */}
            <div className="w-full h-px bg-[#E8E2DA]/70" />

            {/* Application Chips Skeleton */}
            <div className="w-full space-y-3">
              <Skeleton variant="text" className="w-24 h-4" />
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} variant="rectangular" className="h-8 w-20 rounded-full" />
                ))}
              </div>
            </div>

            {/* Specs Table Skeleton */}
            <div className="w-full space-y-4 pt-2">
              <Skeleton variant="text" className="w-28 h-4" />
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-[#E8E2DA]/40">
                    <Skeleton variant="text" className="w-1/3 h-4" />
                    <Skeleton variant="text" className="w-1/4 h-4" />
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Panel Skeleton */}
            <Skeleton variant="rectangular" className="w-full h-24 rounded-2xl animate-pulse" />

          </div>
        </div>

      </div>
    </div>
  )
}
