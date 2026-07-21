'use client'

import React, { useEffect } from 'react'
import ServerError from '@/components/errors/ServerError'

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('[AppRouter] Route Error Caught:', error)
  }, [error])

  return (
    <ServerError reset={reset} />
  )
}
