import React from 'react'
import PrimaryButton from '@/components/ui/button/PrimaryButton'
import Arrow from '@/icons/Arrow'

export function InlineCTA({
  title = 'Ready to customize?',
  description = 'Configure elevator dimensions, speed options, and luxurious interior models.',
  actionText = 'Open Configurator',
  onClick,
  className = '',
  ...props
}) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-8 bg-white border border-[#E8E2DA] rounded-[32px] shadow-sm ${className}`} {...props}>
      <div className="space-y-1.5 max-w-xl">
        <h4 className="font-sans text-base font-bold text-[#111111]">{title}</h4>
        <p className="font-sans text-xs text-[#7A7A7A] leading-relaxed">{description}</p>
      </div>
      <PrimaryButton icon={Arrow} onClick={onClick} className="flex-shrink-0">
        {actionText}
      </PrimaryButton>
    </div>
  )
}

export default InlineCTA
