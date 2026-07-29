'use client'

import { useState, useEffect, memo } from 'react'
import Link from 'next/link'
import { Plus, Trash2, Sparkles, Image as ImageIcon, Wrench, Layers, Tag, Info, ArrowLeft, ArrowUpCircle, ArrowDownCircle, Gauge, Scale } from 'lucide-react'
import MediaGalleryModal from './MediaGalleryModal'

export default memo(function HomeLiftForm({ product = null, onSubmit, isLoading = false }) {
  const [name, setName] = useState(product?.name || '')
  const [slug, setSlug] = useState(product?.slug || '')
  const [tagline, setTagline] = useState(product?.tagline || '')
  const [description, setDescription] = useState(product?.description || '')
  const [subCategory, setSubCategory] = useState(product?.subCategory || 'Standard Cabin')
  const [sortOrder, setSortOrder] = useState(product?.sortOrder || 0)
  const [isActive, setIsActive] = useState(product?.isActive !== false)
  const [isFeatured, setIsFeatured] = useState(Boolean(product?.isFeatured))

  // System parameters
  const [driveType, setDriveType] = useState('')
  const [speed, setSpeed] = useState('')
  const [capacity, setCapacity] = useState('')
  const [minOverhead, setMinOverhead] = useState('')
  const [minPit, setMinPit] = useState('')
  const [travelHeight, setTravelHeight] = useState('')
  const [shaftOption, setShaftOption] = useState('')

  // Cabin parameters
  const [carDoor, setCarDoor] = useState('')
  const [frontWall, setFrontWall] = useState('')
  const [sideWalls, setSideWalls] = useState('')
  const [backWall, setBackWall] = useState('')
  const [handrail, setHandrail] = useState('')
  const [ceiling, setCeiling] = useState('')
  const [floor, setFloor] = useState('')

  // Features list
  const [features, setFeatures] = useState(product?.features || [])
  const [newFeature, setNewFeature] = useState('')

  // Images state
  const [images, setImages] = useState(product?.images || [])
  const [activeImagePicker, setActiveImagePicker] = useState(false)

  // Auto-generate slug from name in real-time
  useEffect(() => {
    if (!product && name) {
      setSlug(
        name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '')
      )
    }
  }, [name, product])

  // Populate dynamic specifications on mount/load
  useEffect(() => {
    if (product?.specifications) {
      const getVal = (key) => product.specifications.find(s => s.key === key)?.value || ''
      if (product.subCategory === 'Traction Technology') {
        setDriveType(getVal('Drive Type'))
        setSpeed(getVal('Speed'))
        setCapacity(getVal('Capacity'))
        setMinOverhead(getVal('Min. Overhead'))
        setMinPit(getVal('Min. Pit'))
        setTravelHeight(getVal('Travel Height'))
        setShaftOption(getVal('Shaft Option'))
      } else {
        setCarDoor(getVal('Car Door'))
        setFrontWall(getVal('Front Wall'))
        setSideWalls(getVal('Side Walls'))
        setBackWall(getVal('Back Wall') || getVal('Back/Side Walls') || getVal('Rear Wall'))
        setHandrail(getVal('Handrail'))
        setCeiling(getVal('Ceiling'))
        setFloor(getVal('Floor'))
      }
    }
  }, [product])

  // Add a feature bullet point
  const addFeature = () => {
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      setFeatures([...features, newFeature.trim()])
      setNewFeature('')
    }
  }

  // Remove a feature bullet point
  const removeFeature = (index) => {
    setFeatures(features.filter((_, idx) => idx !== index))
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()

    // Package specifications based on Subcategory
    let specs = []
    let tabGroup = 'Cabins'

    if (subCategory === 'Traction Technology') {
      tabGroup = 'Systems'
      specs = [
        { key: 'Drive Type', value: driveType },
        { key: 'Speed', value: speed },
        { key: 'Capacity', value: capacity },
        { key: 'Min. Overhead', value: minOverhead },
        { key: 'Min. Pit', value: minPit },
        { key: 'Travel Height', value: travelHeight },
        { key: 'Shaft Option', value: shaftOption }
      ].filter(s => s.value)
    } else if (subCategory === 'Art Background Wall') {
      tabGroup = 'Components'
      specs = []
    } else {
      tabGroup = 'Cabins'
      specs = [
        { key: 'Car Door', value: carDoor },
        { key: 'Front Wall', value: frontWall },
        { key: 'Side Walls', value: sideWalls },
        { key: 'Back Wall', value: backWall },
        { key: 'Handrail', value: handrail },
        { key: 'Ceiling', value: ceiling },
        { key: 'Floor', value: floor }
      ].filter(s => s.value)
    }

    const payload = {
      name,
      slug,
      tagline,
      category: 'Home Lift',
      subCategory,
      tabGroup,
      description,
      specifications: specs,
      features,
      images,
      sortOrder: Number(sortOrder),
      isActive,
      isFeatured
    }

    onSubmit(payload)
  }

  return (
    <form onSubmit={handleFormSubmit} className="max-w-4xl mx-auto space-y-8 select-none pb-24 font-sans">
      
      {/* 1. Basic Info Panel */}
      <div className="bg-gradient-to-br from-white to-neutral-50/30 border border-[#EDE8E2] rounded-2xl p-8 shadow-[0_4px_16px_rgba(0,0,0,0.015)] space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
          <span className="w-7 h-7 rounded-lg bg-[#E8600A]/10 text-[#E8600A] flex items-center justify-center font-mono text-xs font-bold">01</span>
          <h3 className="m-0 font-display text-sm font-bold uppercase tracking-wider text-gray-800">
            Basic Information
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1.5">
            <label className="font-sans text-xs font-bold text-gray-700 tracking-wide">Product Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. HC188 Luxury Cabin"
              className="w-full px-4 py-3 rounded-xl border border-[#EDE8E2] bg-neutral-50/50 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#E8600A] focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-200 text-sm font-medium"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-sans text-xs font-bold text-gray-700 tracking-wide">Slug (URL Identifier)</label>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. hc188-luxury-cabin"
              className="w-full px-4 py-3 rounded-xl border border-[#EDE8E2] bg-neutral-50/50 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#E8600A] focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-200 text-sm font-medium"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1.5">
            <label className="font-sans text-xs font-bold text-gray-700 tracking-wide">Home Lift Type</label>
            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#EDE8E2] bg-neutral-50/50 text-gray-900 focus:bg-white focus:border-[#E8600A] focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-200 text-sm font-medium cursor-pointer"
            >
              <option value="Traction Technology">Traction Technology (System)</option>
              <option value="Standard Cabin">Standard Cabin</option>
              <option value="More Cabin Options">More Cabin Option</option>
              <option value="Panoramic Cabin">Panoramic Cabin</option>
              <option value="Art Background Wall">Art Background Wall</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-sans text-xs font-bold text-gray-700 tracking-wide">Short Model Code / Tagline</label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="e.g. HCS501 or Short tag"
              className="w-full px-4 py-3 rounded-xl border border-[#EDE8E2] bg-neutral-50/50 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#E8600A] focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-200 text-sm font-medium"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-sans text-xs font-bold text-gray-700 tracking-wide">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Provide a detailed description of this Glarie Homelift solution..."
            className="w-full px-4 py-3 rounded-xl border border-[#EDE8E2] bg-neutral-50/50 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#E8600A] focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-200 text-sm font-medium resize-y"
          />
        </div>
      </div>

      {/* 2. Dynamic Specifications Panel */}
      <div className="bg-gradient-to-br from-white to-neutral-50/30 border border-[#EDE8E2] rounded-2xl p-8 shadow-[0_4px_16px_rgba(0,0,0,0.015)] space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
          <span className="w-7 h-7 rounded-lg bg-[#0E4FB3]/10 text-[#0E4FB3] flex items-center justify-center font-mono text-xs font-bold">02</span>
          <h3 className="m-0 font-display text-sm font-bold uppercase tracking-wider text-gray-800">
            Specifications (Tailored Fields)
          </h3>
        </div>

        {subCategory === 'Traction Technology' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-xs font-bold text-gray-700 tracking-wide">Drive Type</label>
              <input
                type="text"
                value={driveType}
                onChange={(e) => setDriveType(e.target.value)}
                placeholder="e.g. Steel Rope / Flat Composite Steel Belt"
                className="w-full px-4 py-3 rounded-xl border border-[#EDE8E2] bg-neutral-50/50 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#E8600A] focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-200 text-sm font-medium"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-xs font-bold text-gray-700 tracking-wide">Speed (Velocity)</label>
              <input
                type="text"
                value={speed}
                onChange={(e) => setSpeed(e.target.value)}
                placeholder="e.g. 0.4 m/s"
                className="w-full px-4 py-3 rounded-xl border border-[#EDE8E2] bg-neutral-50/50 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#E8600A] focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-200 text-sm font-medium"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-xs font-bold text-gray-700 tracking-wide">Capacity (Duty Load)</label>
              <input
                type="text"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                placeholder="e.g. 400 kg"
                className="w-full px-4 py-3 rounded-xl border border-[#EDE8E2] bg-neutral-50/50 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#E8600A] focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-200 text-sm font-medium"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-xs font-bold text-gray-700 tracking-wide">Min. Overhead</label>
              <input
                type="text"
                value={minOverhead}
                onChange={(e) => setMinOverhead(e.target.value)}
                placeholder="e.g. 2600 mm"
                className="w-full px-4 py-3 rounded-xl border border-[#EDE8E2] bg-neutral-50/50 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#E8600A] focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-200 text-sm font-medium"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-xs font-bold text-gray-700 tracking-wide">Min. Pit</label>
              <input
                type="text"
                value={minPit}
                onChange={(e) => setMinPit(e.target.value)}
                placeholder="e.g. 100 mm"
                className="w-full px-4 py-3 rounded-xl border border-[#EDE8E2] bg-neutral-50/50 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#E8600A] focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-200 text-sm font-medium"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-xs font-bold text-gray-700 tracking-wide">Travel Height</label>
              <input
                type="text"
                value={travelHeight}
                onChange={(e) => setTravelHeight(e.target.value)}
                placeholder="e.g. ≤ 15000 mm"
                className="w-full px-4 py-3 rounded-xl border border-[#EDE8E2] bg-neutral-50/50 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#E8600A] focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-200 text-sm font-medium"
              />
            </div>
            <div className="md:col-span-2 flex flex-col gap-1.5">
              <label className="font-sans text-xs font-bold text-gray-700 tracking-wide">Shaft Option Description</label>
              <input
                type="text"
                value={shaftOption}
                onChange={(e) => setShaftOption(e.target.value)}
                placeholder="e.g. Multiple shaft options available; aluminum alloy shafts are lighter..."
                className="w-full px-4 py-3 rounded-xl border border-[#EDE8E2] bg-neutral-50/50 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#E8600A] focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-200 text-sm font-medium"
              />
            </div>
          </div>
        )}

        {subCategory === 'Art Background Wall' && (
          <div className="flex items-center gap-3 bg-blue-50/50 border border-blue-100 p-4 rounded-xl">
            <Info className="w-5 h-5 text-[#0E4FB3] shrink-0" />
            <p className="font-sans text-xs text-[#0E4FB3] leading-relaxed m-0">
              No technical specification fields are required for <strong>Art Background Walls</strong>. Simply enter the custom code (e.g. HCS501) in the tagline field above, and upload the art image below.
            </p>
          </div>
        )}

        {subCategory !== 'Traction Technology' && subCategory !== 'Art Background Wall' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-xs font-bold text-gray-700 tracking-wide">Car Door</label>
              <input
                type="text"
                value={carDoor}
                onChange={(e) => setCarDoor(e.target.value)}
                placeholder="e.g. HSC00709 champagne gold fantasy metal plate"
                className="w-full px-4 py-3 rounded-xl border border-[#EDE8E2] bg-neutral-50/50 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#E8600A] focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-200 text-sm font-medium"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-xs font-bold text-gray-700 tracking-wide">Front Wall</label>
              <input
                type="text"
                value={frontWall}
                onChange={(e) => setFrontWall(e.target.value)}
                placeholder="e.g. HSC00709 champagne gold fantasy metal plate"
                className="w-full px-4 py-3 rounded-xl border border-[#EDE8E2] bg-neutral-50/50 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#E8600A] focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-200 text-sm font-medium"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-xs font-bold text-gray-700 tracking-wide">Side Walls</label>
              <input
                type="text"
                value={sideWalls}
                onChange={(e) => setSideWalls(e.target.value)}
                placeholder="e.g. HSC00709 champagne gold fantasy metal plate"
                className="w-full px-4 py-3 rounded-xl border border-[#EDE8E2] bg-neutral-50/50 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#E8600A] focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-200 text-sm font-medium"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-xs font-bold text-gray-700 tracking-wide">Back / Rear Wall</label>
              <input
                type="text"
                value={backWall}
                onChange={(e) => setBackWall(e.target.value)}
                placeholder="e.g. HSC00709 champagne gold fantasy metal plate"
                className="w-full px-4 py-3 rounded-xl border border-[#EDE8E2] bg-neutral-50/50 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#E8600A] focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-200 text-sm font-medium"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-xs font-bold text-gray-700 tracking-wide">Handrail</label>
              <input
                type="text"
                value={handrail}
                onChange={(e) => setHandrail(e.target.value)}
                placeholder="e.g. FK-SP63 black gold sand"
                className="w-full px-4 py-3 rounded-xl border border-[#EDE8E2] bg-neutral-50/50 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#E8600A] focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-200 text-sm font-medium"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-xs font-bold text-gray-700 tracking-wide">Ceiling</label>
              <input
                type="text"
                value={ceiling}
                onChange={(e) => setCeiling(e.target.value)}
                placeholder="e.g. Galaxy, black aluminum alloy frame + light strip"
                className="w-full px-4 py-3 rounded-xl border border-[#EDE8E2] bg-neutral-50/50 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#E8600A] focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-200 text-sm font-medium"
              />
            </div>
            <div className="md:col-span-2 flex flex-col gap-1.5">
              <label className="font-sans text-xs font-bold text-gray-700 tracking-wide">Floor / Flooring</label>
              <input
                type="text"
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
                placeholder="e.g. PVC or Marble"
                className="w-full px-4 py-3 rounded-xl border border-[#EDE8E2] bg-neutral-50/50 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#E8600A] focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-200 text-sm font-medium"
              />
            </div>
          </div>
        )}
      </div>

      {/* 3. Visual Media Images */}
      <div className="bg-gradient-to-br from-white to-neutral-50/30 border border-[#EDE8E2] rounded-2xl p-8 shadow-[0_4px_16px_rgba(0,0,0,0.015)] space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
          <span className="w-7 h-7 rounded-lg bg-green-50 text-green-700 flex items-center justify-center font-mono text-xs font-bold">03</span>
          <h3 className="m-0 font-display text-sm font-bold uppercase tracking-wider text-gray-800">
            Media Images
          </h3>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          {images.map((img, idx) => (
            <div key={idx} className="relative w-28 h-20 border border-[#EDE8E2] rounded-xl overflow-hidden bg-white shadow-xs group transition-all duration-300 hover:shadow-md">
              <img src={img.url} alt={img.alt || 'Asset'} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => setImages(images.filter((_, i) => i !== idx))}
                className="absolute top-1.5 right-1.5 p-1.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer border-none outline-none shadow-sm hover:bg-red-700"
              >
                <Trash2 size={10} />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => setActiveImagePicker(true)}
            className="w-28 h-20 rounded-xl border-2 border-dashed border-gray-300 hover:border-[#E8600A] hover:bg-orange-50/10 flex flex-col items-center justify-center gap-1.5 text-gray-400 hover:text-[#E8600A] transition-all duration-200 cursor-pointer bg-white/50"
          >
            <Plus size={16} />
            <span className="font-mono text-[9px] uppercase tracking-wider font-bold">Add Image</span>
          </button>
        </div>
      </div>

      {/* 4. Features Panel */}
      <div className="bg-gradient-to-br from-white to-neutral-50/30 border border-[#EDE8E2] rounded-2xl p-8 shadow-[0_4px_16px_rgba(0,0,0,0.015)] space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
          <span className="w-7 h-7 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center font-mono text-xs font-bold">04</span>
          <h3 className="m-0 font-display text-sm font-bold uppercase tracking-wider text-gray-800">
            Bullet Features
          </h3>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            placeholder="Add key highlights (e.g. Low energy consumption)..."
            className="flex-1 px-4 py-3 rounded-xl border border-[#EDE8E2] bg-neutral-50/50 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#E8600A] focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-200 text-sm font-medium"
          />
          <button
            type="button"
            onClick={addFeature}
            className="px-6 rounded-xl bg-gray-900 hover:bg-[#E8600A] text-white font-mono text-xs uppercase tracking-wider font-bold transition-all duration-200 cursor-pointer border-none shadow-xs"
          >
            Add
          </button>
        </div>

        <ul className="list-none p-0 m-0 space-y-2">
          {features.map((feat, idx) => (
            <li key={idx} className="flex justify-between items-center bg-white border border-[#EDE8E2] px-4 py-3 rounded-xl text-xs font-sans font-medium text-gray-700 shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:border-red-200 transition-colors">
              <span className="flex items-center gap-2.5">
                <Sparkles size={12} className="text-[#E8600A] shrink-0" />
                {feat}
              </span>
              <button
                type="button"
                onClick={() => removeFeature(idx)}
                className="text-gray-400 hover:text-red-600 cursor-pointer bg-transparent border-none p-0 flex items-center justify-center w-5 h-5 rounded-full hover:bg-red-50"
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* 5. Advanced Settings */}
      <div className="bg-gradient-to-br from-white to-neutral-50/30 border border-[#EDE8E2] rounded-2xl p-8 shadow-[0_4px_16px_rgba(0,0,0,0.015)] grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="flex flex-col gap-1.5">
          <label className="font-sans text-xs font-bold text-gray-700 tracking-wide">Sort Order Priority</label>
          <input
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#EDE8E2] bg-neutral-50/50 text-gray-900 focus:bg-white focus:border-[#E8600A] focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-200 text-sm font-medium"
          />
        </div>
        <div className="flex items-center gap-8 pt-4 md:pt-6 md:justify-end">
          <label className="flex items-center gap-2.5 cursor-pointer font-sans text-xs font-bold text-gray-700 select-none">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-[#E8600A] focus:ring-[#E8600A] focus:ring-offset-0 cursor-pointer"
            />
            Active Listed
          </label>
          <label className="flex items-center gap-2.5 cursor-pointer font-sans text-xs font-bold text-gray-700 select-none">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-[#E8600A] focus:ring-[#E8600A] focus:ring-offset-0 cursor-pointer"
            />
            Featured Item
          </label>
        </div>
      </div>

      {/* 6. Form Footer Controls */}
      <div className="flex justify-end gap-3 pt-4">
        <Link
          href="/admin/home-lifts"
          className="inline-flex items-center justify-center h-12 px-6 rounded-full font-mono text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-gray-900 border border-[#EDE8E2] hover:bg-neutral-50 hover:border-gray-350 no-underline transition-all duration-200"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isLoading}
          className="h-12 px-8 rounded-full bg-[#E8600A] hover:bg-[#0E4FB3] disabled:bg-gray-400 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer border-none shadow-md shadow-orange-500/10 hover:shadow-blue-500/10"
        >
          {isLoading ? 'Publishing...' : 'Publish Product'}
        </button>
      </div>

      {/* Image Gallery Picker Modal */}
      <MediaGalleryModal
        isOpen={activeImagePicker}
        onClose={() => setActiveImagePicker(false)}
        title="Select Product Image"
        onSelect={(url) => {
          setImages([...images, { url, alt: name || 'Home Lift Asset' }])
          setActiveImagePicker(false)
        }}
      />
    </form>
  )
})
