import React from 'react'
import PrimaryButton from '@/components/ui/button/PrimaryButton'
import Arrow from '@/icons/Arrow'

export function BannerCTA({
  title = 'Elevate Your Property With Engineering Distinction',
  description = 'Schedule a personal callback with our principal architects and engineering consulting teams.',
  actionText = 'Inquire Details',
  onClick,
  className = '',
  ...props
}) {
  return (
    <div className={`w-full bg-[#111111] text-[#F5F0EB] p-8 md:p-12 rounded-[32px] md:rounded-[40px] flex flex-col md:flex-row md:items-center justify-between gap-8 relative overflow-hidden ${className}`} {...props}>
      {/* Background radial highlight */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#0E4FB3]/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="space-y-3 max-w-2xl relative z-10">
        <h3 className="font-display text-2xl sm:text-3xl font-light leading-snug">
          {title}
        </h3>
        <p className="font-sans text-sm text-white/60 leading-relaxed">
          {description}
        </p>
      </div>
      <PrimaryButton icon={Arrow} onClick={onClick} className="flex-shrink-0 relative z-10 self-start md:self-auto">
        {actionText}
      </PrimaryButton>
    </div>
  )
}

export default BannerCTA
