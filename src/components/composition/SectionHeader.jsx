import React from 'react'

export function SectionHeader({
  title,
  eyebrow,
  description,
  align = 'left', // left | center
  className = '',
  light = false,
  ...props
}) {
  const alignClasses = align === 'center' ? 'text-center items-center mx-auto' : 'text-left items-start'

  return (
    <div className={`flex flex-col space-y-4 max-w-3xl mb-12 lg:mb-16 ${alignClasses} ${className}`} {...props}>
      {eyebrow && (
        <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#0E4FB3] font-bold">
          {eyebrow}
        </span>
      )}
      <h2 className={`font-display text-3xl sm:text-4xl lg:text-5xl font-light leading-tight ${light ? 'text-[#F5F0EB]' : 'text-[#111111]'}`}>
        {title}
      </h2>
      {description && (
        <p className={`font-sans text-sm sm:text-base leading-relaxed ${light ? 'text-white/60' : 'text-[#525252]'}`}>
          {description}
        </p>
      )}
    </div>
  )
}

export default SectionHeader
