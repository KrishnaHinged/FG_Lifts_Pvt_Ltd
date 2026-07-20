'use client'

import { Rotate3d, HelpCircle } from 'lucide-react'

export default function View360Uploader({ variant, onChange }) {
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

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-4">
      {/* Title */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
        <Rotate3d className="w-4 h-4 text-fg-blue" />
        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-gray-700">
          360° Panorama Texture Coordinates for {variant.name}
        </span>
      </div>

      <p className="text-xs text-gray-500 font-sans leading-relaxed">
        Provide equirectangular sphere textures or 6-sided cubic face coordinates for 3D engine mapping.
      </p>

      {/* Inputs Grid */}
      <div className="grid grid-cols-2 gap-4">
        
        {/* Equirectangular Main Sphere Map */}
        <div className="col-span-2 flex flex-col gap-1.5">
          <label className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">
            Equirectangular Sphere Map URL
          </label>
          <input
            type="text"
            value={variant.panoramaImages?.sphere || ''}
            onChange={(e) => handleFieldChange('sphere', e.target.value)}
            placeholder="e.g. /images/360-gold.png"
            className="px-3.5 py-2 rounded-lg border border-gray-200 bg-white font-sans text-xs outline-none focus:border-fg-blue w-full"
          />
        </div>

        {/* 6-sided cubic details */}
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">Front Face URL</label>
          <input
            type="text"
            value={variant.panoramaImages?.front || ''}
            onChange={(e) => handleFieldChange('front', e.target.value)}
            placeholder="Front face URL"
            className="px-3.5 py-2 rounded-lg border border-gray-200 bg-white font-sans text-xs outline-none focus:border-fg-blue w-full"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">Back Face URL</label>
          <input
            type="text"
            value={variant.panoramaImages?.back || ''}
            onChange={(e) => handleFieldChange('back', e.target.value)}
            placeholder="Back face URL"
            className="px-3.5 py-2 rounded-lg border border-gray-200 bg-white font-sans text-xs outline-none focus:border-fg-blue w-full"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">Left Face URL</label>
          <input
            type="text"
            value={variant.panoramaImages?.left || ''}
            onChange={(e) => handleFieldChange('left', e.target.value)}
            placeholder="Left face URL"
            className="px-3.5 py-2 rounded-lg border border-gray-200 bg-white font-sans text-xs outline-none focus:border-fg-blue w-full"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">Right Face URL</label>
          <input
            type="text"
            value={variant.panoramaImages?.right || ''}
            onChange={(e) => handleFieldChange('right', e.target.value)}
            placeholder="Right face URL"
            className="px-3.5 py-2 rounded-lg border border-gray-200 bg-white font-sans text-xs outline-none focus:border-fg-blue w-full"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">Ceiling URL</label>
          <input
            type="text"
            value={variant.panoramaImages?.ceiling || ''}
            onChange={(e) => handleFieldChange('ceiling', e.target.value)}
            placeholder="Ceiling face URL"
            className="px-3.5 py-2 rounded-lg border border-gray-200 bg-white font-sans text-xs outline-none focus:border-fg-blue w-full"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">Floor URL</label>
          <input
            type="text"
            value={variant.panoramaImages?.floor || ''}
            onChange={(e) => handleFieldChange('floor', e.target.value)}
            placeholder="Floor face URL"
            className="px-3.5 py-2 rounded-lg border border-gray-200 bg-white font-sans text-xs outline-none focus:border-fg-blue w-full"
          />
        </div>

      </div>
    </div>
  )
}
