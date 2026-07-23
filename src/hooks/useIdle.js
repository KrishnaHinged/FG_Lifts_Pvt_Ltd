'use client'

import { useState, useEffect } from 'react'

export function useIdle(timeout = 60000) {
  const [isIdle, setIsIdle] = useState(false)

  useEffect(() => {
    let timer

    const handleActivity = () => {
      setIsIdle(false)
      clearTimeout(timer)
      timer = setTimeout(() => setIsIdle(true), timeout)
    }

    const events = ['mousemove', 'keydown', 'wheel', 'touchstart', 'scroll']
    events.forEach(event => window.addEventListener(event, handleActivity))

    timer = setTimeout(() => setIsIdle(true), timeout)

    return () => {
      clearTimeout(timer)
      events.forEach(event => window.removeEventListener(event, handleActivity))
    }
  }, [timeout])

  return isIdle
}

export default useIdle
