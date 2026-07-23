'use client'

import { useState, useEffect } from 'react'

export function useImageLoader(src) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!src) return

    const img = new Image()
    img.src = src

    img.onload = () => {
      setLoaded(true)
      setError(false)
    }

    img.onerror = () => {
      setLoaded(false)
      setError(true)
    }

    return () => {
      img.onload = null
      img.onerror = null
    }
  }, [src])

  return { loaded, error }
}

export default useImageLoader
