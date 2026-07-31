'use client'

import { useState } from 'react'
import { Palette, Plus, Trash2, Copy, ArrowUp, ArrowDown, ImageIcon } from 'lucide-react'
import SectionCard from '../shared/SectionCard'
import { FieldLabel, ToggleSwitch } from '../shared/FieldLabel'

export default function DesignVariantsSection({ form }) {
  const addVariant = () => {
    form.setDesignVariants([
      ...form.designVariants,
      {
        id: `var-${Date.now()}`,
        name: 'New Custom Variant',
        type: 'Finish',
        hex: '#C9A84C',
        isActive: true,
        priceModifier: '',
        description: '',
        images: []
      }
    ])
  }

  const removeVariant = (vIdx) => {
    form.setDesignVariants(form.designVariants.filter((_, idx) => idx !== vIdx))
  }

  const duplicateVariant = (vIdx) => {
    const target = form.designVariants[vIdx]
    const clone = {
      ...target,
      id: `var-${Date.now()}`,
      name: `${target.name} (Copy)`
    }
    const next = [...form.designVariants]
    next.splice(vIdx + 1, 0, clone)
    form.setDesignVariants(next)
  }

  const handleVariantChange = (vIdx, field, val) => {
    const next = [...form.designVariants]
    next[vIdx][field] = val
    form.setDesignVariants(next)
  }

  const moveVariant = (vIdx, direction) => {
    const next = [...form.designVariants]
    const targetIdx = vIdx + direction
    if (targetIdx < 0 || targetIdx >= next.length) return
    const temp = next[vIdx]
    next[vIdx] = next[targetIdx]
    next[targetIdx] = temp
    form.setDesignVariants(next)
  }

  return (
    <SectionCard
      id="pim-variants"
      title="Design Variants & Aesthetic Patterns"
      description="Configure cabin interior options, stainless steel finishes, patterns, and custom design configurations."
      icon={Palette}
      action={
        <button
          type="button"
          onClick={addVariant}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E8E2DA] bg-white hover:bg-[#F5F0EB] font-sans font-bold text-xs text-[#0E4FB3] cursor-pointer transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Variant Card
        </button>
      }
    >
      <div className="space-y-6">
        
        {form.designVariants.map((v, vIdx) => (
          <div key={v.id || vIdx} className="border border-[#E8E2DA] rounded-2xl p-5 space-y-4 bg-white relative">
            
            {/* Header controls */}
            <div className="flex items-center justify-between border-b border-[#E8E2DA]/60 pb-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[9px] uppercase font-bold text-[#0E4FB3] bg-[#0E4FB3]/10 px-2.5 py-1 rounded-full">
                  Variant #{vIdx + 1}
                </span>
                <input
                  type="text"
                  value={v.name}
                  onChange={(e) => handleVariantChange(vIdx, 'name', e.target.value)}
                  placeholder="Variant Name (e.g. Champagne Gold Mirror)"
                  className="font-display font-bold text-sm text-[#111111] bg-transparent outline-none border-b border-transparent hover:border-gray-300 focus:border-[#0E4FB3]"
                />
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => moveVariant(vIdx, -1)}
                  disabled={vIdx === 0}
                  className="p-1 text-gray-400 hover:text-[#0E4FB3] disabled:opacity-30 border-none bg-transparent cursor-pointer"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => moveVariant(vIdx, 1)}
                  disabled={vIdx === form.designVariants.length - 1}
                  className="p-1 text-gray-400 hover:text-[#0E4FB3] disabled:opacity-30 border-none bg-transparent cursor-pointer"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => duplicateVariant(vIdx)}
                  className="p-1 text-gray-400 hover:text-[#0E4FB3] border-none bg-transparent cursor-pointer"
                  title="Duplicate Variant"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => removeVariant(vIdx)}
                  disabled={form.designVariants.length === 1}
                  className="p-1 text-gray-400 hover:text-red-600 disabled:opacity-30 border-none bg-transparent cursor-pointer"
                  title="Delete Variant"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <FieldLabel>Variant Type</FieldLabel>
                <select
                  value={v.type}
                  onChange={(e) => handleVariantChange(vIdx, 'type', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E2DA] bg-white font-sans text-xs outline-none focus:border-[#0E4FB3] cursor-pointer"
                >
                  {['Finish', 'Pattern', 'Color', 'Configuration'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <FieldLabel>Hex Color Swatch</FieldLabel>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={v.hex || '#888888'}
                    onChange={(e) => handleVariantChange(vIdx, 'hex', e.target.value)}
                    className="w-10 h-9 rounded-xl border border-[#E8E2DA] bg-white outline-none cursor-pointer p-0"
                  />
                  <input
                    type="text"
                    value={v.hex || '#888888'}
                    onChange={(e) => handleVariantChange(vIdx, 'hex', e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border border-[#E8E2DA] font-mono text-xs text-[#111111] outline-none"
                  />
                </div>
              </div>

              <div>
                <FieldLabel>Optional Price Delta</FieldLabel>
                <input
                  type="text"
                  value={v.priceModifier || ''}
                  onChange={(e) => handleVariantChange(vIdx, 'priceModifier', e.target.value)}
                  placeholder="e.g. +₹15,000 / Standard"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E2DA] bg-white font-sans text-xs text-[#111111] outline-none focus:border-[#0E4FB3]"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <FieldLabel>Variant Description</FieldLabel>
              <input
                type="text"
                value={v.description || ''}
                onChange={(e) => handleVariantChange(vIdx, 'description', e.target.value)}
                placeholder="e.g. High-grade 304 stainless steel with hairline brushed finish"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E2DA] bg-white font-sans text-xs text-[#111111] outline-none focus:border-[#0E4FB3]"
              />
            </div>

            {/* Active Switch */}
            <div className="pt-2">
              <ToggleSwitch
                checked={!!v.isActive}
                onChange={() => handleVariantChange(vIdx, 'isActive', !v.isActive)}
                label="Variant Available in Configurator"
                sublabel="Renders option on public 3D viewer & product customizer"
              />
            </div>

          </div>
        ))}

      </div>
    </SectionCard>
  )
}
