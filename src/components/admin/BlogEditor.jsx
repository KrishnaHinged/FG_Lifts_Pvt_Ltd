'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { Calendar, Tag, BookOpen, Clock, Loader2, Save } from 'lucide-react'
import { hasPermission } from '@/permissions/permissions'
import { PERMISSIONS } from '@/permissions/roles'

// Dynamically import MDEditor to prevent SSR window issues
const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
)

export default function BlogEditor({ post = null, currentAdmin, onSubmit, isLoading = false }) {
  const [title, setTitle] = useState(post?.title || '')
  const [slug, setSlug] = useState(post?.slug || '')
  const [excerpt, setExcerpt] = useState(post?.excerpt || '')
  const [content, setContent] = useState(post?.content || '')
  const [category, setCategory] = useState(post?.category || 'Insights')
  
  // Author subfields
  const [authorName, setAuthorName] = useState(post?.author?.name || 'FG Lift Editorial Team')
  const [authorAvatar, setAuthorAvatar] = useState(post?.author?.avatar || '/images/partners/logo-placeholder.png')
  const [authorTitle, setAuthorTitle] = useState(post?.author?.title || 'Editorial Team')

  // Cover image settings
  const [coverImage, setCoverImage] = useState(post?.coverImage || '')
  const [coverImageAlt, setCoverImageAlt] = useState(post?.coverImageAlt || '')
  const [isFeatured, setIsFeatured] = useState(!!post?.isFeatured)
  
  const [tags, setTags] = useState(post?.tags || [])
  const [tagInput, setTagInput] = useState('')

  // Word count and read time preview
  const [wordCount, setWordCount] = useState(0)
  const [readTime, setReadTime] = useState(1)

  useEffect(() => {
    // Strip markdown formatting simple estimate
    const cleanText = content.replace(/[#*`_\[\]]/g, '')
    const words = cleanText.trim() ? cleanText.trim().split(/\s+/).length : 0
    setWordCount(words)
    setReadTime(Math.max(1, Math.ceil(words / 200)))
  }, [content])

  const handleTitleChange = (val) => {
    setTitle(val)
    if (!post) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''))
    }
  }

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const val = tagInput.trim()
      if (val && !tags.includes(val)) {
        setTags([...tags, val])
        setTagInput('')
      }
    }
  }

  const removeTag = (idx) => setTags(tags.filter((_, i) => i !== idx))

  const handleFormSubmit = (e, isPublishedVal) => {
    e.preventDefault()

    const payload = {
      title,
      slug: slug.toLowerCase(),
      excerpt,
      content, // Content MD text
      category,
      coverImage,
      coverImageAlt,
      isFeatured,
      tags,
      author: {
        name: authorName,
        avatar: authorAvatar,
        title: authorTitle
      },
      isPublished: isPublishedVal
    }

    onSubmit(payload)
  }

  const canPublish = hasPermission(currentAdmin, PERMISSIONS.PUBLISH_BLOG)

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6">
        
        {/* Left Column - Main Content editor */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
            
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">Article Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. 5 Elevating Trends Shaping High Rise Buildings in 2025"
                required
                className="px-3.5 py-3 rounded-xl border border-gray-200 bg-white font-sans text-base font-semibold text-gray-900 outline-none focus:border-fg-blue w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">Slug URL identifier</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="e.g. elevating-trends-high-rise-2025"
                  required
                  className="px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white font-sans text-xs text-gray-900 outline-none focus:border-fg-blue w-full"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white font-sans text-xs outline-none focus:border-fg-blue w-full"
                >
                  {['Guides', 'Case Studies', 'Insights', 'Announcements'].map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">Excerpt Summary</label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief summary card teaser shown in lists..."
                rows={2}
                className="px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white font-sans text-xs text-gray-900 outline-none focus:border-fg-blue w-full resize-none"
              />
            </div>

            {/* Markdown editor */}
            <div className="flex flex-col gap-1.5 select-text" data-color-mode="light">
              <label className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold select-none">Article Content body</label>
              <div className="border border-gray-200 rounded-xl overflow-hidden min-h-[350px]">
                <MDEditor
                  value={content}
                  onChange={setContent}
                  height={320}
                  preview="edit"
                  className="font-sans text-sm"
                />
              </div>
              <div className="flex justify-between items-center text-xs text-gray-400 mt-2 font-mono select-none">
                <span>{wordCount} words logged</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  Estimated: {readTime} min read
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column - Configurations sidebar */}
        <div className="space-y-6">
          
          {/* Metadata Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
            <h3 className="font-sans font-bold text-xs uppercase tracking-wider text-gray-700 border-b border-gray-100 pb-2">
              Article Meta Settings
            </h3>

            {/* Cover photo URL */}
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">Cover Photo URL</label>
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="e.g. /images/blog/atrium.jpg"
                required
                className="px-3.5 py-2 rounded-lg border border-gray-200 bg-white font-sans text-xs text-gray-900 outline-none focus:border-fg-blue w-full"
              />
              {coverImage && (
                <div className="relative w-full h-24 border border-gray-100 rounded-lg overflow-hidden mt-1 bg-gray-50 flex items-center justify-center">
                  <span className="text-[10px] text-gray-400 truncate px-2">{coverImage}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">Cover Image Alt text</label>
              <input
                type="text"
                value={coverImageAlt}
                onChange={(e) => setCoverImageAlt(e.target.value)}
                placeholder="Description of cover image"
                className="px-3.5 py-2 rounded-lg border border-gray-200 bg-white font-sans text-xs text-gray-900 outline-none focus:border-fg-blue w-full"
              />
            </div>

            {/* Author Profile sub-panel */}
            <div className="space-y-3 border-t border-gray-100 pt-4">
              <span className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">Author Bio</span>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Author name"
                className="px-3.5 py-2 rounded-lg border border-gray-200 bg-white font-sans text-xs text-gray-900 w-full outline-none focus:border-fg-blue"
              />
              <input
                type="text"
                value={authorTitle}
                onChange={(e) => setAuthorTitle(e.target.value)}
                placeholder="Author title (e.g. Head of Engineering)"
                className="px-3.5 py-2 rounded-lg border border-gray-200 bg-white font-sans text-xs text-gray-900 w-full outline-none focus:border-fg-blue"
              />
            </div>

            {/* Tags row */}
            <div className="flex flex-col gap-1.5 border-t border-gray-100 pt-4">
              <label className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">Tags (Press Enter)</label>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder="Type and hit Enter"
                className="px-3.5 py-2 rounded-lg border border-gray-200 bg-white font-sans text-xs text-gray-900 w-full outline-none focus:border-fg-blue"
              />
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {tags.map((tag, i) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 font-mono text-[9px] font-bold text-gray-600 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(i)}
                        className="text-gray-400 hover:text-gray-600 border-none bg-transparent cursor-pointer p-0"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Featured toggle */}
            <div className="flex items-center gap-2 border-t border-gray-100 pt-4">
              <label className="flex items-center gap-2 cursor-pointer font-sans text-xs font-semibold text-gray-700">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="rounded border-gray-300 text-fg-blue focus:ring-fg-blue"
                />
                Mark as Featured Article
              </label>
            </div>

          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={(e) => handleFormSubmit(e, false)}
              disabled={isLoading || !title.trim() || !content.trim()}
              className="w-full py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-700 font-sans text-xs font-semibold rounded-xl bg-white shadow-xs cursor-pointer outline-none flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              Save Draft
            </button>
            <button
              type="button"
              onClick={(e) => handleFormSubmit(e, true)}
              disabled={isLoading || !canPublish || !title.trim() || !content.trim()}
              className="w-full py-2.5 bg-fg-blue hover:bg-fg-blue/90 text-white font-sans text-xs font-bold rounded-xl shadow-xs cursor-pointer border-none outline-none flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <BookOpen className="w-3.5 h-3.5" />}
              Publish Article
            </button>
            {!canPublish && (
              <span className="font-mono text-[9px] text-gray-400 text-center uppercase tracking-wide block mt-1">
                * Content editor cannot publish articles directly.
              </span>
            )}
          </div>

        </div>

      </div>
    </div>
  )
}
