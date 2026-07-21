import React from 'react'

export function Badge({
  variant = 'neutral', // neutral | primary | success | warning | danger | status | feature | category | product | new | featured | verified
  children,
  className = '',
  ...props
}) {
  const baseStyle = "inline-flex items-center px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider rounded-full border select-none"

  const variantStyles = {
    neutral: "bg-[#EDE8E2] text-[#111111] border-[#E8E2DA]",
    primary: "bg-[#0E4FB3]/10 text-[#0E4FB3] border-[#0E4FB3]/20",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    danger: "bg-red-50 text-red-700 border-red-200",
    // Semantic mappings
    status: "bg-blue-50 text-blue-700 border-blue-200",
    feature: "bg-[#E8F0FC] text-[#0E4FB3] border-[#0E4FB3]/20",
    category: "bg-purple-50 text-purple-700 border-purple-200",
    product: "bg-stone-100 text-stone-800 border-stone-300",
    new: "bg-[#0E4FB3] text-white border-transparent",
    featured: "bg-amber-500 text-white border-transparent",
    verified: "bg-emerald-600 text-white border-transparent"
  }

  return (
    <span className={`${baseStyle} ${variantStyles[variant] || variantStyles.neutral} ${className}`} {...props}>
      {children}
    </span>
  )
}

export default Badge
