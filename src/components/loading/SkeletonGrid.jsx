'use client'

import React from 'react'
import SkeletonCard from './SkeletonCard'

export function SkeletonGrid({ count = 6, cols = '3', className = '' }) {
  const colClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }

  return (
    <div className={`grid ${colClasses[cols] || colClasses[3]} gap-6 lg:gap-10 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}

export default SkeletonGrid
