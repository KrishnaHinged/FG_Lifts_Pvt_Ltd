import React from 'react'
import { Inbox, LayoutGrid, Newspaper, EyeOff } from 'lucide-react'
import Card from '@/components/ui/Card'

export function EmptyState({
  title = 'No Entries Located',
  description = 'Try adjusting your sorting parameters or look up different keywords.',
  type = 'default', // default | products | gallery | blog | search
  action,
  className = '',
  ...props
}) {
  const iconMap = {
    default: Inbox,
    products: LayoutGrid,
    gallery: EyeOff,
    blog: Newspaper,
    search: Inbox
  }

  const Icon = iconMap[type] || Inbox

  return (
    <Card 
      className={`flex flex-col items-center justify-center text-center py-16 px-6 max-w-md mx-auto space-y-6 ${className}`}
      {...props}
    >
      <div className="w-16 h-16 rounded-full bg-[#EDE8E2] text-[#111111] flex items-center justify-center">
        <Icon size={28} />
      </div>
      <div className="space-y-2">
        <h3 className="font-sans text-lg font-bold text-[#111111]">{title}</h3>
        <p className="font-sans text-sm text-[#7A7A7A] leading-relaxed">{description}</p>
      </div>
      {action && <div>{action}</div>}
    </Card>
  )
}

export default EmptyState
