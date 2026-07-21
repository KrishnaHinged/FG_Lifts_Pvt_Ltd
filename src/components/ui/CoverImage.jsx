import React from 'react'
import ResponsiveImage from './ResponsiveImage'

export function CoverImage({ src, alt, className = '', ...props }) {
  return (
    <ResponsiveImage
      src={src}
      alt={alt}
      aspectRatio="aspect-[21/9]"
      className={`rounded-[32px] md:rounded-[40px] shadow-sm ${className}`}
      {...props}
    />
  )
}

export default CoverImage
