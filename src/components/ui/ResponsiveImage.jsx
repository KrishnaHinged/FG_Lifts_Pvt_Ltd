import React from 'react'
import Image from 'next/image'

export function ResponsiveImage({
  src,
  alt = 'FG Lifts Pvt. Ltd. Image asset',
  aspectRatio = 'aspect-[16/10]', // aspect-video, aspect-square, etc.
  className = '',
  priority = false,
  ...props
}) {
  return (
    <div className={`relative overflow-hidden w-full ${aspectRatio} ${className}`} {...props}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={priority}
        className="object-cover transition-transform duration-500 hover:scale-[1.03]"
      />
    </div>
  )
}

export default ResponsiveImage
