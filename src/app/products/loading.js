import React from 'react'
import Skeleton from '@/components/loading/Skeleton'
import SkeletonGrid from '@/components/loading/SkeletonGrid'

export default function ProductsLoading() {
  return (
    <div className="min-h-screen bg-[#F5F0EB] pb-20 relative select-none">
      
      {/* 1. Hero Section Skeleton */}
      <section className="relative pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-[1380px] mx-auto">
          <div className="relative w-full h-[62vh] sm:h-[70vh] lg:h-[75vh] min-h-[500px] rounded-[2.5rem] sm:rounded-[3.5rem] bg-[#EDE8E2]/60 animate-pulse border border-[#E8E2DA] flex items-end p-8 sm:p-12 md:p-16 lg:p-20">
            <div className="space-y-4 max-w-2xl w-full">
              <Skeleton variant="text" className="w-1/3 h-4 bg-black/10" />
              <Skeleton variant="text" className="w-2/3 h-12 bg-black/10" />
              <Skeleton variant="text" className="w-1/2 h-6 bg-black/10" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Filter Bar Skeleton */}
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 mb-12">
        <div className="w-full h-16 bg-[#EDE8E2]/50 border border-[#E8E2DA] rounded-3xl animate-pulse" />
      </div>

      {/* 3. Product Catalog Grid Section Skeleton */}
      <section className="pb-20 px-6 sm:px-10 lg:px-16">
        <div className="max-w-[1200px] mx-auto">
          {/* Section Header */}
          <div className="text-center mb-14 space-y-3">
            <Skeleton variant="text" className="w-24 h-3 mx-auto" />
            <Skeleton variant="text" className="w-48 h-10 mx-auto rounded-xl" />
            <div className="w-12 h-[2px] bg-[#0E4FB3]/20 mx-auto mt-5 rounded-full" />
          </div>

          {/* Grid */}
          <SkeletonGrid count={6} cols="3" />
        </div>
      </section>

    </div>
  )
}
