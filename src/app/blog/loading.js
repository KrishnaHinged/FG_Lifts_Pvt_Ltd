import React from 'react'
import Skeleton from '@/components/loading/Skeleton'

export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-[#F5F0EB] pb-24 relative select-none">
      {/* Blog Hero Skeleton */}
      <section className="relative h-[60vh] w-full bg-[#111111] overflow-hidden flex items-center justify-center text-center">
        <div className="relative z-10 px-6 max-w-5xl flex flex-col items-center w-full space-y-4">
          <Skeleton variant="text" className="w-48 h-3 bg-white/20 rounded mx-auto" />
          <Skeleton variant="text" className="w-80 h-16 sm:h-24 bg-white/20 rounded-3xl mx-auto" />
          <Skeleton variant="text" className="w-96 h-3 bg-white/20 rounded mx-auto" />
        </div>
        <div 
          className="absolute bottom-0 left-0 right-0 h-[100px] z-15 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent, #F5F0EB)'
          }}
        />
      </section>

      {/* Categories Row Skeleton */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 mt-16">
        <div className="flex flex-wrap items-center justify-center mb-10 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} variant="rectangular" className="h-6 w-20 rounded-full" />
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#E8E2DA] mb-12" />

        {/* Blog Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
          {/* Card 1: Wide */}
          <div className="lg:col-span-8 md:col-span-12 col-span-12">
            <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-6 md:gap-8 items-center pb-6">
              <Skeleton variant="rectangular" className="h-[300px] w-full rounded-xl" />
              <div className="space-y-4 py-2">
                <Skeleton variant="text" className="w-16 h-3" />
                <Skeleton variant="text" className="w-3/4 h-7 rounded-lg" />
                <Skeleton variant="text" className="w-5/6 h-4" />
                <Skeleton variant="text" className="w-2/3 h-4" />
                <div className="h-px w-8 bg-neutral-200/60" />
                <Skeleton variant="text" className="w-40 h-3" />
              </div>
            </div>
          </div>
          {/* Card 2: Small */}
          <div className="lg:col-span-4 md:col-span-12 col-span-12">
            <div className="flex flex-col items-start w-full pb-6 space-y-4">
              <Skeleton variant="rectangular" className="w-full h-[220px] rounded-xl" />
              <Skeleton variant="text" className="w-16 h-3" />
              <Skeleton variant="text" className="w-5/6 h-5 rounded" />
              <Skeleton variant="text" className="w-2/3 h-3" />
              <div className="w-8 h-px bg-neutral-200/60" />
              <Skeleton variant="text" className="w-40 h-3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
