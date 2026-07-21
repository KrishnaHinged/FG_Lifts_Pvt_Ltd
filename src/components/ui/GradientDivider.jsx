import React from 'react'

export function GradientDivider({
  gradient = 'from-[#EDE8E2] via-[#E8E2DA] to-[#EDE8E2]',
  className = '',
  ...props
}) {
  return (
    <div className={`h-[1px] w-full bg-gradient-to-r ${gradient} my-8 ${className}`} {...props} />
  )
}

export default GradientDivider
