'use client'

import { useState } from 'react'
import { Plus, Trash2, HelpCircle } from 'lucide-react'
import View360Uploader from './View360Uploader'

export default function ProductForm({ product = null, onSubmit, isLoading = false }) {
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
  const [defaultColor, setDefaultColor] = useState(product?.defaultColor || '')
  const [defaultFinish, setDefaultFinish] = useState(product?.defaultFinish || '')

  // Dynamic lists
  const [specifications, setSpecifications] = useState(product?.specifications || [{ key: '', value: '' }])
  const [features, setFeatures] = useState(product?.features || [])
  const [featureInput, setFeatureInput] = useState('')
  
  // Selected applications checkbox list
  const [applications, setApplications] = useState(product?.applications || ['Residential'])
  const availableApps = ['Residential', 'Commercial', 'Industrial', 'Hospital', 'Hospitality', 'Luxury']

  // Image list (dynamic URLs)
  const [images, setImages] = useState(product?.images || [{ url: '', alt: '' }])

  // Color & Finish variants list (dynamic)
  const [colorVariants, setColorVariants] = useState(product?.colorVariants || [
    { name: 'Champagne Gold', hex: '#C9A84C', isActive: true, panoramaImages: {} }
  ])
  const [finishVariants, setFinishVariants] = useState(product?.finishVariants || [
    { name: 'Mirror Finish', isActive: true },
    { name: 'Hairline Finish', isActive: true }
  ])

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
    setColorVariants([...colorVariants, { name: '', hex: '#888888', isActive: true, panoramaImages: {} }])
  }
  const removeColorVariant = (idx) => setColorVariants(colorVariants.filter((_, i) => i !== idx))
  const handleColorChange = (idx, field, val) => {
    const list = [...colorVariants]
    list[idx][field] = val
    setColorVariants(list)
  }
  const handleColorUploaderChange = (idx, updatedVal) => {
    const list = [...colorVariants]
    list[idx] = updatedVal
    setColorVariants(list)
  }

  // Finish variants list helpers
  const addFinishVariant = () => {
    setFinishVariants([...finishVariants, { name: '', isActive: true }])
  }
  const removeFinishVariant = (idx) => setFinishVariants(finishVariants.filter((_, i) => i !== idx))
  const handleFinishChange = (idx, field, val) => {
    const list = [...finishVariants]
    list[idx][field] = val
    setFinishVariants(list)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate empty/dirty entries before saving
    const cleanSpecs = specifications.filter(s => s.key.trim() && s.value.trim())
    const cleanImages = images.filter(img => img.url.trim())
    const cleanColors = colorVariants.filter(c => c.name.trim())
    const cleanFinishes = finishVariants.filter(f => f.name.trim())

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
      defaultColor,
      defaultFinish,
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
    { id: 'basic', label: 'Basic Info' },
    { id: 'specs', label: 'Specifications' },
    { id: 'features', label: 'Features & Apps' },
    { id: 'images', label: 'Images' },
    { id: 'configurator', label: '360° Configurator' }
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
      
      {/* Form Tabs Nav */}
      <div className="flex border-b border-gray-200 gap-6">
        {tabs.map(t => {
          if (t.id === 'configurator' && !has360View) return null
          const active = activeTab === t.id
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`pb-3 font-sans font-semibold text-xs uppercase tracking-wider cursor-pointer bg-transparent border-none outline-none select-none ${
                active ? 'text-fg-blue border-b-2 border-fg-blue' : 'text-gray-400 hover:text-gray-700'
              }`}
            >
              {t.label}
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
              <span className="font-sans font-semibold text-sm text-gray-800">Public Photo Gallery Slideshow</span>
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
                    placeholder="Image URL (e.g. /images/products/gold.jpg)"
                    required
                    className="flex-1 px-3.5 py-2 rounded-xl border border-gray-200 bg-white font-sans text-xs outline-none focus:border-fg-blue"
                  />
                  <input
                    type="text"
                    value={img.alt}
                    onChange={(e) => handleImageChange(i, 'alt', e.target.value)}
                    placeholder="Alt Description Text"
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
        </div>
      )}

      {/* Tab 5: 360 Configurator */}
      {activeTab === 'configurator' && has360View && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">Default Color Name</label>
              <input
                type="text"
                value={defaultColor}
                onChange={(e) => setDefaultColor(e.target.value)}
                placeholder="e.g. Champagne Gold"
                className="px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white font-sans text-sm text-gray-900 outline-none focus:border-fg-blue w-full"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">Default Material Finish</label>
              <input
                type="text"
                value={defaultFinish}
                onChange={(e) => setDefaultFinish(e.target.value)}
                placeholder="e.g. Mirror Finish"
                className="px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white font-sans text-sm text-gray-900 outline-none focus:border-fg-blue w-full"
              />
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

                  {/* 360 view coordinates uploader panel */}
                  <View360Uploader
                    variant={c}
                    onChange={(updated) => handleColorUploaderChange(i, updated)}
                  />
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

            <div className="space-y-3">
              {finishVariants.map((f, i) => (
                <div key={i} className="flex gap-3 items-center">
                  <input
                    type="text"
                    value={f.name}
                    onChange={(e) => handleFinishChange(i, 'name', e.target.value)}
                    placeholder="Texture Finish Name (e.g. Mirror Finish)"
                    required
                    className="flex-1 px-3.5 py-2 rounded-xl border border-gray-200 bg-white font-sans text-xs outline-none focus:border-fg-blue"
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
                  <button
                    type="button"
                    onClick={() => removeFinishVariant(i)}
                    disabled={finishVariants.length === 1}
                    className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-gray-50 disabled:opacity-40 cursor-pointer bg-transparent border-none"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Form Submission Button */}
      <div className="flex justify-end gap-3 select-none">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-fg-blue text-white rounded-full px-8 py-3 font-sans font-bold text-sm no-underline shadow-sm hover:shadow-md hover:bg-fg-blue/90 transition-all duration-300 cursor-pointer border-none outline-none disabled:opacity-50 flex items-center gap-2"
        >
          {isLoading ? 'Saving Changes...' : 'Save Product Listing'}
        </button>
      </div>

    </form>
  )
}
