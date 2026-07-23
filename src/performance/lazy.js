/**
 * Dynamic Import & Code Splitting Helpers
 * FG Lift Pvt. Ltd.
 */

import React, { lazy, Suspense } from 'react'

export function createLazyComponent(importFn, FallbackComponent = null) {
  const LazyComp = lazy(importFn)

  return function LazyWrapper(props) {
    return (
      <Suspense fallback={FallbackComponent ? <FallbackComponent /> : <div className="animate-pulse bg-gray-100 rounded-xl min-h-[100px]" />}>
        <LazyComp {...props} />
      </Suspense>
    )
  }
}

export default createLazyComponent
