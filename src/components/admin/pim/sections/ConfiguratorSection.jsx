'use client'

import { useState } from 'react'
import { Box, Plus, Trash2, ExternalLink, Rotate3d } from 'lucide-react'
import SectionCard from '../shared/SectionCard'
import { FieldLabel } from '../shared/FieldLabel'
import View360Uploader from '../../View360Uploader'

export default function ConfiguratorSection({ form }) {
  const [selectedFinishForColor, setSelectedFinishForColor] = useState({})

  if (!form.has360View) return null

  const addColorVariant = () => {
    form.setColorVariants([
      ...form.colorVariants,
      { name: '', hex: '#888888', isActive: true, panoramaImages: {}, finishTextures: [] }
    ])
  }

  const removeColorVariant = (idx) => {
    form.setColorVariants(form.colorVariants.filter((_, i) => i !== idx))
  }

  const handleColorChange = (idx, field, val) => {
    const list = [...form.colorVariants]
    list[idx][field] = val
    form.setColorVariants(list)
  }

  const handleColorUploaderChangeWithFinish = (colorIdx, updatedVirtual) => {
    const selectedFinish = selectedFinishForColor[colorIdx] || 'default'
    const list = [...form.colorVariants]
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
    form.setColorVariants(list)
  }

  const addFinishVariant = () => {
    form.setFinishVariants([
      ...form.finishVariants,
      { name: '', description: '', isActive: true }
    ])
  }

  const removeFinishVariant = (idx) => {
    form.setFinishVariants(form.finishVariants.filter((_, i) => i !== idx))
  }

  const handleFinishChange = (idx, field, val) => {
    const list = [...form.finishVariants]
    list[idx][field] = val
    form.setFinishVariants(list)
  }

  return (
    <SectionCard
      id="pim-configurator"
      title="360° Interactive Cabin Configurator"
      description="Equirectangular panorama textures, cubic face coordinates, and default cabin presets."
      icon={Box}
      action={
        form.slug && (
          <a
            href={`/products/${form.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#0E4FB3]/30 bg-[#0E4FB3]/10 text-[#0E4FB3] font-sans font-bold text-xs cursor-pointer transition-colors no-underline"
          >
            <Rotate3d className="w-3.5 h-3.5" />
            Test in 3D Viewer
          </a>
        )
      }
    >
      <div className="space-y-8">
        
        {/* Defaults Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-[#F5F0EB]/40 p-4 rounded-2xl border border-[#E8E2DA]">
          <div>
            <FieldLabel required>Default Cabin Color</FieldLabel>
            <select
              value={form.defaultColor}
              onChange={(e) => form.setDefaultColor(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2DA] bg-white font-sans text-xs text-[#111111] outline-none focus:border-[#0E4FB3] cursor-pointer"
            >
              <option value="">Select Default Color</option>
              {form.colorVariants.filter(c => c.name.trim()).map((c, idx) => (
                <option key={idx} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <FieldLabel required>Default Cabin Texture Finish</FieldLabel>
            <select
              value={form.defaultFinish}
              onChange={(e) => form.setDefaultFinish(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2DA] bg-white font-sans text-xs text-[#111111] outline-none focus:border-[#0E4FB3] cursor-pointer"
            >
              <option value="">Select Default Finish</option>
              {form.finishVariants.filter(f => f.name.trim()).map((f, idx) => (
                <option key={idx} value={f.name}>{f.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Color Finishes List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <FieldLabel helper="Colors rendered in 3D viewer">Configurator Color Finishes</FieldLabel>
            <button
              type="button"
              onClick={addColorVariant}
              className="flex items-center gap-1 bg-[#0E4FB3]/10 text-[#0E4FB3] px-3 py-1 rounded-lg font-bold text-xs cursor-pointer border-none hover:bg-[#0E4FB3]/20 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Finish Color
            </button>
          </div>

          <div className="space-y-6">
            {form.colorVariants.map((c, i) => (
              <div key={i} className="border border-[#E8E2DA] rounded-2xl p-5 bg-white space-y-4">
                
                {/* Name & Hex Row */}
                <div className="flex gap-4 items-center">
                  <input
                    type="text"
                    value={c.name}
                    onChange={(e) => handleColorChange(i, 'name', e.target.value)}
                    placeholder="Color Name (e.g. Champagne Gold)"
                    required
                    className="flex-1 px-3.5 py-2 rounded-xl border border-[#E8E2DA] bg-white font-sans text-xs outline-none focus:border-[#0E4FB3]"
                  />

                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={c.hex || '#888888'}
                      onChange={(e) => handleColorChange(i, 'hex', e.target.value)}
                      className="h-9 w-9 rounded-xl border border-[#E8E2DA] bg-white outline-none cursor-pointer p-0"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => removeColorVariant(i)}
                    disabled={form.colorVariants.length === 1}
                    className="p-2 rounded-lg text-gray-400 hover:text-red-600 disabled:opacity-40 cursor-pointer bg-transparent border-none"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Finish Texture Selector */}
                <div className="flex items-center gap-2.5 pb-2 pt-1 border-t border-[#E8E2DA]/60">
                  <span className="font-mono text-[9px] uppercase font-bold text-[#6B6B6B]">
                    Upload Textures for:
                  </span>
                  <select
                    value={selectedFinishForColor[i] || 'default'}
                    onChange={(e) => setSelectedFinishForColor(prev => ({ ...prev, [i]: e.target.value }))}
                    className="px-3 py-1.5 rounded-lg border border-[#E8E2DA] bg-[#F5F0EB]/60 font-sans text-xs font-semibold outline-none cursor-pointer"
                  >
                    <option value="default">Default / Base Color</option>
                    {form.finishVariants.filter(f => f.name.trim() && f.isActive).map(f => (
                      <option key={f.name} value={f.name}>{f.name}</option>
                    ))}
                  </select>
                </div>

                {/* Texture Uploader */}
                {(() => {
                  const selFinish = selectedFinishForColor[i] || 'default'
                  let virtualVariant = c
                  if (selFinish !== 'default') {
                    const finishTex = (c.finishTextures || []).find(ft => ft.finishName === selFinish) || {
                      finishName: selFinish,
                      panoramaImages: {}
                    }
                    virtualVariant = {
                      name: `${c.name} (${selFinish})`,
                      panoramaImages: finishTex.panoramaImages
                    }
                  }
                  return (
                    <View360Uploader
                      key={`${i}-${selFinish}`}
                      variant={virtualVariant}
                      onChange={(updatedVirtual) => handleColorUploaderChangeWithFinish(i, updatedVirtual)}
                    />
                  )
                })()}

              </div>
            ))}
          </div>
        </div>

        {/* Material Finish Variants List */}
        <div className="space-y-4 border-t border-[#E8E2DA] pt-6">
          <div className="flex items-center justify-between">
            <FieldLabel helper="Finishes available in 3D customizer">Material Texture Finishes</FieldLabel>
            <button
              type="button"
              onClick={addFinishVariant}
              className="flex items-center gap-1 bg-[#0E4FB3]/10 text-[#0E4FB3] px-3 py-1 rounded-lg font-bold text-xs cursor-pointer border-none hover:bg-[#0E4FB3]/20 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Finish Variant
            </button>
          </div>

          <div className="space-y-3">
            {form.finishVariants.map((f, i) => (
              <div key={i} className="border border-[#E8E2DA] rounded-2xl p-4 bg-white space-y-3">
                <div className="flex gap-3 items-center">
                  <input
                    type="text"
                    value={f.name}
                    onChange={(e) => handleFinishChange(i, 'name', e.target.value)}
                    placeholder="Finish Name (e.g. Mirror Finish)"
                    required
                    className="flex-1 px-3.5 py-2 rounded-xl border border-[#E8E2DA] bg-white font-sans text-xs outline-none focus:border-[#0E4FB3]"
                  />

                  <button
                    type="button"
                    onClick={() => removeFinishVariant(i)}
                    disabled={form.finishVariants.length === 1}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 disabled:opacity-40 cursor-pointer bg-transparent border-none"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <input
                  type="text"
                  value={f.description || ''}
                  onChange={(e) => handleFinishChange(i, 'description', e.target.value)}
                  placeholder="Finish description (e.g. Highly reflective mirror-like polished stainless steel surface)"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8E2DA] bg-white font-sans text-xs outline-none focus:border-[#0E4FB3]"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </SectionCard>
  )
}
