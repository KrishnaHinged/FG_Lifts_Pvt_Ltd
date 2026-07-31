'use client'

import { useState, useRef } from 'react'
import { Palette, Plus, CheckCircle2, Upload, Trash2, Check, ImageIcon } from 'lucide-react'
import SectionCard from '../shared/SectionCard'
import { FieldLabel } from '../shared/FieldLabel'

export default function DesignVariantsSection({ form }) {
  // New Color Form State
  const [newColorName, setNewColorName] = useState('')
  const [newColorHex, setNewColorHex] = useState('#CD7F32')

  // New Finish Form State
  const [newFinishName, setNewFinishName] = useState('')

  // Hidden File Input Ref per combination row
  const fileInputRefs = useRef({})

  // Color Handlers
  const handleAddColor = (e) => {
    if (e) e.preventDefault()
    if (!newColorName.trim()) return
    const updated = [
      ...form.colorVariants,
      {
        name: newColorName.trim(),
        hex: newColorHex.trim() || '#888888',
        isActive: true,
        panoramaImages: {},
        finishTextures: []
      }
    ]
    form.setColorVariants(updated)
    if (!form.defaultColor) {
      form.setDefaultColor(newColorName.trim())
    }
    setNewColorName('')
    setNewColorHex('#CD7F32')
  }

  const handleRemoveColor = (cIdx) => {
    const targetColor = form.colorVariants[cIdx]
    const updated = form.colorVariants.filter((_, idx) => idx !== cIdx)
    form.setColorVariants(updated)
    if (form.defaultColor === targetColor?.name && updated.length > 0) {
      form.setDefaultColor(updated[0].name)
    }
  }

  // Finish Handlers
  const handleAddFinish = (e) => {
    if (e) e.preventDefault()
    if (!newFinishName.trim()) return
    const updated = [
      ...form.finishVariants,
      {
        name: newFinishName.trim(),
        description: '',
        isActive: true
      }
    ]
    form.setFinishVariants(updated)
    if (!form.defaultFinish) {
      form.setDefaultFinish(newFinishName.trim())
    }
    setNewFinishName('')
  }

  const handleRemoveFinish = (fIdx) => {
    const targetFinish = form.finishVariants[fIdx]
    const updated = form.finishVariants.filter((_, idx) => idx !== fIdx)
    form.setFinishVariants(updated)
    if (form.defaultFinish === targetFinish?.name && updated.length > 0) {
      form.setDefaultFinish(updated[0].name)
    }
  }

  // Combination Asset Handlers
  const getCombinationData = (colorName, finishName) => {
    const colorObj = form.colorVariants.find(c => c.name === colorName)
    if (!colorObj) return { imageUrl: '', enabled: true }
    const ft = (colorObj.finishTextures || []).find(f => f.finishName === finishName)
    return {
      imageUrl: ft?.imageUrl || '',
      enabled: ft?.enabled !== false
    }
  }

  const handleCombinationChange = (colorName, finishName, field, value) => {
    const updatedColors = form.colorVariants.map(c => {
      if (c.name !== colorName) return c

      const finishTextures = [...(c.finishTextures || [])]
      const ftIndex = finishTextures.findIndex(ft => ft.finishName === finishName)

      if (ftIndex > -1) {
        finishTextures[ftIndex] = {
          ...finishTextures[ftIndex],
          [field]: value
        }
      } else {
        finishTextures.push({
          finishName,
          imageUrl: field === 'imageUrl' ? value : '',
          enabled: field === 'enabled' ? value : true
        })
      }

      return {
        ...c,
        finishTextures
      }
    })

    form.setColorVariants(updatedColors)
  }

  const handleTriggerUpload = (combKey) => {
    if (fileInputRefs.current[combKey]) {
      fileInputRefs.current[combKey].click()
    }
  }

  const handleFileUpload = (colorName, finishName, e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (evt) => {
      const dataUrl = evt.target?.result
      if (dataUrl) {
        handleCombinationChange(colorName, finishName, 'imageUrl', dataUrl)
      }
    }
    reader.readAsDataURL(file)
  }

  const activeColors = form.colorVariants.filter(c => c.name.trim() && c.isActive !== false)
  const activeFinishes = form.finishVariants.filter(f => f.name.trim() && f.isActive !== false)

  return (
    <SectionCard
      id="pim-variants"
      title="Variants Configuration"
      description="Categorization controls catalog layouts, color palettes, finishes, default states, and variant images."
      icon={Palette}
    >
      <div className="space-y-10">

        {/* 1. COLORS CONFIGURATION */}
        <div className="space-y-4 bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm">
          <div>
            <h3 className="font-display font-bold text-sm tracking-wide uppercase text-[#0F172A]">
              1. Colors Configuration
            </h3>
            <p className="text-xs text-[#64748B] mt-0.5 font-sans">
              Toggle colors, define hex codes, or add custom colors.
            </p>
          </div>

          {/* Active Colors Cards List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {form.colorVariants.map((c, cIdx) => (
              <div
                key={c.name + cIdx}
                className="bg-white border border-[#E2E8F0] rounded-xl p-3.5 flex items-center justify-between shadow-sm hover:border-[#CBD5E1] transition-all"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-7 h-7 rounded-full border border-gray-300 shadow-inner shrink-0"
                    style={{ backgroundColor: c.hex || '#4B5563' }}
                  />
                  <div className="min-w-0">
                    <span className="font-bold text-xs text-[#0F172A] block truncate">{c.name}</span>
                    <span className="text-[11px] font-mono text-[#64748B] block">{c.hex || '#4B5563'}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveColor(cIdx)}
                  className="flex items-center gap-1 text-[11px] font-bold text-[#EA580C] hover:text-red-600 bg-orange-50/80 hover:bg-red-50 border border-orange-200/80 hover:border-red-200 px-2.5 py-1 rounded-lg transition-colors cursor-pointer shrink-0 ml-2"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#EA580C]" />
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Add Color Row */}
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 mt-3">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4 items-end">
              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#64748B] mb-1.5 block">
                  Color Name
                </label>
                <input
                  type="text"
                  value={newColorName}
                  onChange={(e) => setNewColorName(e.target.value)}
                  placeholder="e.g. Bronze"
                  className="w-full bg-white border border-[#E2E8F0] rounded-xl px-4 py-2.5 text-xs text-[#0F172A] outline-none focus:border-[#0E4FB3] shadow-sm"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#64748B] mb-1.5 block">
                  Hex Code / Color Class
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={newColorHex}
                    onChange={(e) => setNewColorHex(e.target.value)}
                    className="w-9 h-9 rounded-xl border border-[#CBD5E1] p-0 cursor-pointer overflow-hidden shadow-sm shrink-0 bg-white"
                  />
                  <input
                    type="text"
                    value={newColorHex}
                    onChange={(e) => setNewColorHex(e.target.value)}
                    placeholder="e.g. #CD7F32"
                    className="flex-1 bg-white border border-[#E2E8F0] rounded-xl px-4 py-2.5 text-xs font-mono text-[#0F172A] outline-none focus:border-[#0E4FB3] shadow-sm"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddColor}
                className="bg-[#1E3A8A] hover:bg-[#1E40AF] text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wide cursor-pointer transition-colors shadow-sm shrink-0 h-[42px] flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Color
              </button>
            </div>
          </div>
        </div>


        {/* 2. FINISHES CONFIGURATION */}
        <div className="space-y-4 bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm">
          <div>
            <h3 className="font-display font-bold text-sm tracking-wide uppercase text-[#0F172A]">
              2. Finishes Configuration
            </h3>
            <p className="text-xs text-[#64748B] mt-0.5 font-sans">
              Toggle finishes or add new options.
            </p>
          </div>

          {/* Active Finishes Cards List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {form.finishVariants.map((f, fIdx) => (
              <div
                key={f.name + fIdx}
                className="bg-white border border-[#E2E8F0] rounded-xl p-3.5 flex items-center justify-between shadow-sm hover:border-[#CBD5E1] transition-all"
              >
                <span className="font-bold text-xs text-[#0F172A] truncate">{f.name}</span>

                <button
                  type="button"
                  onClick={() => handleRemoveFinish(fIdx)}
                  className="flex items-center gap-1 text-[11px] font-bold text-[#EA580C] hover:text-red-600 bg-orange-50/80 hover:bg-red-50 border border-orange-200/80 hover:border-red-200 px-2.5 py-1 rounded-lg transition-colors cursor-pointer shrink-0 ml-2"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#EA580C]" />
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Add Finish Row */}
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 mt-3">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-end">
              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#64748B] mb-1.5 block">
                  Finish Name
                </label>
                <input
                  type="text"
                  value={newFinishName}
                  onChange={(e) => setNewFinishName(e.target.value)}
                  placeholder="e.g. Satin / Sandblasted"
                  className="w-full bg-white border border-[#E2E8F0] rounded-xl px-4 py-2.5 text-xs text-[#0F172A] outline-none focus:border-[#0E4FB3] shadow-sm"
                />
              </div>

              <button
                type="button"
                onClick={handleAddFinish}
                className="bg-[#1E3A8A] hover:bg-[#1E40AF] text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wide cursor-pointer transition-colors shadow-sm shrink-0 h-[42px] flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Finish
              </button>
            </div>
          </div>
        </div>


        {/* 3. DEFAULT SELECTIONS */}
        <div className="space-y-4 bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm">
          <div>
            <h3 className="font-display font-bold text-sm tracking-wide uppercase text-[#0F172A]">
              3. Default Selections
            </h3>
            <p className="text-xs text-[#64748B] mt-0.5 font-sans">
              Define the initial preview state for users.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#F8FAFC] border border-[#E2E8F0] p-5 rounded-2xl">
            <div>
              <label className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#64748B] mb-1.5 block">
                Default Color
              </label>
              <select
                value={form.defaultColor}
                onChange={(e) => form.setDefaultColor(e.target.value)}
                className="w-full bg-white border border-[#CBD5E1] rounded-xl px-4 py-2.5 text-xs font-semibold text-[#0F172A] outline-none focus:border-[#0E4FB3] cursor-pointer shadow-sm"
              >
                <option value="">Select Default Color</option>
                {activeColors.map((c) => (
                  <option key={c.name} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#64748B] mb-1.5 block">
                Default Finish
              </label>
              <select
                value={form.defaultFinish}
                onChange={(e) => form.setDefaultFinish(e.target.value)}
                className="w-full bg-white border border-[#CBD5E1] rounded-xl px-4 py-2.5 text-xs font-semibold text-[#0F172A] outline-none focus:border-[#0E4FB3] cursor-pointer shadow-sm"
              >
                <option value="">Select Default Finish</option>
                {activeFinishes.map((f) => (
                  <option key={f.name} value={f.name}>{f.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>


        {/* 4. COMBINATION IMAGES & ASSETS */}
        <div className="space-y-4 bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm">
          <div>
            <h3 className="font-display font-bold text-sm tracking-wide uppercase text-[#0F172A]">
              4. Combination Images & Assets
            </h3>
            <p className="text-xs text-[#64748B] mt-0.5 font-sans">
              Upload specific images for each active color + finish combination.
            </p>
          </div>

          <div className="space-y-3">
            {activeColors.length === 0 || activeFinishes.length === 0 ? (
              <div className="text-center py-8 bg-[#F8FAFC] border border-dashed border-[#CBD5E1] rounded-2xl text-xs text-[#64748B]">
                Please configure at least 1 color and 1 finish to define variant combinations.
              </div>
            ) : (
              activeColors.flatMap((c) =>
                activeFinishes.map((f) => {
                  const combKey = `${c.name}__${f.name}`
                  const combData = getCombinationData(c.name, f.name)

                  return (
                    <div
                      key={combKey}
                      className="bg-white border border-[#E2E8F0] rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center gap-4 shadow-sm hover:border-[#CBD5E1] transition-all"
                    >
                      {/* Left: Swatch & Name */}
                      <div className="flex items-center gap-3 w-48 shrink-0">
                        <div
                          className="w-6 h-6 rounded-full border border-gray-300 shadow-inner shrink-0"
                          style={{ backgroundColor: c.hex || '#4B5563' }}
                        />
                        <div className="min-w-0">
                          <span className="font-bold text-xs text-[#0F172A] block truncate">{c.name}</span>
                          <span className="text-[11px] text-[#64748B] block truncate">{f.name}</span>
                        </div>
                      </div>

                      {/* Middle: Image URL input */}
                      <div className="flex-1 min-w-0">
                        <input
                          type="text"
                          value={combData.imageUrl}
                          onChange={(e) => handleCombinationChange(c.name, f.name, 'imageUrl', e.target.value)}
                          placeholder="Image URL (e.g. /images/variants/...) or upload"
                          className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-2.5 text-xs text-[#0F172A] outline-none focus:border-[#0E4FB3] focus:bg-white placeholder:text-gray-400 font-sans"
                        />
                      </div>

                      {/* Right Actions: Upload Button + Enabled Checkbox */}
                      <div className="flex items-center gap-3 shrink-0">
                        <input
                          type="file"
                          accept="image/*"
                          ref={(el) => (fileInputRefs.current[combKey] = el)}
                          onChange={(e) => handleFileUpload(c.name, f.name, e)}
                          className="hidden"
                        />

                        <button
                          type="button"
                          onClick={() => handleTriggerUpload(combKey)}
                          className="border border-[#EA580C] text-[#EA580C] hover:bg-[#EA580C]/10 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition-colors shrink-0"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          Upload
                        </button>

                        <button
                          type="button"
                          onClick={() => handleCombinationChange(c.name, f.name, 'enabled', !combData.enabled)}
                          className="flex items-center gap-1.5 cursor-pointer select-none text-xs font-bold text-[#0F172A] border-none bg-transparent"
                        >
                          <div
                            className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${
                              combData.enabled ? 'bg-[#EA580C] text-white' : 'border border-[#CBD5E1] bg-white'
                            }`}
                          >
                            {combData.enabled && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          Enabled
                        </button>
                      </div>
                    </div>
                  )
                })
              )
            )}
          </div>
        </div>

      </div>
    </SectionCard>
  )
}
