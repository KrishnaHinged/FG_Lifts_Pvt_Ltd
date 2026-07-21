import React from 'react'

export function MediaObject({
  media,
  content,
  mediaAlign = 'top', // top | center | bottom
  gap = '4',
  className = '',
  ...props
}) {
  const alignClasses = {
    top: 'items-start',
    center: 'items-center',
    bottom: 'items-end'
  }

  return (
    <div className={`flex gap-${gap} ${alignClasses[mediaAlign]} ${className}`} {...props}>
      <div className="flex-shrink-0">{media}</div>
      <div className="flex-1 min-w-0">{content}</div>
    </div>
  )
}

export default MediaObject
