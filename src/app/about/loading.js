import React from 'react'
import Skeleton from '@/components/loading/Skeleton'

export default function AboutLoading() {
  return (
    <div className="relative w-full min-h-screen bg-white flex items-center justify-center overflow-hidden">
      {/* Background blobs skeleton */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -left-[10%] top-[10%] w-[500px] h-[500px] rounded-full bg-[#d4e157]/10 blur-[80px]" />
        <div className="absolute -right-[8%] bottom-[5%] w-[450px] h-[450px] rounded-full bg-[#ce93d8]/10 blur-[80px]" />
      </div>

      <div className="w-full max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col justify-center items-center text-center relative z-10">
        {/* Giant header skeletons matching clamp sizes */}
        <div className="space-y-4 w-full flex flex-col items-center">
          <Skeleton variant="text" className="h-10 sm:h-16 lg:h-20 w-4/5 rounded-2xl" />
          <div className="flex items-center gap-4 w-full justify-center">
            <Skeleton variant="text" className="h-10 sm:h-16 lg:h-20 w-1/4 rounded-2xl" />
            <Skeleton variant="rectangular" className="w-[120px] sm:w-[180px] lg:w-[220px] h-8 sm:h-12 lg:h-16 rounded-full" />
            <Skeleton variant="text" className="h-10 sm:h-16 lg:h-20 w-1/4 rounded-2xl" />
          </div>
          <Skeleton variant="text" className="h-10 sm:h-16 lg:h-20 w-3/5 rounded-2xl" />
        </div>
      </div>
    </div>
  )
}
