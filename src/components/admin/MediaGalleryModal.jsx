'use client'

import { useState, useRef, useEffect, useMemo, memo } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, UploadCloud, Check, Search, Image as ImageIcon, Link as LinkIcon, Move, ZoomIn, Crop } from 'lucide-react'

// Built-in media library stock images
const defaultMediaLibrary = [
  { url: '/images/360-gold.png', title: 'Champagne Gold 360 Texture', category: '360 Texture' },
  { url: '/images/360-rose-gold.png', title: 'Rose Gold 360 Texture', category: '360 Texture' },
  { url: '/images/360-silver.png', title: 'Mirror Silver 360 Texture', category: '360 Texture' },
  { url: '/images/elevator-gold.jpg', title: 'Luxury Gold Cabin Doors', category: 'Cabins' },
  { url: '/images/elevator-steel.jpg', title: 'Hairline Stainless Steel Cabin', category: 'Cabins' },
  { url: '/images/elevator-wood.jpg', title: 'Premium Wood Finish Interior', category: 'Cabins' },
  { url: '/images/hero-bg.jpg', title: 'Modern Elevator Shaft Banner', category: 'Backgrounds' },
  { url: '/images/about-factory.png', title: 'Manufacturing Plant Factory', category: 'Factory' },
  { url: '/images/projects-collage.png', title: 'Commercial Project Showcase', category: 'Showcase' },
  { url: '/images/services-collage.png', title: 'High-Speed Traction Machine', category: 'Components' },
]

