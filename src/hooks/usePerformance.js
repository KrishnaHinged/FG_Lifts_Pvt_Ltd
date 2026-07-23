'use client'

import { useEffect } from 'react'
import { markAndMeasure } from '@/performance/metrics'

export function usePerformance(componentName) {
  useEffect(() => {
    if (!componentName) return

    const startMark = `${componentName}_mount_start`
    const endMark = `${componentName}_mount_end`
    const measureName = `${componentName}_render_time`

    markAndMeasure(startMark)

    return () => {
      markAndMeasure(endMark)
      const duration = markAndMeasure(measureName, startMark, endMark)
      if (duration && process.env.NODE_ENV === 'development') {
        console.log(`[Performance] ${componentName} mount duration: ${duration.toFixed(2)}ms`)
      }
    }
  }, [componentName])
}

export default usePerformance
