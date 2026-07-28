'use client'

import { useState, useCallback, memo } from 'react'
import Link from 'next/link'
import { Plus, Trash2, HelpCircle, UploadCloud, Image as ImageIcon, Sliders, Sparkles, Box, Info, Search } from 'lucide-react'
import View360Uploader from './View360Uploader'
import MediaGalleryModal from './MediaGalleryModal'
import { compressImage } from '@/utils/image'

export default memo(function ProductForm({ product = null, onSubmit, isLoading = false }) {
  const [activeTab, setActiveTab] = useState('basic')
  
  // Basic states
  const [name, setName] = useState(product?.name || '')
  const [slug, setSlug] = useState(product?.slug || '')
  const [tagline, setTagline] = useState(product?.tagline || '')
  const [category, setCategory] = useState(product?.category || 'Passenger')
  const [subCategory, setSubCategory] = useState(product?.subCategory || '')
  const [tabGroup, setTabGroup] = useState(product?.tabGroup || 'Systems')
  const [description, setDescription] = useState(product?.description || '')
  const [isFeatured, setIsFeatured] = useState(!!product?.isFeatured)
  const [isActive, setIsActive] = useState(product ? !!product.isActive : true)
  const [badge, setBadge] = useState(product?.badge || '')
  const [sortOrder, setSortOrder] = useState(product?.sortOrder || 0)
  const [brochureUrl, setBrochureUrl] = useState(product?.brochureUrl || '')
  const [has360View, setHas360View] = useState(!!product?.has360View)
  const [defaultColor, setDefaultColor] = useState(() => {
    if (product?.defaultColor) return product.defaultColor
    const initialColors = product?.colorVariants || [
      { name: 'Champagne Gold', hex: '#C9A84C', isActive: true, panoramaImages: {}, finishTextures: [] }
    ]
    return initialColors.find(c => c.isActive)?.name || initialColors[0]?.name || ''
  })
  const [metaTitle, setMetaTitle] = useState(product?.metaTitle || '')
  const [metaDescription, setMetaDescription] = useState(product?.metaDescription || '')
  const [metaKeywords, setMetaKeywords] = useState(product?.metaKeywords || '')
  const [defaultFinish, setDefaultFinish] = useState(() => {
    if (product?.defaultFinish) return product.defaultFinish
    const initialFinishes = product?.finishVariants || [
      { name: 'Mirror Finish', description: 'Highly reflective mirror-like polished stainless steel surface', isActive: true },
      { name: 'Hairline Finish', description: 'Elegant brushed texture finish with fine linear scratch patterns', isActive: true }
    ]
    return initialFinishes.find(f => f.isActive)?.name || initialFinishes[0]?.name || ''
  })

  // Dynamic lists
  const [specifications, setSpecifications] = useState(product?.specifications || [{ key: '', value: '' }])
  const [features, setFeatures] = useState(product?.features || [])
  const [featureInput, setFeatureInput] = useState('')
  
  // Selected applications checkbox list
  const [applications, setApplications] = useState(product?.applications || ['Residential'])
  const availableApps = ['Residential', 'Commercial', 'Industrial', 'Hospital', 'Hospitality', 'Luxury']

  // Image list (dynamic URLs & gallery picker state)
  const [images, setImages] = useState(product?.images || [{ url: '', alt: '' }])
  const [activeGalleryImageIndex, setActiveGalleryImageIndex] = useState(null)

  // Color & Finish variants list (dynamic)
  const [colorVariants, setColorVariants] = useState(product?.colorVariants || [
    { name: 'Champagne Gold', hex: '#C9A84C', isActive: true, panoramaImages: {}, finishTextures: [] }
  ])
  const [finishVariants, setFinishVariants] = useState(product?.finishVariants || [
    { name: 'Mirror Finish', description: 'Highly reflective mirror-like polished stainless steel surface', isActive: true },
    { name: 'Hairline Finish', description: 'Elegant brushed texture finish with fine linear scratch patterns', isActive: true }
  ])
  const [selectedFinishForColor, setSelectedFinishForColor] = useState({})

  // Auto-generate slug from name if name shifts and slug matches original name conversion
  const handleNameChange = (val) => {
    setName(val)
    if (!product) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''))
    }
  }

  // Specifications helpers
  const addSpec = () => setSpecifications([...specifications, { key: '', value: '' }])
  const removeSpec = (idx) => setSpecifications(specifications.filter((_, i) => i !== idx))
  const handleSpecChange = (idx, field, val) => {
    const list = [...specifications]
    list[idx][field] = val
    setSpecifications(list)
  }

  // Features tags helpers
  const handleFeatureKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const val = featureInput.trim()
      if (val && !features.includes(val)) {
        setFeatures([...features, val])
        setFeatureInput('')
      }
    }
  }
  const removeFeature = (idx) => setFeatures(features.filter((_, i) => i !== idx))

  // Applications checks helpers
  const handleAppToggle = (app) => {
    if (applications.includes(app)) {
      setApplications(applications.filter(a => a !== app))
    } else {
      setApplications([...applications, app])
    }
  }

  // Images list helpers
  const addImage = () => setImages([...images, { url: '', alt: '' }])
  const removeImage = (idx) => setImages(images.filter((_, i) => i !== idx))
  const handleImageChange = (idx, field, val) => {
    const list = [...images]
    list[idx][field] = val
    setImages(list)
  }

  // Color variants list helpers
  const addColorVariant = () => {
    setColorVariants([...colorVariants, { name: '', hex: '#888888', isActive: true, panoramaImages: {}, finishTextures: [] }])
  }
  const removeColorVariant = (idx) => {
    const deletedColor = colorVariants[idx]
    const remaining = colorVariants.filter((_, i) => i !== idx)
    setColorVariants(remaining)

    if (defaultColor === deletedColor.name) {
      const nextDefault = remaining.find(c => c.isActive)?.name || remaining[0]?.name || ''
      setDefaultColor(nextDefault)
    }
  }
  const handleColorChange = (idx, field, val) => {
    const list = [...colorVariants]
    const oldName = list[idx].name
    list[idx][field] = val
    setColorVariants(list)

    if (field === 'name' && defaultColor === oldName) {
      setDefaultColor(val)
    }
    if (field === 'isActive' && !val && defaultColor === oldName) {
      const nextDefault = list.find(c => c.isActive && c.name !== oldName)?.name || list.find(c => c.name !== oldName)?.name || ''
      setDefaultColor(nextDefault)
    }
  }
  const handleColorUploaderChangeWithFinish = (colorIdx, updatedVirtual) => {
    const selectedFinish = selectedFinishForColor[colorIdx] || 'default'
    const list = [...colorVariants]
    const c = list[colorIdx]

    if (selectedFinish === 'default') {
      c.panoramaImages = updatedVirtual.panoramaImages
    } else {
      if (!c.finishTextures) c.finishTextures = []
      const index = c.finishTextures.findIndex(ft => ft.finishName === selectedFinish)
      if (index > -1) {
        c.finishTextures[index] = {
          finishName: selectedFinish,
          panoramaImages: updatedVirtual.panoramaImages
        }
      } else {
        c.finishTextures.push({
          finishName: selectedFinish,
          panoramaImages: updatedVirtual.panoramaImages
        })
      }
    }
    setColorVariants(list)
  }

  // Finish variants list helpers
  const addFinishVariant = () => {
    setFinishVariants([...finishVariants, { name: '', description: '', isActive: true }])
  }
  const removeFinishVariant = (idx) => {
    const deletedFinish = finishVariants[idx]
    const remaining = finishVariants.filter((_, i) => i !== idx)
    setFinishVariants(remaining)

    if (defaultFinish === deletedFinish.name) {
      const nextDefault = remaining.find(f => f.isActive)?.name || remaining[0]?.name || ''
      setDefaultFinish(nextDefault)
    }
  }
  const handleFinishChange = (idx, field, val) => {
    const list = [...finishVariants]
    const oldName = list[idx].name
    list[idx][field] = val
    setFinishVariants(list)

    if (field === 'name' && defaultFinish === oldName) {
      setDefaultFinish(val)
    }
    if (field === 'isActive' && !val && defaultFinish === oldName) {
      const nextDefault = list.find(f => f.isActive && f.name !== oldName)?.name || list.find(f => f.name !== oldName)?.name || ''
      setDefaultFinish(nextDefault)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate empty/dirty entries before saving
    const cleanSpecs = specifications.filter(s => s.key.trim() && s.value.trim())
    const cleanImages = images.filter(img => img.url.trim())
    const cleanColors = colorVariants.filter(c => c.name.trim())
    const cleanFinishes = finishVariants.filter(f => f.name.trim())

    // Ensure defaultColor is set to one of the clean colors
    let finalDefaultColor = defaultColor
    if (cleanColors.length > 0 && !cleanColors.some(c => c.name === finalDefaultColor)) {
      finalDefaultColor = cleanColors.find(c => c.isActive)?.name || cleanColors[0]?.name || ''
    }

    // Ensure defaultFinish is set to one of the clean finishes
    let finalDefaultFinish = defaultFinish
    if (cleanFinishes.length > 0 && !cleanFinishes.some(f => f.name === finalDefaultFinish)) {
      finalDefaultFinish = cleanFinishes.find(f => f.isActive)?.name || cleanFinishes[0]?.name || ''
    }

    const payload = {
      name,
      slug: slug.toLowerCase(),
      tagline,
      category,
      subCategory,
      tabGroup,
      description,
      isFeatured,
      isActive,
      badge,
      sortOrder: Number(sortOrder) || 0,
      brochureUrl,
      has360View,
      defaultColor: finalDefaultColor,
      defaultFinish: finalDefaultFinish,
      metaTitle,
      metaDescription,
      metaKeywords,
      specifications: cleanSpecs,
      features,
      applications,
      images: cleanImages,
      colorVariants: cleanColors,
      finishVariants: cleanFinishes
    }

    onSubmit(payload)
  }

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: Info, description: 'Core details' },
    { id: 'specs', label: 'Specs', icon: Sliders, description: 'Specifications' },
    { id: 'features', label: 'Features & Apps', icon: Sparkles, description: 'Highlights' },
    { id: 'images', label: 'Images', icon: ImageIcon, description: 'Visual assets' },
    { id: 'seo', label: 'SEO Settings', icon: Search, description: 'Metadata tuning' },
    { id: 'configurator', label: '360° Config', icon: Box, description: '3D textures' }
  ]

  const handleFormKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
      e.preventDefault()
    }
  }

  return (
    <form onSubmit={handleSubmit} onKeyDown={handleFormKeyDown} className="space-y-6 max-w-4xl mx-auto">
      
      {/* Form Tabs Nav */}
      <div className="flex flex-wrap gap-2 bg-gray-50/50 p-2 rounded-2xl border border-gray-200/65 mb-8 select-none">
        {tabs.map(t => {
          if (t.id === 'configurator' && !has360View) return null
          const active = activeTab === t.id
          const IconComp = t.icon
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`flex-1 min-w-[130px] flex items-center gap-2.5 px-3 py-2 rounded-xl text-left cursor-pointer border-none outline-none select-none transition-all duration-300 ${
                active 
                  ? 'bg-white text-[#0E4FB3] shadow-xs ring-1 ring-black/5' 
                  : 'bg-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-100/50'
              }`}
            >
              <div className={`p-1.5 rounded-lg flex items-center justify-center transition-colors duration-300 shrink-0 ${
                active ? 'bg-[#0E4FB3]/10 text-[#0E4FB3]' : 'bg-gray-200/50 text-gray-400'
              }`}>
                <IconComp className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-sans font-bold text-[11px] uppercase tracking-wider block truncate">
                  {t.label}
                </span>
                <span className="font-sans text-[8px] text-gray-400 font-normal block truncate mt-0.5">
                  {t.description}
                </span>
              </div>
            </button>
          )
        })}
      </div>

      {/* Tab 1: Basic Info */}
      {activeTab === 'basic' && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">Product Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. AeroLux Premium Capsule Lift"
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
                placeholder="e.g. aerolux-premium-capsule"
                required
                className="px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white font-sans text-sm text-gray-900 outline-none focus:border-fg-blue w-full"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">Tagline</label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="e.g. Panoramic vision meets state-of-the-art vertical mobility."
              className="px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white font-sans text-sm text-gray-900 outline-none focus:border-fg-blue w-full"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white font-sans text-sm outline-none focus:border-fg-blue w-full"
              >
                {['Passenger', 'Goods', 'Capsule', 'Home', 'Hospital', 'Panoramic'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">Sub Category</label>
              <input
                type="text"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                placeholder="e.g. Observation Lifts"
                className="px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white font-sans text-sm text-gray-900 outline-none focus:border-fg-blue w-full"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">Tab Group Grouping</label>
              <select
                value={tabGroup}
                onChange={(e) => setTabGroup(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white font-sans text-sm outline-none focus:border-fg-blue w-full"
              >
                {['Systems', 'Cabins', 'Components'].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a detailed description of this mobility solution..."
              rows={4}
              className="px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white font-sans text-sm text-gray-900 outline-none focus:border-fg-blue w-full resize-y"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">Badge Overlay</label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="e.g. 360° View / NEW"
                className="px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white font-sans text-sm text-gray-900 outline-none focus:border-fg-blue w-full"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">Sort Priority Order</label>
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
                Featured
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
      )}

      {/* Tab 2: Specifications */}
      {activeTab === 'specs' && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <span className="font-sans font-semibold text-sm text-gray-800">Dynamic Specifications Grid</span>
            <button
              type="button"
              onClick={addSpec}
              className="inline-flex items-center gap-1 bg-fg-blue-lt text-fg-blue px-3 py-1.5 rounded-lg font-bold text-xs cursor-pointer border-none hover:bg-fg-blue/10 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Metric Row
            </button>
          </div>

          <div className="space-y-3">
            {specifications.map((spec, i) => (
              <div key={i} className="flex gap-3 items-center">
                <input
                  type="text"
                  value={spec.key}
                  onChange={(e) => handleSpecChange(i, 'key', e.target.value)}
                  placeholder="Key (e.g. Capacity)"
                  className="flex-1 px-3.5 py-2 rounded-xl border border-gray-200 bg-white font-sans text-xs outline-none focus:border-fg-blue"
                />
                <input
                  type="text"
                  value={spec.value}
                  onChange={(e) => handleSpecChange(i, 'value', e.target.value)}
                  placeholder="Value (e.g. 800 kg - 1600 kg)"
                  className="flex-1 px-3.5 py-2 rounded-xl border border-gray-200 bg-white font-sans text-xs outline-none focus:border-fg-blue"
                />
                <button
                  type="button"
                  onClick={() => removeSpec(i)}
                  disabled={specifications.length === 1}
                  className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-gray-50 disabled:opacity-40 cursor-pointer bg-transparent border-none"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Features & Applications */}
      {activeTab === 'features' && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-6">
          {/* Tag-style features */}
          <div className="flex flex-col gap-2">
            <label className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">
              Engineering Features list (Press Enter to log tag)
            </label>
            <input
              type="text"
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              onKeyDown={handleFeatureKeyDown}
              placeholder="e.g. VVVF digital controller"
              className="px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white font-sans text-sm text-gray-900 outline-none focus:border-fg-blue w-full"
            />
            {features.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {features.map((feat, idx) => (
                  <span
                    key={feat}
                    className="inline-flex items-center gap-1.5 font-mono text-[10px] text-fg-body bg-fg-cream-alt px-3 py-1.5 rounded-full border border-fg-border"
                  >
                    {feat}
                    <button
                      type="button"
                      onClick={() => removeFeature(idx)}
                      className="text-gray-400 hover:text-gray-600 font-sans font-semibold cursor-pointer border-none bg-transparent p-0"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Applications list checkbox group */}
          <div className="flex flex-col gap-2">
            <label className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold mb-1">
              Ideal Target Applications
            </label>
            <div className="grid grid-cols-3 gap-3">
              {availableApps.map((app) => {
                const checked = applications.includes(app)
                return (
                  <label
                    key={app}
                    className={`flex items-center gap-2 px-3 py-2 border rounded-xl cursor-pointer font-sans text-xs font-semibold transition-colors duration-200 ${
                      checked
                        ? 'border-fg-blue bg-blue-50/50 text-fg-blue'
                        : 'border-gray-200 bg-transparent text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleAppToggle(app)}
                      className="rounded border-gray-300 text-fg-blue focus:ring-fg-blue"
                    />
                    {app}
                  </label>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Images */}
      {activeTab === 'images' && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-6">
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">Technical Brochure URL</label>
            <input
              type="text"
              value={brochureUrl}
              onChange={(e) => setBrochureUrl(e.target.value)}
              placeholder="e.g. /brochures/aerolux-spec.pdf"
              className="px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white font-sans text-sm text-gray-900 outline-none focus:border-fg-blue w-full"
            />
          </div>

          {/* 360 viewer trigger */}
          <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="font-sans font-bold text-xs text-blue-900 block">360° Cabin Customizer</span>
              <span className="font-sans text-[11px] text-blue-700 block">Enable 3D WebGL configurator model for this system</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={has360View}
                onChange={(e) => setHas360View(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-fg-blue" />
            </label>
          </div>

          {/* Product photos slideshow list */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="font-sans font-bold text-xs uppercase tracking-wider text-gray-700">Public Photo Gallery Slideshow</span>
              <button
                type="button"
                onClick={addImage}
                className="inline-flex items-center gap-1 bg-[#0E4FB3]/10 text-[#0E4FB3] px-3.5 py-1.5 rounded-lg font-bold text-xs cursor-pointer border-none hover:bg-[#0E4FB3]/20 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Image Row
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {images.map((img, i) => (
                <div key={i} className="border border-gray-200 rounded-2xl p-4 bg-gray-50/50 flex flex-col gap-3 relative group">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">Image Card #{i + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      disabled={images.length === 1}
                      className="p-1 rounded text-gray-400 hover:text-red-600 disabled:opacity-40 cursor-pointer bg-transparent border-none"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Dropzone Card */}
                  <div
                    onDragOver={(e) => { e.preventDefault(); e.stopPropagation() }}
                    onDrop={(e) => {
                      e.preventDefault(); e.stopPropagation()
                      const files = e.dataTransfer.files
                      if (files && files.length > 0) {
                        const file = files[0]
                        const reader = new FileReader()
                        reader.onload = async (evt) => {
                          const rawData = evt.target.result
                          const compressed = await compressImage(rawData, 1200, 0.7)
                          handleImageChange(i, 'url', compressed)
                        }
                        reader.readAsDataURL(file)
                      }
                    }}
                    onClick={() => setActiveGalleryImageIndex(i)}
                    className="relative w-full aspect-video rounded-xl border-2 border-dashed border-gray-200 hover:border-[#0E4FB3] bg-white overflow-hidden flex flex-col items-center justify-center cursor-pointer transition-all group/preview"
                  >
                    {img.url ? (
                      <div className="relative w-full h-full">
                        <img src={img.url} alt={img.alt || `Photo ${i + 1}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center text-white font-sans text-xs font-bold gap-2">
                          <ImageIcon className="w-4 h-4" />
                          Change from Gallery
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-1.5 text-center p-3">
                        <UploadCloud className="w-7 h-7 text-gray-400 group-hover/preview:text-[#0E4FB3] transition-colors" />
                        <span className="font-sans text-xs font-bold text-gray-700">Click or drop to upload</span>
                        <span className="font-mono text-[9px] text-[#0E4FB3] uppercase font-bold">Pick from Media Gallery</span>
                      </div>
                    )}
                  </div>

                  {/* URL Input & Alt text */}
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={img.url}
                      onChange={(e) => handleImageChange(i, 'url', e.target.value)}
                      placeholder="Or enter Image URL (e.g. /images/hero-bg.jpg)"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 bg-white font-mono text-xs outline-none focus:border-[#0E4FB3]"
                    />
                    <input
                      type="text"
                      value={img.alt}
                      onChange={(e) => handleImageChange(i, 'alt', e.target.value)}
                      placeholder="Alt Description Text (e.g. Front View)"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 bg-white font-sans text-xs outline-none focus:border-[#0E4FB3]"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Media Gallery Modal for IMAGES tab */}
            <MediaGalleryModal
              isOpen={activeGalleryImageIndex !== null}
              onClose={() => setActiveGalleryImageIndex(null)}
              title={`Select Photo for Image #${(activeGalleryImageIndex ?? 0) + 1}`}
              onSelect={(url) => {
                if (activeGalleryImageIndex !== null) {
                  handleImageChange(activeGalleryImageIndex, 'url', url)
                }
              }}
            />
          </div>
        </div>
      )}
      {/* Tab: SEO Settings */}
      {activeTab === 'seo' && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-6">
          <div className="border-b border-gray-150 pb-3 flex items-center gap-2">
            <Search className="w-4 h-4 text-[#0E4FB3]" />
            <span className="font-sans font-bold text-xs uppercase tracking-wider text-gray-700">Search Engine Optimization (SEO)</span>
          </div>

          <p className="text-xs text-gray-500 font-sans leading-relaxed">
            Fine-tune search engine indexability and visibility. Providing custom values will override the automatically generated metadata for this product page.
          </p>

          <div className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">Meta Title Tag</label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="e.g. AeroLux Luxury Elevator | High-Speed Traction Passenger Lifts"
                className="px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white font-sans text-sm text-gray-900 outline-none focus:border-fg-blue w-full"
              />
              <span className="font-sans text-[10px] text-gray-400">
                Recommended length: 50-60 characters. Current: {metaTitle.length} characters.
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">Meta Description</label>
              <textarea
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="e.g. Discover AeroLux, our premier high-speed traction elevator engineered for elite luxury residential and corporate skyscrapers. Custom 3D finishes available."
                rows={3}
                className="px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white font-sans text-sm text-gray-900 outline-none focus:border-fg-blue w-full resize-y"
              />
              <span className="font-sans text-[10px] text-gray-400">
                Recommended length: 150-160 characters. Current: {metaDescription.length} characters.
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">Meta Keywords</label>
              <input
                type="text"
                value={metaKeywords}
                onChange={(e) => setMetaKeywords(e.target.value)}
                placeholder="e.g. luxury elevators, capsule lift, passenger lift manufacturer, commercial traction lift"
                className="px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white font-sans text-sm text-gray-900 outline-none focus:border-fg-blue w-full"
              />
              <span className="font-sans text-[10px] text-gray-400">
                Comma-separated list of primary search keywords.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: 360 Configurator */}
      {activeTab === 'configurator' && has360View && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">Default Color Name</label>
              <select
                value={defaultColor}
                onChange={(e) => setDefaultColor(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white font-sans text-sm text-gray-900 outline-none focus:border-fg-blue w-full cursor-pointer"
              >
                <option value="">Select Default Color</option>
                {colorVariants.filter(c => c.name.trim()).map((c, idx) => (
                  <option key={idx} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">Default Material Finish</label>
              <select
                value={defaultFinish}
                onChange={(e) => setDefaultFinish(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white font-sans text-sm text-gray-900 outline-none focus:border-fg-blue w-full cursor-pointer"
              >
                <option value="">Select Default Finish</option>
                {finishVariants.filter(f => f.name.trim()).map((f, idx) => (
                  <option key={idx} value={f.name}>{f.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Color variants list */}
          <div className="space-y-4 border-t border-gray-100 pt-6">
            <div className="flex items-center justify-between">
              <span className="font-sans font-bold text-xs uppercase tracking-wider text-gray-700">Configurator Color Finishes</span>
              <button
                type="button"
                onClick={addColorVariant}
                className="inline-flex items-center gap-1 bg-fg-blue-lt text-fg-blue px-3 py-1.5 rounded-lg font-bold text-xs cursor-pointer border-none hover:bg-fg-blue/10 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Finish Color
              </button>
            </div>

            <div className="space-y-6">
              {colorVariants.map((c, i) => (
                <div key={i} className="border border-gray-200 rounded-xl p-4 bg-gray-50/50 space-y-4">
                  <div className="flex gap-4 items-center">
                    <div className="flex flex-col gap-1 flex-1">
                      <input
                        type="text"
                        value={c.name}
                        onChange={(e) => handleColorChange(i, 'name', e.target.value)}
                        placeholder="Finish Color Name (e.g. Champagne Gold)"
                        required
                        className="px-3.5 py-2 rounded-lg border border-gray-200 bg-white font-sans text-xs outline-none focus:border-fg-blue"
                      />
                    </div>
                    <div className="flex flex-col gap-1 w-28">
                      <input
                        type="color"
                        value={c.hex || '#888888'}
                        onChange={(e) => handleColorChange(i, 'hex', e.target.value)}
                        className="h-8 rounded-lg border border-gray-200 bg-white outline-none focus:border-fg-blue w-full cursor-pointer p-0"
                      />
                    </div>
                    <div className="flex items-center gap-2 select-none">
                      <input
                        type="checkbox"
                        checked={!!c.isActive}
                        onChange={(e) => handleColorChange(i, 'isActive', e.target.checked)}
                        className="rounded border-gray-300 text-fg-blue focus:ring-fg-blue"
                      />
                      <span className="font-sans text-xs font-semibold text-gray-500">Active</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeColorVariant(i)}
                      disabled={colorVariants.length === 1}
                      className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-gray-50 disabled:opacity-40 cursor-pointer bg-transparent border-none"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </button>
                  </div>

                  {/* Select Finish to upload textures for */}
                  <div className="flex items-center gap-2.5 pb-2 pt-1 border-t border-gray-200/60">
                    <span className="font-sans text-xs font-bold text-gray-600 font-mono tracking-wider uppercase text-[10px]">Upload Textures for:</span>
                    <select
                      value={(() => {
                        const activeOptions = finishVariants.filter(f => f.name.trim() && f.isActive)
                        const selFinish = selectedFinishForColor[i] || 'default'
                        const isSelFinishValid = selFinish === 'default' || activeOptions.some(f => f.name === selFinish)
                        return isSelFinishValid ? selFinish : 'default'
                      })()}
                      onChange={(e) => {
                        setSelectedFinishForColor(prev => ({
                          ...prev,
                          [i]: e.target.value
                        }))
                      }}
                      className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white font-sans text-xs font-semibold outline-none focus:border-fg-blue text-gray-700 cursor-pointer"
                    >
                      <option value="default">Default / Base Color</option>
                      {finishVariants.filter(f => f.name.trim() && f.isActive).map(f => (
                        <option key={f.name} value={f.name}>{f.name}</option>
                      ))}
                    </select>
                  </div>

                  {(() => {
                    const activeOptions = finishVariants.filter(f => f.name.trim() && f.isActive)
                    const selFinish = selectedFinishForColor[i] || 'default'
                    const isSelFinishValid = selFinish === 'default' || activeOptions.some(f => f.name === selFinish)
                    const currentFinish = isSelFinishValid ? selFinish : 'default'

                    let virtualVariant = c
                    if (currentFinish !== 'default') {
                      const finishTex = (c.finishTextures || []).find(ft => ft.finishName === currentFinish) || {
                        finishName: currentFinish,
                        panoramaImages: {}
                      }
                      virtualVariant = {
                        name: `${c.name} (${currentFinish})`,
                        panoramaImages: finishTex.panoramaImages
                      }
                    }
                    return (
                      <View360Uploader
                        key={`${i}-${currentFinish}`}
                        variant={virtualVariant}
                        onChange={(updatedVirtual) => handleColorUploaderChangeWithFinish(i, updatedVirtual)}
                      />
                    )
                  })()}
                </div>
              ))}
            </div>
          </div>

          {/* Finish variants list */}
          <div className="space-y-4 border-t border-gray-100 pt-6">
            <div className="flex items-center justify-between">
              <span className="font-sans font-bold text-xs uppercase tracking-wider text-gray-700">Material Texture Variants</span>
              <button
                type="button"
                onClick={addFinishVariant}
                className="inline-flex items-center gap-1 bg-fg-blue-lt text-fg-blue px-3 py-1.5 rounded-lg font-bold text-xs cursor-pointer border-none hover:bg-fg-blue/10 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Texture
              </button>
            </div>

            <div className="space-y-4">
              {finishVariants.map((f, i) => (
                <div key={i} className="border border-gray-200/80 rounded-xl p-4 bg-gray-50/30 space-y-3">
                  <div className="flex gap-3 items-center">
                    <input
                      type="text"
                      value={f.name}
                      onChange={(e) => handleFinishChange(i, 'name', e.target.value)}
                      placeholder="Texture Finish Name (e.g. Mirror Finish)"
                      required
                      className="flex-1 px-3.5 py-2 rounded-lg border border-gray-200 bg-white font-sans text-xs outline-none focus:border-fg-blue"
                    />
                    <div className="flex items-center gap-2 select-none">
                      <input
                        type="checkbox"
                        checked={!!f.isActive}
                        onChange={(e) => handleFinishChange(i, 'isActive', e.target.checked)}
                        className="rounded border-gray-300 text-fg-blue focus:ring-fg-blue"
                      />
                      <span className="font-sans text-xs font-semibold text-gray-500">Active</span>
                    </div>
                    <div className="flex items-center gap-2 select-none">
                      <input
                        type="radio"
                        name="defaultFinishRadio"
                        checked={defaultFinish === f.name}
                        onChange={() => {
                          if (f.name.trim()) {
                            setDefaultFinish(f.name)
                            if (!f.isActive) {
                              handleFinishChange(i, 'isActive', true)
                            }
                          }
                        }}
                        className="w-4 h-4 rounded-full border-gray-300 text-fg-blue focus:ring-fg-blue cursor-pointer"
                      />
                      <span className="font-sans text-xs font-semibold text-gray-500">Default</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFinishVariant(i)}
                      disabled={finishVariants.length === 1}
                      className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-gray-50 disabled:opacity-40 cursor-pointer bg-transparent border-none"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-col gap-1">
                    <input
                      type="text"
                      value={f.description || ''}
                      onChange={(e) => handleFinishChange(i, 'description', e.target.value)}
                      placeholder="Finish Description (e.g. Elegant brushed texture finish)"
                      className="px-3.5 py-2 rounded-lg border border-gray-200 bg-white font-sans text-xs outline-none focus:border-fg-blue w-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Bar */}
      <div className="fixed bottom-6 right-8 z-50 select-none">
        <div className="bg-white border border-gray-200/80 p-2.5 px-6 rounded-full shadow-2xl flex items-center gap-4">
          <Link
            href="/admin/products"
            className="font-mono text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-gray-900 px-4 py-2 rounded-full hover:bg-gray-100 transition-colors no-underline"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#E8600A] hover:bg-[#d55406] text-white rounded-full px-8 py-3 font-sans font-bold text-xs uppercase tracking-wider no-underline shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer border-none outline-none disabled:opacity-50 flex items-center gap-2"
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : null}
            {isLoading ? 'Saving...' : (product ? 'Update Product' : 'Publish Product')}
          </button>
        </div>
      </div>

    </form>
  )
})
