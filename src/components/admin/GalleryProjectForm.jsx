'use client'

import { useState, memo } from 'react'
import Image from 'next/image'
import { 
  UploadCloud, 
  Crop, 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Globe, 
  CheckCircle2,
  RefreshCw,
  Layers,
  FileText,
  Sparkles
} from 'lucide-react'
import MediaGalleryModal from '@/components/admin/MediaGalleryModal'
import { compressImage } from '@/utils/image'
import { uploadImageToMedia } from '@/utils/mediaUpload'

export default memo(function GalleryProjectForm({ project = null, products = [], onSubmit, isLoading = false }) {
  // Core Information
  const [title, setTitle] = useState(project?.title || '')
  const [subtitle, setSubtitle] = useState(project?.subtitle || '')
  const [slug, setSlug] = useState(project?.slug || '')
  const [location, setLocation] = useState(project?.location || '')
  const [clientType, setClientType] = useState(project?.clientType || 'Commercial')
  const [completionYear, setCompletionYear] = useState(project?.completionYear || project?.year || new Date().getFullYear())
  const [description, setDescription] = useState(project?.description || '')
  
  // Visual Media & Crop
  const [coverImage, setCoverImage] = useState(project?.coverImage || (project?.images && project.images[0] ? (typeof project.images[0] === 'string' ? project.images[0] : project.images[0].url) : ''))
  const [images, setImages] = useState(() => {
    if (project?.images && project.images.length > 0) {
      return project.images.map(img => typeof img === 'string' ? { url: img, alt: '' } : { url: img.url || '', alt: img.alt || '' })
    }
    return [{ url: '', alt: '' }]
  })
  
  // Media Modal & Crop state
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false)
  const [targetCropAspect, setTargetCropAspect] = useState(16 / 9) // default 16:9 landscape
  const [selectedCropRatioLabel, setSelectedCropRatioLabel] = useState('16:9 Landscape')

  // Badges & Publishing flags
  const [badge, setBadge] = useState(project?.badge || '')
  const [sortOrder, setSortOrder] = useState(project?.sortOrder || 0)
  const [isFeatured, setIsFeatured] = useState(!!project?.isFeatured)
  const [isActive, setIsActive] = useState(project ? !!project.isActive : true)

  // Linked systems
  const [linkedProducts, setLinkedProducts] = useState(project?.linkedProducts || [])

  // SEO Engine
  const [seoTitle, setSeoTitle] = useState(project?.seoTitle || '')
  const [seoDescription, setSeoDescription] = useState(project?.seoDescription || '')
  const [seoKeywords, setSeoKeywords] = useState(project?.seoKeywords || '')
  const [autoSyncSeo, setAutoSyncSeo] = useState(!project?.seoTitle)

  // Auto-generate Slug & Default SEO Title when Title changes
  const handleTitleChange = (val) => {
    setTitle(val)
    const generatedSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    setSlug(generatedSlug)

    if (autoSyncSeo) {
      setSeoTitle(val ? `${val} | FG Lift Showcase` : '')
    }
  }

  const handleSubtitleChange = (val) => {
    setSubtitle(val)
    if (autoSyncSeo) {
      setSeoDescription(val ? `${val}. Engineered and installed by FG Lift Pvt. Ltd.` : '')
    }
  }

  // Cover Image direct local upload handler
  const handleDirectCoverUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = async (event) => {
      const rawDataUrl = event.target.result
      const compressed = await compressImage(rawDataUrl, 1600, 0.85)
      const uploadedUrl = await uploadImageToMedia(compressed, file.name, 'gallery-cover')
      setCoverImage(uploadedUrl)
    }
    reader.readAsDataURL(file)
  }

  // Handle Cover image selection from Modal
  const handleCoverSelectFromGallery = (selectedUrl) => {
    setCoverImage(selectedUrl)
    setIsMediaModalOpen(false)
  }

  // Aspect ratio presets for crop
  const aspectPresets = [
    { label: '16:9 Landscape', ratio: 16 / 9 },
    { label: '4:3 Standard', ratio: 4 / 3 },
    { label: '1:1 Square', ratio: 1 },
    { label: '3:5 Shaft Tower', ratio: 3 / 5 },
  ]

  const handleAspectChange = (preset) => {
    setTargetCropAspect(preset.ratio)
    setSelectedCropRatioLabel(preset.label)
  }

  // Linked Products toggle
  const handleProductToggle = (prodId) => {
    if (linkedProducts.includes(prodId)) {
      setLinkedProducts(linkedProducts.filter(id => id !== prodId))
    } else {
      setLinkedProducts([...linkedProducts, prodId])
    }
  }

  // Dynamic portfolio carousel images
  const addImageRow = () => setImages([...images, { url: '', alt: '' }])
  const removeImageRow = (idx) => setImages(images.filter((_, i) => i !== idx))
  const handleImageRowChange = (idx, field, val) => {
    const list = [...images]
    list[idx][field] = val
    setImages(list)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const cleanImages = images.filter(img => img.url && img.url.trim())

    const payload = {
      title: title.trim(),
      subtitle: subtitle.trim(),
      slug: (slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-')).trim(),
      location: location.trim(),
      clientType,
      category: clientType,
      completionYear: Number(completionYear) || new Date().getFullYear(),
      year: Number(completionYear) || new Date().getFullYear(),
      description: description.trim(),
      coverImage: coverImage || (cleanImages[0] ? cleanImages[0].url : ''),
      images: cleanImages,
      badge: badge.trim(),
      sortOrder: Number(sortOrder) || 0,
      isFeatured,
      isActive,
      linkedProducts,
      seoTitle: seoTitle.trim() || title.trim(),
      seoDescription: seoDescription.trim() || subtitle.trim() || description.slice(0, 160),
      seoKeywords: seoKeywords.trim()
    }

    onSubmit(payload)
  }

  // Computed values for SERP Live Preview
  const displaySeoTitle = seoTitle || (title ? `${title} | FG Lift Showcase` : 'Project Title | FG Lift Pvt. Ltd.')
  const displaySeoUrl = `https://fglift.com/gallery/${slug || 'project-url-slug'}`
  const displaySeoDesc = seoDescription || (subtitle ? `${subtitle}. Engineered and installed by FG Lift Pvt. Ltd.` : (description ? description.slice(0, 155) : 'Explore high-speed elevator engineering and custom luxury cabin installations by FG Lift Pvt. Ltd.'))

  return (
    <form onSubmit={handleSubmit} className="space-y-8 select-none max-w-5xl mx-auto pb-12">
      
      {/* SECTION 1: COVER IMAGE & INTERACTIVE CROPPER */}
      <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
          <div>
            <h3 className="font-sans font-bold text-gray-900 text-lg flex items-center gap-2 m-0">
              <ImageIcon className="w-5 h-5 text-fg-blue" />
              1. Showcase Main Image &amp; Cropper
            </h3>
            <p className="font-sans text-xs text-gray-500 m-0 mt-0.5">
              Upload from your device gallery, choose from stock media, or crop to ideal aspect ratio.
            </p>
          </div>

          {/* Aspect ratio preset pills for Cropper */}
          <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl">
            {aspectPresets.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => handleAspectChange(preset)}
                className={`px-2.5 py-1 rounded-lg font-mono text-[10px] font-bold uppercase transition cursor-pointer border-none ${
                  selectedCropRatioLabel === preset.label
                    ? 'bg-fg-blue text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/60'
                }`}
              >
                {preset.label.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Cover Image Preview & Action Controls */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          {/* Visual Display Box */}
          <div className="md:col-span-7 flex flex-col items-center">
            {coverImage ? (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-2 border-gray-200 shadow-md group bg-neutral-900">
                <Image
                  src={coverImage}
                  alt={title || 'Showcase Project Cover'}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized={coverImage.startsWith('data:')}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                
                {/* Badge Overlay Preview */}
                {badge && (
                  <div className="absolute top-3 left-3 bg-fg-blue/90 text-white font-mono text-[10px] font-bold uppercase px-2.5 py-1 rounded-md shadow-xs">
                    {badge}
                  </div>
                )}

                {/* Subtitle / Title Overlay Preview */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-blue-300 block font-bold">
                    {location || 'Location'} · {clientType}
                  </span>
                  <h4 className="font-sans font-bold text-sm text-white truncate m-0">
                    {title || 'Untitled Showcase Project'}
                  </h4>
                  {subtitle && (
                    <p className="font-sans text-xs text-gray-200 truncate m-0 opacity-90">
                      {subtitle}
                    </p>
                  )}
                </div>

                {/* Active check mark */}
                <div className="absolute top-3 right-3 bg-emerald-500 text-white p-1 rounded-full shadow-md">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
            ) : (
              <label
                htmlFor="direct-cover-file"
                className="w-full aspect-video border-2 border-dashed border-gray-300 hover:border-fg-blue bg-gray-50 hover:bg-blue-50/20 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all p-6 text-center group block"
              >
                <input
                  id="direct-cover-file"
                  type="file"
                  accept="image/*"
                  onChange={handleDirectCoverUpload}
                  className="hidden"
                />
                <div className="w-12 h-12 rounded-full bg-blue-50 text-fg-blue group-hover:scale-110 flex items-center justify-center mb-3 transition-transform pointer-events-none">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <h4 className="font-sans font-bold text-gray-900 text-sm m-0 pointer-events-none">
                  Upload Cover Image from Gallery
                </h4>
                <p className="font-sans text-xs text-gray-500 m-0 mt-1 max-w-xs pointer-events-none">
                  Click to choose file or drag &amp; drop high-resolution project photo (JPG, PNG, WEBP).
                </p>
              </label>
            )}
          </div>

          {/* Action Control Column */}
          <div className="md:col-span-5 flex flex-col gap-3 justify-center h-full">
            <button
              type="button"
              onClick={() => setIsMediaModalOpen(true)}
              className="w-full py-3 px-4 rounded-xl bg-fg-blue text-white font-sans font-bold text-xs uppercase tracking-wider hover:bg-fg-blue/90 shadow-xs hover:shadow-md transition flex items-center justify-center gap-2 cursor-pointer border-none"
            >
              <ImageIcon className="w-4 h-4" />
              Open Media Gallery
            </button>

            <button
              type="button"
              onClick={() => {
                if (coverImage) {
                  setIsMediaModalOpen(true)
                } else {
                  alert('Please upload or select an image first before cropping.')
                }
              }}
              className="w-full py-3 px-4 rounded-xl bg-orange-600 text-white font-sans font-bold text-xs uppercase tracking-wider hover:bg-orange-700 shadow-xs hover:shadow-md transition flex items-center justify-center gap-2 cursor-pointer border-none"
            >
              <Crop className="w-4 h-4" />
              Crop &amp; Adjust Image ({selectedCropRatioLabel.split(' ')[0]})
            </button>

            <label
              htmlFor="direct-cover-file-btn"
              className="w-full py-2.5 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-sans font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer border-none text-center"
            >
              <input
                id="direct-cover-file-btn"
                type="file"
                accept="image/*"
                onChange={handleDirectCoverUpload}
                className="hidden"
              />
              <UploadCloud className="w-4 h-4 text-gray-500" />
              Upload Local File
            </label>

            {coverImage && (
              <button
                type="button"
                onClick={() => setCoverImage('')}
                className="w-full py-2 px-4 rounded-xl text-red-600 hover:bg-red-50 font-mono text-xs uppercase font-bold transition flex items-center justify-center gap-1.5 cursor-pointer border border-red-100 bg-transparent"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Remove Cover Image
              </button>
            )}
          </div>

        </div>
      </div>

      {/* SECTION 2: CORE DETAILS (TITLE, SUBTITLE & SPECS) */}
      <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        <div className="border-b border-gray-100 pb-3">
          <h3 className="font-sans font-bold text-gray-900 text-lg flex items-center gap-2 m-0">
            <FileText className="w-5 h-5 text-fg-blue" />
            2. Showcase Title, Subtitle &amp; Overview
          </h3>
          <p className="font-sans text-xs text-gray-500 m-0 mt-0.5">
            Fill in the primary headline, secondary tagline, and technical installation details.
          </p>
        </div>

        <div className="space-y-4">
          
          {/* Main Title Input */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="font-mono text-xs uppercase tracking-wider text-gray-600 font-bold">
                Project Title <span className="text-red-500">*</span>
              </label>
              <span className="font-mono text-[10px] text-gray-400">
                {title.length} characters
              </span>
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. Grand Hyatt Glass Observation Elevator Tower"
              required
              className="px-4 py-3 rounded-xl border border-gray-300 font-sans text-base text-gray-900 font-semibold outline-none focus:border-fg-blue focus:ring-2 focus:ring-fg-blue/20 w-full transition"
            />
          </div>

          {/* Prominent Subtitle Input */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="font-mono text-xs uppercase tracking-wider text-gray-600 font-bold">
                Subtitle / Tagline
              </label>
              <span className="font-mono text-[10px] text-gray-400">
                {subtitle.length} characters
              </span>
            </div>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => handleSubtitleChange(e.target.value)}
              placeholder="e.g. Dual panoramic high-speed glass cabs with champagne gold custom interior framing"
              className="px-4 py-2.5 rounded-xl border border-gray-300 font-sans text-sm text-gray-800 outline-none focus:border-fg-blue focus:ring-2 focus:ring-fg-blue/20 w-full transition"
            />
          </div>

          {/* 3-Grid: Location, Sector, Completion Year */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[10px] uppercase tracking-wider text-gray-500 font-bold">
                Location (City / State)
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Mumbai, Maharashtra"
                required
                className="px-3.5 py-2.5 rounded-xl border border-gray-300 font-sans text-sm text-gray-900 outline-none focus:border-fg-blue w-full"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[10px] uppercase tracking-wider text-gray-500 font-bold">
                Client Sector / Category
              </label>
              <select
                value={clientType}
                onChange={(e) => setClientType(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl border border-gray-300 font-sans text-sm outline-none focus:border-fg-blue w-full bg-white cursor-pointer"
              >
                {['Commercial', 'Residential', 'Industrial', 'Hospitality', 'Luxury', 'Hospital'].map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[10px] uppercase tracking-wider text-gray-500 font-bold">
                Completion Year
              </label>
              <input
                type="number"
                value={completionYear}
                onChange={(e) => setCompletionYear(e.target.value)}
                placeholder="2026"
                required
                className="px-3.5 py-2.5 rounded-xl border border-gray-300 font-sans text-sm text-gray-900 outline-none focus:border-fg-blue w-full"
              />
            </div>
          </div>

          {/* Description Textarea */}
          <div className="flex flex-col gap-1.5 pt-2">
            <label className="font-mono text-xs uppercase tracking-wider text-gray-600 font-bold">
              Project Engineering Summary
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detail the shaft dimensions, passenger capacity, speed parameters, aesthetic finishes, and architectural achievements..."
              rows={4}
              className="px-4 py-3 rounded-xl border border-gray-300 font-sans text-sm text-gray-900 outline-none focus:border-fg-blue focus:ring-2 focus:ring-fg-blue/20 w-full resize-y"
            />
          </div>

          {/* Badge & Options Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[10px] uppercase tracking-wider text-gray-500 font-bold">
                Custom Badge Label
              </label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="e.g. Landmark Atrium"
                className="px-3.5 py-2.5 rounded-xl border border-gray-300 font-sans text-sm text-gray-900 outline-none focus:border-fg-blue w-full"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[10px] uppercase tracking-wider text-gray-500 font-bold">
                Sort Priority Order
              </label>
              <input
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                placeholder="0"
                className="px-3.5 py-2.5 rounded-xl border border-gray-300 font-sans text-sm text-gray-900 outline-none focus:border-fg-blue w-full"
              />
            </div>

            <div className="flex items-center gap-5 pt-5">
              <label className="flex items-center gap-2 cursor-pointer font-sans text-xs font-bold text-gray-800">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-fg-blue focus:ring-fg-blue cursor-pointer"
                />
                Featured Showcase
              </label>
              <label className="flex items-center gap-2 cursor-pointer font-sans text-xs font-bold text-gray-800">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-fg-blue focus:ring-fg-blue cursor-pointer"
                />
                Active Published
              </label>
            </div>
          </div>

        </div>
      </div>

      {/* SECTION 3: SEO ENGINE & LIVE GOOGLE SEARCH PREVIEW ("SEO THING") */}
      <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
          <div>
            <h3 className="font-sans font-bold text-gray-900 text-lg flex items-center gap-2 m-0">
              <Globe className="w-5 h-5 text-emerald-600" />
              3. SEO &amp; Search Engine Optimization
            </h3>
            <p className="font-sans text-xs text-gray-500 m-0 mt-0.5">
              Configure search engine metadata and review real-time Google search snippet rendering.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setAutoSyncSeo(!autoSyncSeo)
              if (!autoSyncSeo) {
                setSeoTitle(title ? `${title} | FG Lift Showcase` : '')
                setSeoDescription(subtitle ? `${subtitle}. Engineered by FG Lift Pvt. Ltd.` : '')
              }
            }}
            className={`px-3 py-1.5 rounded-xl font-mono text-[11px] font-bold flex items-center gap-1.5 cursor-pointer border transition ${
              autoSyncSeo
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                : 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${autoSyncSeo ? 'animate-spin-slow text-emerald-600' : ''}`} />
            {autoSyncSeo ? 'Auto-Sync Active' : 'Manual SEO Mode'}
          </button>
        </div>

        {/* Live Google SERP Snippet Preview Box */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-2 select-text">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center">
              FG
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-sans text-xs font-semibold text-gray-900">FG Lift Pvt. Ltd.</span>
              <span className="font-mono text-[10px] text-gray-500 truncate max-w-xs">{displaySeoUrl}</span>
            </div>
          </div>

          <div className="pt-1">
            <h4 className="font-sans font-medium text-lg text-[#1a0dab] hover:underline cursor-pointer leading-snug m-0 truncate">
              {displaySeoTitle}
            </h4>
            <p className="font-sans text-xs text-[#4d5156] leading-normal m-0 mt-1 line-clamp-2">
              {displaySeoDesc}
            </p>
          </div>

          <div className="pt-2 flex items-center gap-2 border-t border-gray-200/60 mt-3">
            <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-700 font-bold bg-emerald-100/80 px-2 py-0.5 rounded">
              Google SERP Live Preview
            </span>
          </div>
        </div>

        {/* SEO Inputs Grid */}
        <div className="space-y-4 pt-2">
          
          {/* SEO Title Input */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="font-mono text-xs uppercase tracking-wider text-gray-700 font-bold">
                Meta SEO Title
              </label>
              <span className={`font-mono text-[10px] font-bold ${seoTitle.length > 60 ? 'text-amber-600' : 'text-emerald-600'}`}>
                {seoTitle.length} / 60 recommended
              </span>
            </div>
            <input
              type="text"
              value={seoTitle}
              onChange={(e) => {
                setSeoTitle(e.target.value)
                setAutoSyncSeo(false)
              }}
              placeholder="e.g. Grand Hyatt Glass Elevator Showcase | FG Lift Pvt. Ltd."
              className="px-4 py-2.5 rounded-xl border border-gray-300 font-sans text-sm text-gray-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 w-full transition"
            />
          </div>

          {/* Meta Description Input */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="font-mono text-xs uppercase tracking-wider text-gray-700 font-bold">
                Meta SEO Description
              </label>
              <span className={`font-mono text-[10px] font-bold ${seoDescription.length > 160 ? 'text-amber-600' : 'text-emerald-600'}`}>
                {seoDescription.length} / 160 recommended
              </span>
            </div>
            <textarea
              value={seoDescription}
              onChange={(e) => {
                setSeoDescription(e.target.value)
                setAutoSyncSeo(false)
              }}
              placeholder="e.g. Discover our flagship observation glass elevator installation at Grand Hyatt. Engineered with high-speed traction technology and bespoke gold finishes."
              rows={2}
              className="px-4 py-2.5 rounded-xl border border-gray-300 font-sans text-sm text-gray-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 w-full resize-y transition"
            />
          </div>

          {/* 2-Grid: URL Slug & Keywords */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[10px] uppercase tracking-wider text-gray-600 font-bold">
                URL Slug Identifier
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 font-mono text-xs text-gray-400 select-none">
                  /gallery/
                </span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'))}
                  placeholder="grand-hyatt-glass-elevator"
                  required
                  className="pl-20 pr-3.5 py-2.5 rounded-xl border border-gray-300 font-mono text-xs text-gray-900 outline-none focus:border-emerald-600 w-full"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[10px] uppercase tracking-wider text-gray-600 font-bold">
                Focus Keywords (Comma Separated)
              </label>
              <input
                type="text"
                value={seoKeywords}
                onChange={(e) => setSeoKeywords(e.target.value)}
                placeholder="e.g. glass elevator, observation lift, luxury atrium, commercial elevator"
                className="px-3.5 py-2.5 rounded-xl border border-gray-300 font-sans text-xs text-gray-900 outline-none focus:border-emerald-600 w-full"
              />
            </div>
          </div>

        </div>
      </div>

      {/* SECTION 4: PORTFOLIO CAROUSEL & LINKED SYSTEMS */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Linked Elevator Systems Checklist */}
        <div className="md:col-span-5 bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-4 flex flex-col">
          <div className="border-b border-gray-100 pb-2">
            <h4 className="font-sans font-bold text-gray-900 text-base flex items-center gap-2 m-0">
              <Layers className="w-4 h-4 text-fg-blue" />
              Linked Elevator Systems
            </h4>
            <p className="font-sans text-[11px] text-gray-500 m-0 mt-0.5">
              Check product models installed in this project.
            </p>
          </div>

          <div className="flex-1 max-h-64 overflow-y-auto space-y-2 pr-1 no-scrollbar">
            {products.map(prod => {
              const checked = linkedProducts.includes(prod._id)
              return (
                <label
                  key={prod._id}
                  className={`flex items-center justify-between px-3.5 py-2.5 border rounded-xl cursor-pointer font-sans text-xs font-semibold transition-colors duration-200 ${
                    checked
                      ? 'border-fg-blue bg-blue-50/50 text-fg-blue'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleProductToggle(prod._id)}
                      className="w-4 h-4 rounded border-gray-300 text-fg-blue focus:ring-fg-blue cursor-pointer"
                    />
                    <span className="truncate">{prod.name}</span>
                  </div>
                  {checked && <CheckCircle2 className="w-4 h-4 text-fg-blue shrink-0" />}
                </label>
              )
            })}
            {products.length === 0 && (
              <p className="font-mono text-xs text-gray-400 py-4 text-center">
                No active elevator products available.
              </p>
            )}
          </div>
        </div>

        {/* Dynamic Portfolio Gallery Rows */}
        <div className="md:col-span-7 bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
            <div>
              <h4 className="font-sans font-bold text-gray-900 text-base flex items-center gap-2 m-0">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Additional Portfolio Gallery Photos
              </h4>
              <p className="font-sans text-[11px] text-gray-500 m-0 mt-0.5">
                Add secondary interior or shaft photos to the carousel.
              </p>
            </div>
            <button
              type="button"
              onClick={addImageRow}
              className="inline-flex items-center gap-1 bg-fg-blue-lt text-fg-blue px-3 py-1.5 rounded-xl font-bold text-xs cursor-pointer border-none hover:bg-fg-blue/10 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Photo Row
            </button>
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto pr-1 no-scrollbar">
            {images.map((img, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={img.url}
                  onChange={(e) => handleImageRowChange(i, 'url', e.target.value)}
                  placeholder="Image URL (e.g. /images/atrium-interior.jpg)"
                  className="flex-1 px-3 py-2 rounded-xl border border-gray-200 font-sans text-xs outline-none focus:border-fg-blue"
                />
                <input
                  type="text"
                  value={img.alt}
                  onChange={(e) => handleImageRowChange(i, 'alt', e.target.value)}
                  placeholder="Alt text"
                  className="w-1/3 px-3 py-2 rounded-xl border border-gray-200 font-sans text-xs outline-none focus:border-fg-blue"
                />
                <button
                  type="button"
                  onClick={() => removeImageRow(i)}
                  disabled={images.length === 1}
                  className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-gray-50 disabled:opacity-30 cursor-pointer bg-transparent border-none"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* FORM SUBMIT BAR */}
      <div className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl p-4 md:px-8 shadow-sm">
        <div className="font-mono text-xs text-gray-500">
          {coverImage ? '✓ Cover photo attached' : '⚠️ Cover image recommended'}
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-fg-blue text-white rounded-full px-10 py-3.5 font-sans font-bold text-sm shadow-md hover:shadow-lg hover:bg-fg-blue/90 transition-all duration-300 cursor-pointer border-none outline-none disabled:opacity-50 flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Saving Showcase Project...
            </>
          ) : (
            'Save Showcase Project'
          )}
        </button>
      </div>

      {/* Media Gallery Modal Instance */}
      <MediaGalleryModal
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        onSelect={handleCoverSelectFromGallery}
        aspectRatio={targetCropAspect}
        title="Select &amp; Crop Showcase Image"
      />

    </form>
  )
})
