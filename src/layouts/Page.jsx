'use client'

import React from 'react'

export function Page({
  children,
  className = '',
  ...props
}) {
  return (
    <div 
      className={`relative w-full min-h-screen flex flex-col justify-between ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default Page
