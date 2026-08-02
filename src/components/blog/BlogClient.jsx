'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import BlogHero from './BlogHero'
import BlogGrid from './BlogGrid'
import NewsletterInline from '@/components/newsletter/NewsletterInline'

const categories = ['All', 'Industry News', 'Technical Guide', 'Project Spotlight', 'Product Launch', 'Maintenance Tips']

export default function BlogClient({ initialPosts = [], featuredPost = null }) {
  const [posts, setPosts] = useState(initialPosts)
  const [activeCategory, setActiveCategory] = useState('All')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (activeCategory === 'All') {
      setTimeout(() => {
        setPosts(initialPosts)
      }, 0)
      return
    }

    setTimeout(() => {
      setLoading(true)
      fetch(`/api/blog?category=${encodeURIComponent(activeCategory)}`)
        .then(res => res.json())
        .then(data => {
          setPosts(data.posts || [])
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }, 0)
  }, [activeCategory, initialPosts])

  const serializedPosts = posts.map(p => ({
    ...p,
    _id: p._id?.toString() || p._id,
  }))

  const serializedFeatured = featuredPost
    ? { ...featuredPost, _id: featuredPost._id?.toString() || featuredPost._id }
    : null

  // Date formatting helper
  const formatDate = (dateString) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <>
      <BlogHero />

      {/* Section 2 — Featured Article (Full-width, cream bg, only on 'All' category) */}
      {activeCategory === 'All' && serializedFeatured && (
        <section className="bg-[#F5F0EB] pt-0 pb-16 px-6 lg:px-24">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-0 items-stretch border border-[#E8E2DA] overflow-hidden">
              
              {/* LEFT — Full-bleed image */}
              <Link 
                href={`/blog/${serializedFeatured.slug}`}
                className="relative h-[360px] lg:h-[580px] w-full block overflow-hidden group cursor-pointer bg-[#111111]"
              >
                <Image
                  src={serializedFeatured.coverImage || '/images/projects-collage.png'}
                  alt={serializedFeatured.coverImageAlt || serializedFeatured.title}
                  fill
                  className="object-cover"
                  style={{
                    transition: 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)'
                  }}
                  sizes="(max-w-1024px) 100vw, 750px"
                />
                <div className="absolute inset-0 bg-[#111111]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>

              {/* RIGHT — Article Details */}
              <div className="bg-white p-10 sm:p-12 lg:p-16 flex flex-col justify-center h-full items-start text-left">
                <div className="flex items-center gap-4 flex-shrink-0">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[#0E4FB3] uppercase font-bold">
                    Featured
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E8E2DA]" />
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[#9A9A9A] uppercase">
                    {serializedFeatured.category}
                  </span>
                </div>

                <Link href={`/blog/${serializedFeatured.slug}`} className="no-underline">
                  <h2 className="m-0 font-display text-2xl lg:text-4xl text-[#111111] leading-snug mt-5 font-normal hover:text-[#0E4FB3] transition-colors duration-200">
                    {serializedFeatured.title}
                  </h2>
                </Link>

                <p className="font-sans text-base text-[#6B6B6B] leading-relaxed mt-4 mb-0 line-clamp-3">
                  {serializedFeatured.excerpt}
                </p>

                {/* Thin Rule */}
                <div className="w-full h-px bg-[#E8E2DA] my-8 flex-shrink-0" />

                {/* Meta Rows */}
                <div className="flex flex-wrap items-center gap-3.5 font-mono text-[11px] text-[#9A9A9A] uppercase font-semibold flex-shrink-0">
                  <span className="font-sans text-sm text-[#111111] font-medium leading-none">
                    {serializedFeatured.author?.name || (typeof serializedFeatured.author === 'string' ? serializedFeatured.author : 'FG Lift Editor')}
                  </span>
                  <div className="w-1 h-1 rounded-full bg-[#E8E2DA]" />
                  <span>
                    {formatDate(serializedFeatured.publishedAt)}
                  </span>
                  <div className="w-1 h-1 rounded-full bg-[#E8E2DA]" />
                  <span>
                    {serializedFeatured.readTime || 5} min read
                  </span>
                </div>

                {/* CTA Link */}
                <div className="mt-8">
                  <Link
                    href={`/blog/${serializedFeatured.slug}`}
                    className="group inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-[#111111] no-underline hover:underline hover:text-[#0E4FB3] transition-colors cursor-pointer"
                  >
                    Read Article
                    <span className="group-hover:translate-x-1.5 transition-transform duration-300">
                      &rarr;
                    </span>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* Main Blog List Area */}
      <section className="bg-[#F5F0EB] py-16 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          
          {/* Section 3 — Category Navigation */}
          <div className="flex flex-wrap items-center justify-center mb-10 gap-y-2 select-none">
            {categories.map((cat, idx) => {
              const isCatActive = activeCategory === cat
              return (
                <div key={cat} className="flex items-center">
                  <button
                    onClick={() => setActiveCategory(cat)}
                    className={`font-mono text-[11px] tracking-[0.1em] uppercase cursor-pointer bg-transparent border-none outline-none transition-colors duration-200 ${
                      isCatActive ? 'text-[#111111] font-semibold' : 'text-[#9A9A9A] hover:text-[#111111]'
                    }`}
                  >
                    {cat}
                  </button>
                  {idx < categories.length - 1 && (
                    <span className="mx-3.5 text-[#E8E2DA] text-[11px] leading-none select-none">&middot;</span>
                  )}
                </div>
              )
            })}
          </div>

          {/* Full-width Rule */}
          <div className="w-full h-px bg-[#E8E2DA] mb-12" />

          {/* Blog Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
            >
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
                  {/* Card 1: Wide */}
                  <div className="lg:col-span-8 md:col-span-12 col-span-12">
                    <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-6 md:gap-8 items-center pb-6 animate-pulse">
                      <div className="h-[300px] w-full bg-neutral-200/60 rounded-xl" />
                      <div className="space-y-4 py-2">
                        <div className="h-3 w-16 bg-neutral-200/60 rounded" />
                        <div className="h-7 w-3/4 bg-neutral-200/60 rounded" />
                        <div className="h-4 w-5/6 bg-neutral-200/60 rounded" />
                        <div className="h-4 w-2/3 bg-neutral-200/60 rounded" />
                        <div className="h-px w-8 bg-neutral-200/60" />
                        <div className="h-3 w-40 bg-neutral-200/60 rounded" />
                      </div>
                    </div>
                  </div>
                  {/* Card 2: Small */}
                  <div className="lg:col-span-4 md:col-span-12 col-span-12">
                    <div className="flex flex-col items-start w-full pb-6 animate-pulse space-y-4">
                      <div className="w-full h-[220px] bg-neutral-200/60 rounded-xl" />
                      <div className="w-16 h-3 bg-neutral-200/60 rounded" />
                      <div className="w-5/6 h-5 bg-neutral-200/60 rounded" />
                      <div className="w-2/3 h-3 bg-neutral-200/60 rounded" />
                      <div className="w-8 h-px bg-neutral-200/60" />
                      <div className="w-40 h-3 bg-neutral-200/60 rounded" />
                    </div>
                  </div>
                  {/* Card 3: Small */}
                  <div className="lg:col-span-4 md:col-span-6 col-span-12">
                    <div className="flex flex-col items-start w-full pb-6 animate-pulse space-y-4">
                      <div className="w-full h-[220px] bg-neutral-200/60 rounded-xl" />
                      <div className="w-16 h-3 bg-neutral-200/60 rounded" />
                      <div className="w-5/6 h-5 bg-neutral-200/60 rounded" />
                      <div className="w-2/3 h-3 bg-neutral-200/60 rounded" />
                      <div className="w-8 h-px bg-neutral-200/60" />
                      <div className="w-40 h-3 bg-neutral-200/60 rounded" />
                    </div>
                  </div>
                  {/* Card 4: Small */}
                  <div className="lg:col-span-4 md:col-span-6 col-span-12">
                    <div className="flex flex-col items-start w-full pb-6 animate-pulse space-y-4">
                      <div className="w-full h-[220px] bg-neutral-200/60 rounded-xl" />
                      <div className="w-16 h-3 bg-neutral-200/60 rounded" />
                      <div className="w-5/6 h-5 bg-neutral-200/60 rounded" />
                      <div className="w-2/3 h-3 bg-neutral-200/60 rounded" />
                      <div className="w-8 h-px bg-neutral-200/60" />
                      <div className="w-40 h-3 bg-neutral-200/60 rounded" />
                    </div>
                  </div>
                </div>
              ) : (
                <BlogGrid
                  posts={serializedPosts}
                  featuredPost={activeCategory === 'All' ? serializedFeatured : null}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Newsletter inline */}
          <div className="mt-24">
            <NewsletterInline />
          </div>
        </div>
      </section>
    </>
  )
}
