import React from 'react'

export function Tag({
  variant = 'default', // default | filter | industry | product | blog | technology | hashtag
  children,
  active = false,
  onClick,
  className = '',
  ...props
}) {
  const baseStyle = "inline-flex items-center justify-center px-4 py-2 font-mono text-[10px] uppercase tracking-wider font-bold rounded-full border transition-all duration-200 select-none cursor-pointer"

  const defaultStyles = active
    ? "bg-[#111111] text-white border-[#111111]"
    : "bg-white text-[#111111]/70 border-[#E8E2DA] hover:border-[#111111] hover:text-[#111111]"

  const variantStyles = {
    default: defaultStyles,
    filter: defaultStyles,
    industry: "bg-[#EDE8E2]/50 text-[#111111]/80 border-transparent hover:bg-[#EDE8E2] hover:text-[#111111]",
    product: "bg-[#E8F0FC]/80 text-[#0E4FB3] border-transparent hover:bg-[#E8F0FC] hover:text-[#0E4FB3]",
    blog: "bg-[#F5F0EB] text-[#525252] border-[#E8E2DA] hover:bg-[#EDE8E2]",
    technology: "bg-neutral-100 text-neutral-800 border-transparent hover:bg-neutral-200",
    hashtag: "bg-transparent text-[#7A7A7A] border-transparent hover:text-[#0E4FB3] px-1 py-0.5"
  }

  return (
    <span 
      onClick={onClick}
      className={`${baseStyle} ${variantStyles[variant] || variantStyles.default} ${className}`} 
      {...props}
    >
      {variant === 'hashtag' && <span className="mr-0.5">#</span>}
      {children}
    </span>
  )
}

export default Tag
