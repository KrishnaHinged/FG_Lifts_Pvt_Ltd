'use client'

import { useState, useEffect, useRef } from 'react'
import { Eye, Loader2 } from 'lucide-react'

export default function BlogSidebar({ post }) {
  const [copied, setCopied] = useState(false)
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [shareUrl, setShareUrl] = useState('')
  const copyTimerRef = useRef(null)

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(window.location.href)
    }
  }, [])

  if (!post) return null

  // 1. Parse headings from post.content HTML
  const headings = post.content
    ? post.content
        .match(/<h[23][^>]*>(.*?)<\/h[23]>/gi)
        ?.map(h => {
          const text = h.replace(/<[^>]+>/g, '').trim()
          const isH2 = h.toLowerCase().startsWith('<h2')
          return { text, isH2 }
        }) || []
    : []

  const scrollToHeading = (text) => {
    const el = Array.from(document.querySelectorAll('h2, h3')).find(
      (h) => h.textContent.trim() === text
    )
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  // 2. Format Published Date
  const pubDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    : 'Draft'

  // 3. Share - Copy Link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
    copyTimerRef.current = setTimeout(() => setCopied(false), 2000)
  }

  // 4. Newsletter Signup Form Submission
  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!email.trim() || submitting) return

    setSubmitting(true)
    setErrorMsg('')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'Blog Sidebar' })
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setSubscribed(true)
        setEmail('')
      } else {
        setErrorMsg(data.error || 'Failed to subscribe')
      }
    } catch {
      setErrorMsg('Network error.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <aside className="lg:sticky lg:top-[100px] space-y-8">
      {/* SECTION 1 — Table of Contents */}
      {headings.length > 0 && (
        <div>
          <h4 className="font-mono text-xs text-[#7A7A7A] uppercase tracking-widest mb-3">
            In this article
          </h4>
          <ul className="space-y-2.5 p-0 m-0 list-none">
            {headings.map((h, i) => (
              <li
                key={i}
                onClick={() => scrollToHeading(h.text)}
                className={`transition duration-200 cursor-pointer block hover:text-[#0E4FB3] hover:translate-x-1 ${
                  h.isH2
                    ? 'font-medium text-[#3D3D3D] text-sm'
                    : 'pl-3 text-[#7A7A7A] text-xs'
                }`}
              >
                {h.text}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* SECTION 2 — Post Meta Card */}
      <div className="bg-white border border-[#E0D9D0] rounded-2xl p-5 shadow-xs flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <span className="font-mono text-xs text-[#7A7A7A] uppercase tracking-wider">Category</span>
          <span className="bg-[#E8F0FC] text-[#0E4FB3] text-xs font-mono px-3 py-1 rounded-full font-bold">
            {post.category}
          </span>
        </div>
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <span className="font-mono text-xs text-[#7A7A7A] uppercase tracking-wider">Published</span>
          <span className="font-sans text-sm text-[#111827] font-semibold">{pubDate}</span>
        </div>
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <span className="font-mono text-xs text-[#7A7A7A] uppercase tracking-wider">Read Time</span>
          <span className="font-sans text-sm text-[#111827] font-semibold">{post.readTime || 5} min read</span>
        </div>
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <span className="font-mono text-xs text-[#7A7A7A] uppercase tracking-wider">Views</span>
          <span className="font-sans text-sm text-[#111827] font-semibold flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-[#7A7A7A]" />
            {post.views?.toLocaleString() || 0}
          </span>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1 pt-1">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-[#EDE8E2] text-[#3D3D3D] font-mono text-xs px-3 py-1 rounded-full font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 3 — Share Buttons */}
      <div>
        <h4 className="font-sans font-semibold text-[#111827] text-sm mb-3">
          Share this article
        </h4>
        <div className="flex flex-wrap gap-2">
          {/* Copy Link */}
          <button
            onClick={handleCopyLink}
            className={`bg-[#F5F0EB] border border-[#E0D9D0] rounded-xl px-3 py-2 text-xs font-mono cursor-pointer transition-all hover:bg-gray-50 flex items-center justify-center ${
              copied ? 'text-emerald-600 font-bold' : 'text-[#111827]'
            }`}
          >
            {copied ? 'Copied!' : 'Copy Link'}
          </button>

          {/* LinkedIn */}
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#F5F0EB] border border-[#E0D9D0] text-[#111827] rounded-xl px-3 py-2 text-xs font-mono no-underline hover:bg-gray-50 transition-all block text-center"
          >
            LinkedIn
          </a>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/?text=${encodeURIComponent(post.title + ' ' + shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#F5F0EB] border border-[#E0D9D0] text-[#111827] rounded-xl px-3 py-2 text-xs font-mono no-underline hover:bg-gray-50 transition-all block text-center"
          >
            WhatsApp
          </a>
        </div>
      </div>

      {/* SECTION 4 — Mini Newsletter Form */}
      <div className="bg-[#0E4FB3] rounded-2xl p-5 text-white shadow-sm">
        <h4 className="font-sans font-semibold text-base m-0 leading-tight">
          Stay Updated
        </h4>
        <p className="text-white/70 text-xs mt-1 m-0 leading-normal">
          No spam. Unsubscribe anytime.
        </p>

        {subscribed ? (
          <div className="mt-4 font-sans font-semibold text-sm text-white bg-white/10 rounded-xl p-3 border border-white/20 text-center animate-fade-in">
            ✓ Subscribed!
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="mt-4 flex flex-col gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address..."
              required
              disabled={submitting}
              className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-white/40 focus:bg-white/15 transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={submitting || !email.trim()}
              className="w-full bg-white text-[#0E4FB3] hover:bg-gray-50 transition-colors font-bold rounded-xl py-2.5 text-sm cursor-pointer border-none outline-none disabled:opacity-50 flex items-center justify-center gap-1.5"
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              Subscribe
            </button>
          </form>
        )}

        {errorMsg && (
          <p className="text-red-300 font-mono text-[10px] mt-2.5 mb-0 bg-red-900/20 border border-red-500/20 rounded-lg p-2 leading-relaxed">
            {errorMsg}
          </p>
        )}
      </div>
    </aside>
  )
}
