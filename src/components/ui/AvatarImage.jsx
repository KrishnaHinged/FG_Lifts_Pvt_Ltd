import React from 'react'
import Image from 'next/image'

export function AvatarImage({
  src,
  alt = 'User avatar',
  size = 'md', // sm | md | lg
  className = '',
  ...props
}) {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  return (
    <div className={`relative overflow-hidden rounded-full flex-shrink-0 border border-[#E8E2DA] ${sizeMap[size] || sizeMap.md} ${className}`} {...props}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
      ) : (
        <div className="w-full h-full bg-[#EDE8E2] flex items-center justify-center font-mono text-xs text-[#111111] font-bold">
          {alt.substring(0, 2).toUpperCase()}
        </div>
      )}
    </div>
  )
}

export default AvatarImage
