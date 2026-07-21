import React from 'react'
import Card from '../Card'
import Paragraph from '@/components/typography/Paragraph'
import Rating from '@/icons/Success' // fallback success/check icon or rating placeholder

export function TestimonialCard({
  quote,
  author,
  role,
  company,
  rating = 5,
  ...props
}) {
  return (
    <Card padding="8" border={true} className="space-y-6 flex flex-col justify-between" {...props}>
      <div className="space-y-4">
        {rating > 0 && (
          <div className="flex gap-1 text-amber-500">
            {Array.from({ length: rating }).map((_, i) => (
              <span key={i}>★</span>
            ))}
          </div>
        )}
        <Paragraph className="italic text-[#111111]">
          "{quote}"
        </Paragraph>
      </div>
      <div className="border-t border-[#E8E2DA] pt-4">
        <h5 className="font-sans text-sm font-bold text-[#111111]">{author}</h5>
        <p className="font-sans text-xs text-[#7A7A7A] mt-0.5">
          {role} at <span className="font-semibold">{company}</span>
        </p>
      </div>
    </Card>
  )
}

export default TestimonialCard
