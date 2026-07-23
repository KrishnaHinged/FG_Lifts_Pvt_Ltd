'use client'

import { useRouter } from 'next/navigation'
import { prefetchRoute, prefetchImage } from '@/performance/prefetch'

export function usePrefetch() {
  const router = useRouter()

  const prefetchOnHover = (href) => {
    return {
      onMouseEnter: () => prefetchRoute(router, href),
      onTouchStart: () => prefetchRoute(router, href)
    }
  }

  return {
    prefetchRoute: (href) => prefetchRoute(router, href),
    prefetchImage,
    prefetchOnHover
  }
}

export default usePrefetch
