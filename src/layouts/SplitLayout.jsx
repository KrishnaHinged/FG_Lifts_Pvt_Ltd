'use client'

import React from 'react'
import Grid from './Grid'

export function SplitLayout({
  left,
  right,
  ratio = '1-1', // 1-1 | 2-1 | 1-2 | 3-1
  className = '',
  gap = 'default',
  ...props
}) {
  const ratioClasses = {
    '1-1': 'grid-cols-1 lg:grid-cols-2',
    '2-1': 'grid-cols-1 lg:grid-cols-3 [&>*:first-child]:lg:col-span-2',
    '1-2': 'grid-cols-1 lg:grid-cols-3 [&>*:last-child]:lg:col-span-2',
    '3-1': 'grid-cols-1 lg:grid-cols-4 [&>*:first-child]:lg:col-span-3'
  }

  const gapClasses = {
    default: 'gap-6 lg:gap-12',
    compact: 'gap-4',
    wide: 'gap-8 lg:gap-20',
    none: 'gap-0'
  }

  return (
    <div className={`grid ${ratioClasses[ratio]} ${gapClasses[gap]} ${className}`} {...props}>
      <div>{left}</div>
      <div>{right}</div>
    </div>
  )
}

export default SplitLayout
