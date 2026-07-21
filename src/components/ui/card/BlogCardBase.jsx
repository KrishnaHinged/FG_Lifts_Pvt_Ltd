import React from 'react'
import Card from '../Card'
import Image from 'next/image'
import Heading from '@/components/typography/Heading'
import Paragraph from '@/components/typography/Paragraph'
import Caption from '@/components/typography/Caption'

export function BlogCardBase({
  title,
  excerpt,
  imageSrc,
  imageAlt,
  author,
  date,
  onClick,
  ...props
}) {
  return (
    <Card hoverable={true} padding="6" onClick={onClick} {...props}>
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl mb-6">
        {imageSrc && (
          <Image
            src={imageSrc}
            alt={imageAlt || title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        )}
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          {author && <span className="text-xs font-semibold text-[#111111]">{author}</span>}
          {author && date && <span className="text-xs text-[#7A7A7A]">•</span>}
          {date && <Caption>{date}</Caption>}
        </div>
        <Heading level="3" className="text-[#111111] line-clamp-2">
          {title}
        </Heading>
        <Paragraph className="text-sm line-clamp-3">
          {excerpt}
        </Paragraph>
      </div>
    </Card>
  )
}

export default BlogCardBase
