'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Clock, ArrowLeft, Share2, Eye } from 'lucide-react'
import { fadeUp, slideLeft, slideRight } from '@/lib/motion'
import BlogSidebar from './BlogSidebar'
import NewsletterInline from '@/components/newsletter/NewsletterInline'

export default function BlogDetail({ post, relatedPosts = [] }) {
  if (!post) return null

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-IN', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : ''

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <>
      {/* Dark Header */}
      <section className="relative bg-fg-dark overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="absolute inset-0 bg-gradient-to-b from-fg-dark via-fg-dark/95 to-fg-dark-2 pointer-events-none" />
        <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />

        <div className="relative max-w-[900px] mx-auto px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.div {...fadeUp} className="flex items-center gap-2 font-mono text-[10px] text-fg-cream/40 tracking-widest uppercase mb-8">
            <Link href="/" className="hover:text-fg-cream/70 transition-colors no-underline text-fg-cream/40">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-fg-cream/70 transition-colors no-underline text-fg-cream/40">Blog</Link>
            <span>/</span>
            <span className="text-fg-cream/60">{post.category}</span>
          </motion.div>

          {/* Category + Date */}
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="flex items-center gap-4 mb-6">
            <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-fg-blue font-bold">
              {post.category}
            </span>
            <span className="font-mono text-[11px] text-fg-cream/40">{formattedDate}</span>
            <span className="flex items-center gap-1 font-mono text-[11px] text-fg-cream/40">
              <Clock className="w-3 h-3" />
              {post.readTime || 5} min read
            </span>
            <span className="flex items-center gap-1 font-mono text-[11px] text-fg-cream/40">
              <Eye className="w-3.5 h-3.5" />
              {post.views?.toLocaleString() || 0} views
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            className="font-display text-fg-cream text-3xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-tight mb-8"
          >
            {post.title}
          </motion.h1>

          {/* Author + Share */}
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.3 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-fg-blue/20 flex items-center justify-center">
                <span className="font-display text-sm text-fg-blue">
                  {post.author?.name?.charAt(0) || 'F'}
                </span>
              </div>
              <div>
                <p className="text-fg-cream text-sm font-medium">{post.author?.name || 'FG Lift Editorial Team'}</p>
                <p className="font-mono text-[10px] text-fg-cream/40 tracking-wider">{post.author?.title || 'Content Team'}</p>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-fg-cream/60 hover:text-fg-cream hover:bg-white/10 transition-all duration-200 cursor-pointer font-mono text-[11px] tracking-wider"
            >
              <Share2 className="w-3.5 h-3.5" />
              Share
            </button>
          </motion.div>
        </div>
      </section>

      {/* Cover Image */}
      {post.coverImage && (
        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8 -mt-6 mb-12">
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.4 }}
            className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-lg"
          >
            <Image
              src={post.coverImage}
              alt={post.coverImageAlt || post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </motion.div>
        </div>
      )}

      {/* Content + Sidebar */}
      <section className="bg-fg-cream py-12 lg:py-16">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Main Content */}
            <motion.div
              {...slideLeft}
              className="lg:col-span-8"
            >
              <div
                className="prose-fg"
                dangerouslySetInnerHTML={{ __html: post.content || '' }}
              />

              {/* Tags */}
              {post.tags?.length > 0 && (
                <div className="mt-12 pt-8 border-t border-fg-border">
                  <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-fg-muted font-bold mb-3 block">
                    Tags
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[11px] text-fg-body bg-fg-cream-alt px-3 py-1.5 rounded-full border border-fg-border"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Back to blog */}
              <div className="mt-12">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 font-mono text-[11px] tracking-wider uppercase text-fg-blue font-bold no-underline hover:gap-3 transition-all duration-300"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back to all posts
                </Link>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.aside
              {...slideRight}
              className="lg:col-span-4"
            >
              <BlogSidebar post={post} />
            </motion.aside>

          </div>
        </div>
      </section>
    </>
  )
}
