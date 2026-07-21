'use client'

import React, { useEffect } from 'react'
import ServerError from '@/components/errors/ServerError'

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error('[AppRouter] Global Error Caught:', error)
  }, [error])

  return (
    <html lang="en">
      <body className="bg-[#F5F0EB]">
        <ServerError reset={reset} />
      </body>
    </html>
  )
}
