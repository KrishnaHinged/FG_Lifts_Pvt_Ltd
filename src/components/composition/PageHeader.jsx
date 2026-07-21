import React from 'react'

export function PageHeader({
  title,
  subtitle,
  description,
  actions,
  align = 'left', // left | center
  className = '',
  ...props
}) {
  const alignClasses = align === 'center' ? 'text-center items-center' : 'text-left items-start'

  return (
    <header className={`w-full flex flex-col space-y-4 ${alignClasses} ${className}`} {...props}>
      <div className="space-y-2 max-w-3xl">
        <h1 className="font-display text-4xl sm:text-5xl font-light text-[#111111] leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="font-mono text-xs uppercase tracking-widest text-[#0E4FB3] font-bold">
            {subtitle}
          </p>
        )}
      </div>
      {description && (
        <p className="font-sans text-base text-[#525252] max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
      {actions && (
        <div className="pt-2 flex flex-wrap gap-4">
          {actions}
        </div>
      )}
    </header>
  )
}

export default PageHeader
