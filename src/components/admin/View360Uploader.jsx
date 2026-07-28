'use client'

import { useState } from 'react'
import { Rotate3d, Upload, Check, Image as ImageIcon } from 'lucide-react'
import MediaGalleryModal from './MediaGalleryModal'
import { compressImage } from '@/utils/image'

export default function View360Uploader({ variant, onChange }) {
  const [activePickerKey, setActivePickerKey] = useState(null) // null | key name

  if (!variant) return null

  const handleFieldChange = (key, val) => {
    const updatedPanorama = {
      ...(variant.panoramaImages || {}),
      [key]: val
    }
    onChange({
      ...variant,
      panoramaImages: updatedPanorama
    })
  }

  const textureCards = [
    {
      key: 'front',
      label: 'FRONT WALL (DOORS)',
      subtext: 'Looking at the elevator doors · Ratio 3:5',
      aspect: 'aspect-[3/5]',
      isHighlighted: true,
    },
    {
      key: 'back',
      label: 'BACK WALL',
      subtext: 'Looking at the rear wall · Ratio 3:5',
      aspect: 'aspect-[3/5]',
    },
    {
      key: 'left',
      label: 'SIDE WALLS (LEFT & RIGHT)',
      subtext: 'Same image used for both side walls · Ratio 3:5',
      aspect: 'aspect-[3/5]',
    },
  ]

  const ceilingFloorCards = [
    {
      key: 'ceiling',
      label: 'CEILING',
      subtext: 'Looking straight up · Ratio 1:1',
      aspect: 'aspect-square',
      isHighlighted: true,
    },
    {
      key: 'floor',
      label: 'FLOOR',
      subtext: 'Looking straight down · Ratio 1:1',
      aspect: 'aspect-square',
    },
  ]

  const handleDrop = (key, e) => {
    e.preventDefault()
    e.stopPropagation()
    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      const file = files[0]
      const reader = new FileReader()
      reader.onload = async (event) => {
        const rawDataUrl = event.target.result
        const dataUrl = await compressImage(rawDataUrl, 1200, 0.7)
        handleFieldChange(key, dataUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  const renderDropzoneCard = (card) => {
    const value = variant.panoramaImages?.[card.key] || ''
    const hasValue = Boolean(value)

    return (
      <div key={card.key} className="flex flex-col gap-2">
        <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-gray-700">
          {card.label}
        </span>

        {/* Dropzone Card Box */}
        <div
          onDragOver={(e) => { e.preventDefault(); e.stopPropagation() }}
          onDrop={(e) => handleDrop(card.key, e)}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setActivePickerKey(card.key)
          }}
          className={`relative w-full ${card.aspect} rounded-2xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center p-4 text-center group cursor-pointer overflow-hidden ${
            card.isHighlighted
              ? 'border-orange-300 bg-orange-50/20 hover:border-orange-400 hover:bg-orange-50/40'
              : 'border-gray-200 bg-white hover:border-orange-400 hover:bg-orange-50/20'
          }`}
        >
          {hasValue ? (
            <div className="relative w-full h-full flex flex-col items-center justify-center group/preview">
              <img
                src={value}
                alt={card.label}
                className="absolute inset-0 w-full h-full object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/preview:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                <span className="font-sans text-xs font-bold text-white">Change Image</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleFieldChange(card.key, '')
                  }}
                  className="text-[10px] font-bold text-red-300 hover:text-white bg-red-600/80 px-2 py-0.5 rounded cursor-pointer border-none"
                >
                  Remove
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gray-50 group-hover:bg-orange-100/60 text-gray-400 group-hover:text-orange-600 flex items-center justify-center transition-colors shadow-2xs">
                <Upload className="w-5 h-5" />
              </div>
              <span className="font-sans text-xs font-bold text-gray-700 group-hover:text-orange-600 transition-colors">
                Click or drop
              </span>
              <span className="font-mono text-[9px] text-gray-400 uppercase tracking-wider">
                Select from Gallery
              </span>
            </div>
          )}
        </div>

        {/* Subtext description below card */}
        <span className="font-mono text-[9px] text-gray-400 leading-tight">
          {card.subtext}
        </span>
      </div>
    )
  }

  return (
    <div className="bg-gray-50/60 border border-gray-200/80 rounded-2xl p-6 space-y-6">
      
      {/* Title */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
        <div className="flex items-center gap-2">
          <Rotate3d className="w-4 h-4 text-orange-600" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-gray-800">
            360° PANORAMA TEXTURE COORDINATES FOR {variant.name}
          </span>
        </div>
      </div>

      <p className="text-xs text-gray-500 font-sans leading-relaxed">
        Provide equirectangular sphere textures or 6-sided cubic face coordinates for 3D engine mapping.
      </p>

      {/* Main Equirectangular Sphere Texture URL input */}
      <div className="flex flex-col gap-1.5 bg-white p-4 rounded-xl border border-gray-200">
        <div className="flex items-center justify-between">
          <label className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">
            EQUIRECTANGULAR SPHERE MAP URL
          </label>
          <button
            type="button"
            onClick={() => setActivePickerKey('sphere')}
            className="font-mono text-[9px] uppercase font-bold text-[#0E4FB3] hover:underline cursor-pointer bg-transparent border-none p-0 flex items-center gap-1"
          >
            <ImageIcon className="w-3 h-3" />
            Pick from Gallery
          </button>
        </div>
        <input
          type="text"
          value={variant.panoramaImages?.sphere || ''}
          onChange={(e) => handleFieldChange('sphere', e.target.value)}
          placeholder="e.g. /images/360-gold.png"
          className="px-3.5 py-2 rounded-lg border border-gray-200 bg-white font-mono text-xs text-gray-800 outline-none focus:border-orange-500 w-full"
        />
      </div>

      {/* Top Row: 3 Walls Grid (Front, Back, Side) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        {textureCards.map(renderDropzoneCard)}
      </div>

      {/* Bottom Row: Ceiling & Floor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        {ceilingFloorCards.map(renderDropzoneCard)}
      </div>

      {/* Gallery Modal Picker */}
      <MediaGalleryModal
        isOpen={Boolean(activePickerKey)}
        onClose={() => setActivePickerKey(null)}
        aspectRatio={activePickerKey === 'ceiling' || activePickerKey === 'floor' ? 1 : (activePickerKey === 'sphere' ? null : 0.6)}
        title={`Select Image for ${activePickerKey?.toUpperCase()}`}
        onSelect={(url) => {
          if (activePickerKey) {
            handleFieldChange(activePickerKey, url)
          }
        }}
      />

    </div>
  )
}
