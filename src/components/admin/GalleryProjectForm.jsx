'use client'

import { useState, useCallback, memo } from 'react'
import { Plus, Trash2 } from 'lucide-react'

export default memo(function GalleryProjectForm({ project = null, products = [], onSubmit, isLoading = false }) {
  const [title, setTitle] = useState(project?.title || '')
  const [slug, setSlug] = useState(project?.slug || '')
  const [location, setLocation] = useState(project?.location || '')
  const [clientType, setClientType] = useState(project?.clientType || 'Commercial')
  const [completionYear, setCompletionYear] = useState(project?.completionYear || new Date().getFullYear())
  const [description, setDescription] = useState(project?.description || '')
  const [sortOrder, setSortOrder] = useState(project?.sortOrder || 0)
  const [isFeatured, setIsFeatured] = useState(!!project?.isFeatured)
  const [isActive, setIsActive] = useState(project ? !!project.isActive : true)
  const [badge, setBadge] = useState(project?.badge || '')

  // Linked systems multi-select checklist
  const [linkedProducts, setLinkedProducts] = useState(project?.linkedProducts || [])

  // Showcase portfolio images list (dynamic rows)
  const [images, setImages] = useState(project?.images || [{ url: '', alt: '' }])

  const handleTitleChange = (val) => {
    setTitle(val)
    if (!project) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''))
    }
  }

  const handleProductToggle = (prodId) => {
    if (linkedProducts.includes(prodId)) {
      setLinkedProducts(linkedProducts.filter(id => id !== prodId))
    } else {
      setLinkedProducts([...linkedProducts, prodId])
    }
  }

  // Dynamic portfolio images helpers
  const addImage = () => setImages([...images, { url: '', alt: '' }])
  const removeImage = (idx) => setImages(images.filter((_, i) => i !== idx))
  const handleImageChange = (idx, field, val) => {
    const list = [...images]
    list[idx][field] = val
    setImages(list)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const cleanImages = images.filter(img => img.url.trim())

    const payload = {
      title,
      slug: slug.toLowerCase(),
      location,
      clientType,
      completionYear: Number(completionYear),
      description,
      sortOrder: Number(sortOrder) || 0,
      isFeatured,
      isActive,
      badge,
      linkedProducts,
      images: cleanImages
    }

    onSubmit(payload)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 select-none max-w-4xl mx-auto">
      
      {/* 2-Column Info card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">Project Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. Grand Hyatt Observation Atrium"
              required
              className="px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white font-sans text-sm text-gray-900 outline-none focus:border-fg-blue w-full"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">Slug (URL identifier)</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. grand-hyatt-observation-atrium"
              required
              className="px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white font-sans text-sm text-gray-900 outline-none focus:border-fg-blue w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">Location City / State</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Mumbai, Maharashtra"
              required
              className="px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white font-sans text-sm text-gray-900 outline-none focus:border-fg-blue w-full"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">Client Sector / Type</label>
            <select
              value={clientType}
              onChange={(e) => setClientType(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white font-sans text-sm outline-none focus:border-fg-blue w-full"
            >
              {['Commercial', 'Residential', 'Industrial', 'Hospitality', 'Luxury', 'Hospital'].map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">Completion Year</label>
            <input
              type="number"
              value={completionYear}
              onChange={(e) => setCompletionYear(e.target.value)}
              placeholder="2025"
              required
              className="px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white font-sans text-sm text-gray-900 outline-none focus:border-fg-blue w-full"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">Project Summary Details</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the project parameters, engineering constraints, and solutions installed..."
            rows={4}
            className="px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white font-sans text-sm text-gray-900 outline-none focus:border-fg-blue w-full resize-y"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">Badge Text</label>
            <input
              type="text"
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              placeholder="e.g. Observation Landmark"
              className="px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white font-sans text-sm text-gray-900 outline-none focus:border-fg-blue w-full"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">Priority Order</label>
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              placeholder="0"
              className="px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white font-sans text-sm text-gray-900 outline-none focus:border-fg-blue w-full"
            />
          </div>
          <div className="flex items-center gap-6 pt-5">
            <label className="flex items-center gap-2 cursor-pointer font-sans text-sm font-semibold text-gray-700">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="rounded border-gray-300 text-fg-blue focus:ring-fg-blue"
              />
              Featured Project
            </label>
            <label className="flex items-center gap-2 cursor-pointer font-sans text-sm font-semibold text-gray-700">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="rounded border-gray-300 text-fg-blue focus:ring-fg-blue"
              />
              Active Listed
            </label>
          </div>
        </div>

      </div>

      {/* Linked Products list */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-3">
        <label className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold mb-1.5 block">
          Linked Elevator Systems installed
        </label>
        <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-2 no-scrollbar">
          {products.map(prod => {
            const checked = linkedProducts.includes(prod._id)
            return (
              <label
                key={prod._id}
                className={`flex items-center gap-2.5 px-3 py-2 border rounded-xl cursor-pointer font-sans text-xs font-semibold transition-colors duration-200 ${
                  checked
                    ? 'border-fg-blue bg-blue-50/50 text-fg-blue'
                    : 'border-gray-200 bg-transparent text-gray-600 hover:border-gray-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleProductToggle(prod._id)}
                  className="rounded border-gray-300 text-fg-blue focus:ring-fg-blue"
                />
                <span className="truncate">{prod.name}</span>
              </label>
            )
          })}
          {products.length === 0 && (
            <p className="font-mono text-xs text-gray-400 py-2">No active systems available. Set up products first.</p>
          )}
        </div>
      </div>

      {/* Image list */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
        
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <span className="font-sans font-semibold text-sm text-gray-800">Portfolio Image Carousel</span>
          <button
            type="button"
            onClick={addImage}
            className="inline-flex items-center gap-1 bg-fg-blue-lt text-fg-blue px-3 py-1.5 rounded-lg font-bold text-xs cursor-pointer border-none hover:bg-fg-blue/10 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Image Row
          </button>
        </div>

        <div className="space-y-3">
          {images.map((img, i) => (
            <div key={i} className="flex gap-3 items-center">
              <input
                type="text"
                value={img.url}
                onChange={(e) => handleImageChange(i, 'url', e.target.value)}
                placeholder="Image URL (e.g. /images/gallery/atrium.jpg)"
                required
                className="flex-1 px-3.5 py-2 rounded-xl border border-gray-200 bg-white font-sans text-xs outline-none focus:border-fg-blue"
              />
              <input
                type="text"
                value={img.alt}
                onChange={(e) => handleImageChange(i, 'alt', e.target.value)}
                placeholder="Alt Description text"
                className="flex-1 px-3.5 py-2 rounded-xl border border-gray-200 bg-white font-sans text-xs outline-none focus:border-fg-blue"
              />
              <button
                type="button"
                onClick={() => removeImage(i)}
                disabled={images.length === 1}
                className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-gray-50 disabled:opacity-40 cursor-pointer bg-transparent border-none"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

      </div>

      {/* Form Submission Button */}
      <div className="flex justify-end select-none">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-fg-blue text-white rounded-full px-8 py-3 font-sans font-bold text-sm no-underline shadow-sm hover:shadow-md hover:bg-fg-blue/90 transition-all duration-300 cursor-pointer border-none outline-none disabled:opacity-50"
        >
          {isLoading ? 'Saving Changes...' : 'Save Showcase Project'}
        </button>
      </div>

    </form>
  )
})
