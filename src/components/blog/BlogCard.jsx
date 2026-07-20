'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function BlogCard({ post, isWide = false }) {
  if (!post) return null

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : ''

  const authorName = post.author?.name || (typeof post.author === 'string' ? post.author : 'FG Lift Editor')
  const readTime = post.readTime || 5

  if (isWide) {
    return (
      <article className="group grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-6 md:gap-8 items-center text-left pb-6">
        {/* Left - Image */}
        <Link
          href={`/blog/${post.slug}`}
          className="relative block h-[260px] md:h-[300px] w-full overflow-hidden bg-[#EDE8E2] cursor-pointer"
        >
          <Image
            src={post.coverImage || '/images/projects-collage.png'}
            alt={post.coverImageAlt || post.title}
            fill
            className="object-cover group-hover:scale-[1.03]"
            style={{
              transition: 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)'
            }}
            sizes="(max-w-1024px) 100vw, 550px"
          />
          <div className="absolute inset-0 bg-[#111111]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Link>

        {/* Right - Content info */}
        <div className="flex flex-col items-start pt-2 md:pt-0">
          <span className="font-mono text-[10px] text-[#9A9A9A] tracking-[0.15em] uppercase">
            {post.category}
          </span>
          
          <Link href={`/blog/${post.slug}`} className="no-underline">
            <h3 className="m-0 font-display text-2xl lg:text-3xl text-[#111111] font-normal mt-2 leading-snug hover:text-[#0E4FB3] transition-colors duration-200">
              {post.title}
            </h3>
          </Link>

          <p className="font-sans text-base text-[#6B6B6B] leading-relaxed mt-4 mb-0 line-clamp-3">
            {post.excerpt}
          </p>

          <div className="w-8 h-px bg-[#E8E2DA] mt-4 flex-shrink-0" />

          {/* Meta */}
          <span className="font-mono text-[10px] text-[#9A9A9A] mt-3 uppercase tracking-wider font-semibold block">
            {authorName} &middot; {formattedDate} &middot; {readTime} min read
          </span>
        </div>
      </article>
    )
  }

  // Standard blog card
  return (
    <article className="group flex flex-col items-start w-full text-left pb-6">
      {/* Image Area */}
      <Link
        href={`/blog/${post.slug}`}
        className="relative block w-full h-[220px] overflow-hidden bg-[#EDE8E2] cursor-pointer"
      >
        <Image
          src={post.coverImage || '/images/projects-collage.png'}
          alt={post.coverImageAlt || post.title}
          fill
          className="object-cover group-hover:scale-[1.03]"
          style={{
            transition: 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)'
          }}
          sizes="(max-w-768px) 100vw, 360px"
        />
        <div className="absolute inset-0 bg-[#111111]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Link>

      {/* Content below image */}
      <div className="pt-5 flex flex-col items-start w-full">
        <span className="font-mono text-[10px] text-[#9A9A9A] tracking-[0.15em] uppercase">
          {post.category}
        </span>
        
        <Link href={`/blog/${post.slug}`} className="no-underline">
          <h3 className="m-0 font-display text-xl text-[#111111] font-normal mt-2 leading-snug line-clamp-2 hover:text-[#0E4FB3] transition-colors duration-200">
            {post.title}
          </h3>
        </Link>

        <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed mt-3 mb-0 line-clamp-2">
          {post.excerpt}
        </p>

        <div className="w-8 h-px bg-[#E8E2DA] mt-4 flex-shrink-0" />

        {/* Meta */}
        <span className="font-mono text-[10px] text-[#9A9A9A] mt-3 uppercase tracking-wider font-semibold block">
          {authorName} &middot; {formattedDate} &middot; {readTime} min
        </span>
      </div>
    </article>
  )
}
