import React from 'react'
import Skeleton from '@/components/loading/Skeleton'
import SkeletonGrid from '@/components/loading/SkeletonGrid'

export default function GalleryLoading() {
  return (
    <div className="min-h-screen bg-[#F5F0EB] pb-24 relative select-none">
      <section className="relative pt-32 pb-16 px-3 sm:px-4 lg:px-6">
        <div className="max-w-[2400px] mx-auto relative z-10">
          
          {/* Banner Skeleton */}
          <div className="relative w-full h-[40vh] sm:h-[50vh] md:h-[55vh] rounded-[2rem] sm:rounded-[3rem] overflow-hidden border border-[#E8E2DA] bg-[#EDE8E2]/40 animate-pulse flex items-center p-8 sm:p-12 md:p-16 lg:p-20 mb-16">
            <div className="space-y-4 max-w-2xl w-full">
              <Skeleton variant="text" className="w-1/3 h-4 bg-black/10" />
              <Skeleton variant="text" className="w-2/3 h-12 bg-black/10" />
              <Skeleton variant="text" className="w-1/2 h-6 bg-black/10" />
            </div>
          </div>

          <div className="max-w-[1200px] mx-auto">
            {/* Category Filter Skeleton */}
            <div className="flex flex-wrap items-center justify-center mb-10 gap-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} variant="rectangular" className="h-6 w-16 rounded-full" />
              ))}
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-[#E8E2DA] mb-12" />

            {/* Projects Grid Skeleton */}
            <SkeletonGrid count={6} cols="3" />
          </div>

        </div>
      </section>
    </div>
  )
}
