'use client'

import React from 'react'
import Spinner from '@/components/ui/Spinner'

export function ViewerLoader({ className = '' }) {
  return (
    <div className={`absolute inset-0 bg-[#111111]/90 flex flex-col items-center justify-center space-y-4 text-center z-20 ${className}`}>
      <Spinner size="lg" color="primary" />
      <div className="space-y-1.5">
        <h4 className="font-display text-[#F5F0EB] text-lg font-medium">360° Cabin Configurator</h4>
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#7A7A7A]">Rendering 3D textures...</p>
      </div>
    </div>
  )
}

export default ViewerLoader
