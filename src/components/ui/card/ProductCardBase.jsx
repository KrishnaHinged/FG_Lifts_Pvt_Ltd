import React from 'react'
import Card from '../Card'
import Image from 'next/image'
import Heading from '@/components/typography/Heading'
import Paragraph from '@/components/typography/Paragraph'
import Badge from '@/components/ui/Badge'
import CTAButton from '@/components/ui/button/CTAButton'

export function ProductCardBase({
  title,
  description,
  imageSrc,
  imageAlt,
  category,
  badge,
  onClick,
  actionText = 'Explore Specs',
  ...props
}) {
  return (
    <Card hoverable={true} padding="6" onClick={onClick} {...props}>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl mb-6">
        {imageSrc && (
          <Image
            src={imageSrc}
            alt={imageAlt || title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        )}
        {badge && (
          <div className="absolute top-4 left-4 z-10">
            <Badge variant="new">{badge}</Badge>
          </div>
        )}
      </div>
      <div className="space-y-4">
        {category && (
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#0E4FB3] font-bold">
            {category}
          </span>
        )}
        <Heading level="3" className="text-[#111111]">
          {title}
        </Heading>
        <Paragraph className="text-sm line-clamp-3">
          {description}
        </Paragraph>
        {onClick && (
          <div className="pt-2">
            <CTAButton size="sm" onClick={onClick}>
              {actionText}
            </CTAButton>
          </div>
        )}
      </div>
    </Card>
  )
}

export default ProductCardBase
