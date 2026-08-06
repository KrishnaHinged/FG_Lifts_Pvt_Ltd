'use client'

import { useState, useCallback, memo } from 'react'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'

export default memo(function TestimonialForm({ testimonial = null, onSubmit }) {
  const [name, setName] = useState(testimonial?.name || '')
  const [title, setTitle] = useState(testimonial?.title || '')
  const [quote, setQuote] = useState(testimonial?.quote || '')
  const [bgColor, setBgColor] = useState(testimonial?.bgColor || 'bg-[#1A1A1A] text-white')
  const [isActive, setIsActive] = useState(testimonial ? !!testimonial.isActive : true)
  const [sortOrder, setSortOrder] = useState(testimonial?.sortOrder || 0)
  
  const [submitting, setSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  const isEdit = !!testimonial

  const handleBlur = (field, value) => {
    let error = ''
    if (field === 'name' && !value.trim()) {
      error = 'Author name is required'
    } else if (field === 'quote' && !value.trim()) {
      error = 'Testimonial quote text is required'
    }
    setFieldErrors(prev => ({ ...prev, [field]: error || undefined }))
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')

    if (!name.trim() || !quote.trim()) {
      setErrorMsg('Author name and testimonial quote are required.')
      return
    }

    setSubmitting(true)
    const payload = {
      name,
      title,
      quote,
      bgColor,
      isActive,
      sortOrder: Number(sortOrder)
    }

    try {
      const url = isEdit ? `/api/admin/testimonials/${testimonial.id}` : '/api/admin/testimonials'
      const method = isEdit ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (res.ok && data.success) {
        onSubmit()
      } else {
        setErrorMsg(data.error || 'Something went wrong')
      }
    } catch {
      setErrorMsg('Network error.')
    } finally {
      setSubmitting(false)
    }
  }

  const bgOptions = [
    { value: 'bg-[#1A1A1A] text-white', label: 'Luxury Dark' },
    { value: 'bg-[#0E4FB3] text-white', label: 'Brand Blue' },
    { value: 'bg-[#0797CE] text-black', label: 'Vibrant Light Blue' },
    { value: 'bg-[#E8A840] text-black', label: 'Enterprise Gold' },
  ]

  return (
    <form onSubmit={handleFormSubmit} className="bg-white border border-[#E8E2DA] rounded-3xl p-8 max-w-2xl shadow-sm space-y-6">
      {errorMsg && (
        <div className="p-4 bg-red-50 text-red-700 text-xs font-mono rounded-xl border border-red-100">
          {errorMsg}
        </div>
      )}

      {/* Author Name */}
      <div className="space-y-1">
        <label htmlFor="name" className="block font-mono text-[9px] uppercase tracking-widest text-[#7A7A7A] font-bold">
          Author Name
        </label>
        <input
          id="name"
          type="text"
          className={`w-full px-4 py-3 rounded-xl border font-sans text-sm focus:outline-none transition-colors ${
            fieldErrors.name ? 'border-red-300 focus:border-red-500' : 'border-[#E8E2DA] focus:border-[#0E4FB3]'
          }`}
          placeholder="e.g. Rajesh Patel"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={(e) => handleBlur('name', e.target.value)}
          disabled={submitting}
        />
        {fieldErrors.name && (
          <span className="block text-[10px] text-red-600 font-mono mt-0.5">{fieldErrors.name}</span>
        )}
      </div>

      {/* Designation / Company / Location (Optional) */}
      <div className="space-y-1">
        <label htmlFor="title" className="block font-mono text-[9px] uppercase tracking-widest text-[#7A7A7A] font-bold">
          Designation / Location (Optional)
        </label>
        <input
          id="title"
          type="text"
          className={`w-full px-4 py-3 rounded-xl border font-sans text-sm focus:outline-none transition-colors ${
            fieldErrors.title ? 'border-red-300 focus:border-red-500' : 'border-[#E8E2DA] focus:border-[#0E4FB3]'
          }`}
          placeholder="e.g. Homeowner, Ahmedabad or VP Projects, Greenfield Group (Optional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={(e) => handleBlur('title', e.target.value)}
          disabled={submitting}
        />
        {fieldErrors.title && (
          <span className="block text-[10px] text-red-600 font-mono mt-0.5">{fieldErrors.title}</span>
        )}
      </div>

      {/* Testimonial Quote */}
      <div className="space-y-1">
        <label htmlFor="quote" className="block font-mono text-[9px] uppercase tracking-widest text-[#7A7A7A] font-bold">
          Testimonial Quote
        </label>
        <textarea
          id="quote"
          rows={5}
          className={`w-full px-4 py-3 rounded-xl border font-sans text-sm focus:outline-none transition-colors resize-none ${
            fieldErrors.quote ? 'border-red-300 focus:border-red-500' : 'border-[#E8E2DA] focus:border-[#0E4FB3]'
          }`}
          placeholder="Enter the client testimonial quote text here..."
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          onBlur={(e) => handleBlur('quote', e.target.value)}
          disabled={submitting}
        />
        {fieldErrors.quote && (
          <span className="block text-[10px] text-red-600 font-mono mt-0.5">{fieldErrors.quote}</span>
        )}
      </div>

      {/* Grid: Background Color Option & Sort Order */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Background Style option */}
        <div className="space-y-1">
          <label htmlFor="bgColor" className="block font-mono text-[9px] uppercase tracking-widest text-[#7A7A7A] font-bold">
            Card Theme Style
          </label>
          <select
            id="bgColor"
            className="w-full px-4 py-3 rounded-xl border border-[#E8E2DA] font-sans text-sm focus:outline-none focus:border-[#0E4FB3] bg-white transition-colors"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            disabled={submitting}
          >
            {bgOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Order */}
        <div className="space-y-1">
          <label htmlFor="sortOrder" className="block font-mono text-[9px] uppercase tracking-widest text-[#7A7A7A] font-bold">
            Sort Order
          </label>
          <input
            id="sortOrder"
            type="number"
            className="w-full px-4 py-3 rounded-xl border border-[#E8E2DA] font-sans text-sm focus:outline-none focus:border-[#0E4FB3] transition-colors"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            disabled={submitting}
            min={0}
          />
        </div>
      </div>

      {/* Card Preview Area */}
      <div className="space-y-2">
        <span className="block font-mono text-[9px] uppercase tracking-widest text-[#7A7A7A] font-bold">
          Visual Preview
        </span>
        <div className={`w-full rounded-[2rem] p-8 flex flex-col justify-between h-[250px] border border-white/5 shadow-sm transition-all duration-300 ${bgColor}`}>
          <p className="font-sans text-sm sm:text-base leading-relaxed m-0 font-light line-clamp-4">
            {quote || '"Quote text preview will appear here..."'}
          </p>

          <div className="flex items-center gap-3 mt-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold bg-white/10 text-white">
              {name ? name.trim().split(/\s+/).map(n => n[0]).join('').substring(0,2).toUpperCase() : 'RP'}
            </div>
            <div>
              <h4 className="font-sans text-sm font-bold m-0">
                {name || 'Author Name'}
              </h4>
              <span className="font-mono text-[9px] tracking-wider uppercase font-semibold block opacity-60">
                {title || 'Designation / Location'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Visibility Status toggle */}
      <div className="flex items-center gap-3">
        <input
          id="isActive"
          type="checkbox"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
          className="w-4 h-4 rounded text-[#0E4FB3] focus:ring-[#0E4FB3] border-[#E8E2DA]"
          disabled={submitting}
        />
        <label htmlFor="isActive" className="font-sans text-sm text-[#111111] font-semibold cursor-pointer">
          Make this testimonial active (visible on public site)
        </label>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-4 pt-4 border-t border-[#E8E2DA]/50">
        <button
          type="submit"
          className="inline-flex items-center justify-center font-sans font-bold uppercase tracking-wider transition-all duration-300 bg-[#0E4FB3] text-white hover:bg-[#0b3c8a] active:bg-[#082a63] px-6 py-3 text-[11px] rounded-full disabled:opacity-50 cursor-pointer border-none outline-none"
          disabled={submitting}
        >
          {submitting ? (
            <>
              <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Testimonial'
          )}
        </button>
        <Link
          href="/admin/testimonials"
          className="inline-flex items-center justify-center font-sans font-bold uppercase tracking-wider transition-all duration-300 border border-[#E8E2DA] bg-transparent text-[#111111] hover:bg-neutral-50 px-6 py-3 text-[11px] rounded-full no-underline"
        >
          Cancel
        </Link>
      </div>
    </form>
  )
})
