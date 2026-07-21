'use client'

import { useLoading } from '@/providers/LoadingProvider'

export function usePageTransition() {
  const { startLoading, stopLoading } = useLoading()

  const transitionTo = (href, callback) => {
    startLoading()
    setTimeout(() => {
      if (callback) callback()
      window.location.href = href
    }, 450)
  }

  return { transitionTo }
}

export default usePageTransition