export default memo(function MediaGalleryModal({ isOpen, onClose, onSelect, title = "Select Image from Gallery", aspectRatio = null }) {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState('gallery') // gallery | upload | url
  const [searchTerm, setSearchTerm] = useState('')
  const [customUrl, setCustomUrl] = useState('')
  const [uploadedImages, setUploadedImages] = useState([])
  const [selectedUrl, setSelectedUrl] = useState('')

  // Crop / Adjust Sub-step States
  const [cropSrc, setCropSrc] = useState(null)
  const [zoom, setZoom] = useState(1.0)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef({ x: 0, y: 0 })
  const containerRef = useRef(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isOpen) {
      setCropSrc(null)
      setSelectedUrl('')
      setCustomUrl('')
    }
  }, [isOpen])

  const allMedia = useMemo(() => {
    return [...uploadedImages, ...defaultMediaLibrary]
  }, [uploadedImages])

  const filteredMedia = useMemo(() => {
    const term = searchTerm.toLowerCase().trim()
    if (!term) return allMedia
    return allMedia.filter(item => 
      item.title.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term)
    )
  }, [allMedia, searchTerm])

  if (!isOpen || !mounted) return null

  const handleFileUpload = (e) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    const file = files[0]
    const reader = new FileReader()
    reader.onload = (event) => {
      const dataUrl = event.target.result
      const newMedia = {
        url: dataUrl,
        title: file.name,
        category: 'Uploaded'
      }
      setUploadedImages(prev => [newMedia, ...prev])
      setSelectedUrl(dataUrl)
      setActiveTab('gallery')
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      const file = files[0]
      const reader = new FileReader()
      reader.onload = (event) => {
        const dataUrl = event.target.result
        const newMedia = {
          url: dataUrl,
          title: file.name,
          category: 'Uploaded'
        }
        setUploadedImages(prev => [newMedia, ...prev])
        setSelectedUrl(dataUrl)
        setActiveTab('gallery')
      }
      reader.readAsDataURL(file)
    }
  }

  const handleConfirmSelection = (e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    const finalUrl = selectedUrl || customUrl
    if (!finalUrl) return

    if (aspectRatio) {
      setCropSrc(finalUrl)
      setZoom(1.0)
      setPosition({ x: 0, y: 0 })
    } else {
      onSelect(finalUrl)
      onClose()
    }
  }

  // Pointer dragging handlers for pan adjustment
  const handlePointerDown = (e) => {
    e.preventDefault()
    setIsDragging(true)
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y }
  }

  const handlePointerMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    setPosition({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y
    })
  }

  const handlePointerUp = () => {
    setIsDragging(false)
  }

  // Precision HTML5 canvas cropping calculation
  const handleCropSave = () => {
    if (!cropSrc) return
    const img = new window.Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const canvas = document.createElement('canvas')
      
      // HD exports: 3:5 aspect ratio (600x1000) or 1:1 aspect ratio (800x800)
      let targetWidth = 600
      let targetHeight = 1000
      if (aspectRatio === 1) {
        targetWidth = 800
        targetHeight = 800
      }

      canvas.width = targetWidth
      canvas.height = targetHeight
      const ctx = canvas.getContext('2d')

      // Background fill
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, targetWidth, targetHeight)

      const imgWidth = img.naturalWidth
      const imgHeight = img.naturalHeight

      const targetAspect = targetWidth / targetHeight
      const imgAspect = imgWidth / imgHeight

      let drawWidth, drawHeight
      if (imgAspect > targetAspect) {
        // Image is wider -> match height first, scale width
        drawHeight = targetHeight * zoom
        drawWidth = drawHeight * imgAspect
      } else {
        // Image is taller -> match width first, scale height
        drawWidth = targetWidth * zoom
        drawHeight = drawWidth / imgAspect
      }

      // UI crop box reference sizes: 3:5 walls is 180x300, 1:1 ceiling/floor is 240x240
      const previewCropBoxWidth = aspectRatio === 1 ? 240 : 180
      const scaleFactor = targetWidth / previewCropBoxWidth

      // Center offset + user translation pan factor
      const xOffset = (targetWidth - drawWidth) / 2 + position.x * scaleFactor
      const yOffset = (targetHeight - drawHeight) / 2 + position.y * scaleFactor

      ctx.drawImage(img, xOffset, yOffset, drawWidth, drawHeight)

      const croppedUrl = canvas.toDataURL('image/jpeg', 0.9)
      onSelect(croppedUrl)
      onClose()
      setCropSrc(null)
    }
    img.src = cropSrc
  }

  const handleCloseModal = (e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    onClose()
  }

  const modalContent = (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md select-none"
        onClick={handleCloseModal}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-3xl bg-white border border-[#E8E2DA] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] z-[100000]"
          onClick={(e) => e.stopPropagation()}
        >
          {cropSrc ? (
            /* STEP A: Adjust & Crop Viewport */
            <>
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-2">
                  <Crop className="w-5 h-5 text-orange-600 animate-pulse" />
                  <h3 className="font-sans font-bold text-gray-900 text-base m-0">
                    Adjust &amp; Crop Texture
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setCropSrc(null)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-200/60 transition cursor-pointer border-none bg-transparent"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Viewport content */}
              <div className="p-6 flex flex-col items-center justify-center bg-gray-50 flex-1 min-h-[350px]">
                <span className="font-sans text-[11px] text-gray-500 font-bold mb-3 uppercase tracking-wider">
                  Drag image to adjust position · Zoom to crop area
                </span>

                {/* Main black frame box */}
                <div
                  ref={containerRef}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerLeave={handlePointerUp}
                  className="relative bg-neutral-900 border border-gray-300 rounded-xl overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
                  style={{
                    width: '360px',
                    height: '360px'
                  }}
                >
                  {/* Crop view frame window - width 180 height 300 (3:5) or 240x240 (1:1) */}
                  <div
                    className="relative overflow-visible"
                    style={{
                      width: aspectRatio === 1 ? '240px' : '180px',
                      height: aspectRatio === 1 ? '240px' : '300px'
                    }}
                  >
                    {/* Rendered adjustable photo */}
                    <div
                      className="absolute inset-0 pointer-events-none select-none origin-center"
                      style={{
                        backgroundImage: `url(${cropSrc})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`
                      }}
                    />
                  </div>

                  {/* Cutout Shaded Overlay mask */}
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      width: aspectRatio === 1 ? '240px' : '180px',
                      height: aspectRatio === 1 ? '240px' : '300px',
                      boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.65)',
                      border: '2px dashed rgba(255, 255, 255, 0.95)',
                      borderRadius: '4px',
                      zIndex: 10
                    }}
                  />

                  {/* Reposition Tag indicator */}
                  <div className="absolute top-3 left-3 z-20 bg-black/60 backdrop-blur-xs text-white p-1.5 rounded-lg pointer-events-none flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider">
                    <Move className="w-3.5 h-3.5" />
                    Reposition
                  </div>
                </div>

                {/* Zoom range Slider control */}
                <div className="w-full max-w-xs flex items-center gap-3.5 mt-5 bg-white p-3 rounded-xl border border-gray-200">
                  <ZoomIn className="w-4 h-4 text-gray-400" />
                  <input
                    type="range"
                    min="1.0"
                    max="3.0"
                    step="0.02"
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    className="flex-1 accent-orange-600 cursor-pointer h-1.5 bg-gray-200 rounded-lg appearance-none"
                  />
                  <span className="font-mono text-xs font-bold text-gray-700 w-10 text-right">
                    {Math.round(zoom * 100)}%
                  </span>
                </div>
              </div>

              {/* Action Bar Footer */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50">
                <button
                  type="button"
                  onClick={() => setCropSrc(null)}
                  className="px-4 py-2 rounded-xl font-mono text-xs uppercase font-bold text-gray-600 hover:bg-gray-200 transition cursor-pointer border-none bg-transparent"
                >
                  Back to Library
                </button>
                <button
                  type="button"
                  onClick={handleCropSave}
                  className="px-6 py-2.5 rounded-xl font-sans font-bold text-xs uppercase text-white bg-orange-600 hover:bg-orange-700 transition cursor-pointer border-none shadow-sm flex items-center gap-1.5"
                >
                  <Crop className="w-4 h-4" />
                  Confirm Adjustments
                </button>
              </div>
            </>
          ) : (
            /* STEP B: Standard Picker tabs view */
            <>
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-[#0E4FB3]" />
                  <h3 className="font-sans font-bold text-gray-900 text-base m-0">
                    {title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-200/60 transition cursor-pointer border-none bg-transparent"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center justify-between px-6 pt-3 pb-2 border-b border-gray-100 bg-white">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveTab('gallery') }}
                    className={`font-mono text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-lg font-bold cursor-pointer border-none transition ${
                      activeTab === 'gallery' ? 'bg-[#0E4FB3] text-white shadow-xs' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Media Library ({allMedia.length})
                  </button>
                  <button
                    type="button"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveTab('upload') }}
                    className={`font-mono text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-lg font-bold cursor-pointer border-none transition ${
                      activeTab === 'upload' ? 'bg-[#0E4FB3] text-white shadow-xs' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Upload File
                  </button>
                  <button
                    type="button"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveTab('url') }}
                    className={`font-mono text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-lg font-bold cursor-pointer border-none transition ${
                      activeTab === 'url' ? 'bg-[#0E4FB3] text-white shadow-xs' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Image URL
                  </button>
                </div>

                {/* Search Filter */}
                {activeTab === 'gallery' && (
                  <div className="relative w-48 hidden sm:block">
                    <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search assets..."
                      className="w-full pl-8 pr-3 py-1 rounded-lg border border-gray-200 font-sans text-xs outline-none focus:border-[#0E4FB3]"
                    />
                  </div>
                )}
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto flex-1 min-h-[320px]">
                
                {/* Tab 1: Media Library */}
                {activeTab === 'gallery' && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {filteredMedia.map((item, idx) => {
                      const isSelected = selectedUrl === item.url
                      return (
                        <div
                          key={idx}
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            setSelectedUrl(item.url)
                          }}
                          className={`group relative aspect-[4/3] rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                            isSelected
                              ? 'border-[#0E4FB3] ring-2 ring-[#0E4FB3]/30 scale-[0.98] shadow-md'
                              : 'border-gray-200 hover:border-gray-400'
                          }`}
                        >
                          <Image
                            src={item.url}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                          
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#0E4FB3] text-white flex items-center justify-center shadow-md">
                              <Check className="w-4 h-4 stroke-[3]" />
                            </div>
                          )}

                          <div className="absolute bottom-2 left-2 right-2">
                            <span className="font-sans text-[11px] font-bold text-white block truncate leading-tight">
                              {item.title}
                            </span>
                            <span className="font-mono text-[9px] text-white/70 block uppercase tracking-wider">
                              {item.category}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}

                {/* Tab 2: Upload File */}
                {activeTab === 'upload' && (
                  <label
                    onDragOver={(e) => { e.preventDefault(); e.stopPropagation() }}
                    onDrop={handleDrop}
                    className="w-full h-64 border-2 border-dashed border-gray-300 hover:border-[#0E4FB3] bg-gray-50/50 hover:bg-blue-50/20 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all p-6 text-center group block select-none"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <div className="w-14 h-14 rounded-full bg-blue-50 text-[#0E4FB3] group-hover:scale-110 flex items-center justify-center mb-3 transition-transform pointer-events-none">
                      <UploadCloud className="w-7 h-7" />
                    </div>
                    <h4 className="font-sans font-bold text-gray-900 text-base m-0 pointer-events-none">
                      Click or Drag &amp; Drop Image Here
                    </h4>
                    <p className="font-sans text-xs text-gray-500 m-0 mt-1 max-w-sm pointer-events-none">
                      Supports PNG, JPG, WEBP, or SVG image files directly from your computer gallery.
                    </p>
                  </label>
                )}

                {/* Tab 3: Custom URL */}
                {activeTab === 'url' && (
                  <div className="space-y-4 max-w-lg mx-auto py-8">
                    <label className="font-mono text-xs uppercase tracking-wider text-gray-600 font-bold block">
                      Direct Image URL
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <LinkIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={customUrl}
                          onChange={(e) => {
                            setCustomUrl(e.target.value)
                            setSelectedUrl(e.target.value)
                          }}
                          placeholder="https://example.com/image.jpg or /images/360-gold.png"
                          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-300 font-mono text-xs outline-none focus:border-[#0E4FB3]"
                        />
                      </div>
                    </div>
                    {customUrl && (
                      <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-gray-200 bg-gray-100 mt-4">
                        <img
                          src={customUrl}
                          alt="URL Preview"
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                  </div>
                )}

              </div>

              {/* Modal Footer Actions */}
              <div className="flex items-center justify-between px-6 py-3.5 border-t border-gray-100 bg-gray-50">
                <span className="font-mono text-xs text-gray-500">
                  {selectedUrl ? `Selected: ${selectedUrl.slice(0, 30)}...` : 'No image selected'}
                </span>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 rounded-xl font-mono text-xs uppercase font-bold text-gray-600 hover:bg-gray-200 transition cursor-pointer border-none bg-transparent"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={!selectedUrl && !customUrl}
                    onClick={handleConfirmSelection}
                    className="px-6 py-2 rounded-xl font-sans font-bold text-xs uppercase text-white bg-[#0E4FB3] hover:bg-[#0b3e8e] disabled:opacity-50 transition cursor-pointer border-none shadow-sm flex items-center gap-1.5"
                  >
                    {aspectRatio ? 'Adjust & Crop' : 'Select Asset'}
                  </button>
                </div>
              </div>
            </>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  )

  return createPortal(modalContent, document.body)
})
