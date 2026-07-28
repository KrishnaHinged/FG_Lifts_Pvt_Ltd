import React from 'react'
import Skeleton from '@/components/loading/Skeleton'
import SkeletonImage from '@/components/loading/SkeletonImage'
import SkeletonText from '@/components/loading/SkeletonText'

export default function BlogPostDetailLoading() {
  return (
    <div className="min-h-screen bg-fg-cream select-none">
      {/* Dark Header Skeleton */}
      <section className="relative bg-fg-dark overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="relative max-w-[900px] mx-auto px-6 lg:px-8 space-y-6">
          {/* Breadcrumb Skeleton */}
          <div className="flex items-center gap-2">
            <Skeleton variant="text" className="w-12 h-3 bg-white/10" />
            <span className="text-white/20">/</span>
            <Skeleton variant="text" className="w-12 h-3 bg-white/10" />
            <span className="text-white/20">/</span>
            <Skeleton variant="text" className="w-20 h-3 bg-white/10" />
          </div>

          {/* Category + Date Skeleton */}
          <div className="flex items-center gap-4">
            <Skeleton variant="text" className="w-24 h-4 bg-white/10" />
            <Skeleton variant="text" className="w-32 h-4 bg-white/10" />
          </div>

          {/* Title Skeleton */}
          <Skeleton variant="text" className="w-full h-12 bg-white/10 rounded-xl" />

          {/* Author Skeleton */}
          <div className="flex items-center gap-3">
            <Skeleton variant="circular" className="h-10 w-10 bg-white/10" />
            <div className="space-y-2">
              <Skeleton variant="text" className="w-32 h-4 bg-white/10" />
              <Skeleton variant="text" className="w-20 h-3 bg-white/10" />
            </div>
          </div>
        </div>
      </section>

      {/* Cover Image Skeleton */}
      <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8 -mt-6 mb-12">
        <div className="relative aspect-[21/9] rounded-2xl overflow-hidden">
          <SkeletonImage className="h-full w-full" />
        </div>
      </div>

      {/* Content + Sidebar Grid Skeleton */}
      <section className="py-12 lg:py-16">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Main Content Skeleton */}
            <div className="lg:col-span-8 space-y-6">
              <SkeletonText lines={12} />
            </div>

            {/* Sidebar Skeleton */}
            <div className="lg:col-span-4 space-y-6">
              <Skeleton variant="rectangular" className="w-full h-64 rounded-2xl animate-pulse" />
              <Skeleton variant="rectangular" className="w-full h-48 rounded-2xl animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
