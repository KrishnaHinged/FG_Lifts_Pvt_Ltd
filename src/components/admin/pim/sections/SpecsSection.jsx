'use client'

import { useState } from 'react'
import { Sliders, Plus, Trash2, ArrowUp, ArrowDown, Copy, Eye } from 'lucide-react'
import SectionCard from '../shared/SectionCard'
import { FieldLabel } from '../shared/FieldLabel'

const presetSpecs = [
  { group: 'Performance', items: [{ key: 'Capacity', value: '800 kg - 1600 kg' }, { key: 'Speed', value: '1.0 m/s - 2.5 m/s' }] },
  { group: 'Dimensions', items: [{ key: 'Max Floors', value: '40 Floors' }, { key: 'Car Size', value: '1400mm W x 1600mm D x 2200mm H' }] },
  { group: 'Electrical & Drive', items: [{ key: 'Drive Type', value: 'VVVF Gearless PMSM Motor' }, { key: 'Power Supply', value: '415V, 3-Phase, 50Hz' }] },
  { group: 'Safety Systems', items: [{ key: 'Emergency Rescue', value: 'Automatic Rescue Device (ARD)' }, { key: 'Braking System', value: 'Dual-Disc Electromagnetic Safety Brake' }] }
]

export default function SpecsSection({ form }) {
  const [showPreview, setShowPreview] = useState(false)

  const addGroup = () => {
    form.setSpecGroups([
      ...form.specGroups,
      { title: 'New Group', items: [{ key: '', value: '' }] }
    ])
  }

  const removeGroup = (gIdx) => {
    form.setSpecGroups(form.specGroups.filter((_, idx) => idx !== gIdx))
  }

  const handleGroupTitleChange = (gIdx, title) => {
    const next = [...form.specGroups]
    next[gIdx].title = title
    form.setSpecGroups(next)
  }

  const addRow = (gIdx) => {
    const next = [...form.specGroups]
    next[gIdx].items.push({ key: '', value: '' })
    form.setSpecGroups(next)
  }

  const removeRow = (gIdx, rIdx) => {
    const next = [...form.specGroups]
    next[gIdx].items = next[gIdx].items.filter((_, idx) => idx !== rIdx)
    form.setSpecGroups(next)
  }

  const handleRowChange = (gIdx, rIdx, field, val) => {
    const next = [...form.specGroups]
    next[gIdx].items[rIdx][field] = val
    form.setSpecGroups(next)
  }

  const moveRow = (gIdx, rIdx, direction) => {
    const next = [...form.specGroups]
    const items = [...next[gIdx].items]
    const targetIdx = rIdx + direction
    if (targetIdx < 0 || targetIdx >= items.length) return
    const temp = items[rIdx]
    items[rIdx] = items[targetIdx]
    items[targetIdx] = temp
    next[gIdx].items = items
    form.setSpecGroups(next)
  }

  const handleCopyPreset = (presetGroup) => {
    form.setSpecGroups(presetSpecs)
  }

  return (
    <SectionCard
      id="pim-specs"
      title="Specifications"
      description="Technical metrics organized into structured specification groups."
      icon={Sliders}
      action={
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleCopyPreset()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E8E2DA] bg-white hover:bg-[#F5F0EB] font-sans font-bold text-xs text-[#525252] cursor-pointer transition-colors"
          >
            <Copy className="w-3.5 h-3.5 text-[#0E4FB3]" />
            Quick-Fill Presets
          </button>

          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E8E2DA] bg-white hover:bg-[#F5F0EB] font-sans font-bold text-xs text-[#525252] cursor-pointer transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-[#0E4FB3]" />
            {showPreview ? 'Hide Live Preview' : 'Show Live Preview'}
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        
        {/* Spec Groups Empty State */}
        {form.specGroups.length === 0 && (
          <div className="py-12 border-2 border-dashed border-[#E8E2DA] rounded-2xl flex flex-col items-center justify-center text-center p-6 bg-[#F5F0EB]/30 space-y-3">
            <Sliders className="w-8 h-8 text-gray-400" />
            <div>
              <h4 className="font-sans font-bold text-sm text-[#111111] m-0">No Specifications Added</h4>
              <p className="font-sans text-xs text-[#6B6B6B] mt-1 m-0">
                Specifications are optional. Click below or use quick-fill presets to add specs for this system.
              </p>
            </div>
            <button
              type="button"
              onClick={addGroup}
              className="mt-2 inline-flex items-center gap-1.5 bg-[#0E4FB3] text-white px-4 py-2 rounded-xl font-bold text-xs cursor-pointer border-none shadow-md hover:bg-[#0b3d8f] transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Specification Group
            </button>
          </div>
        )}

        {/* Spec Groups */}
        {form.specGroups.map((group, gIdx) => (
          <div key={gIdx} className="bg-[#F5F0EB]/40 border border-[#E8E2DA] rounded-2xl p-5 space-y-4">
            
            {/* Group Header */}
            <div className="flex items-center justify-between gap-3">
              <input
                type="text"
                value={group.title}
                onChange={(e) => handleGroupTitleChange(gIdx, e.target.value)}
                placeholder="Group Header (e.g. Performance)"
                className="font-display font-bold text-sm text-[#111111] bg-white border border-[#E8E2DA] rounded-xl px-3 py-1.5 outline-none focus:border-[#0E4FB3]"
              />

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => addRow(gIdx)}
                  className="flex items-center gap-1 bg-[#0E4FB3]/10 text-[#0E4FB3] px-3 py-1 rounded-lg font-bold text-xs cursor-pointer border-none hover:bg-[#0E4FB3]/20 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Metric
                </button>

                <button
                  type="button"
                  onClick={() => removeGroup(gIdx)}
                  className="p-1 rounded-lg text-gray-400 hover:text-red-600 cursor-pointer bg-transparent border-none"
                  title="Delete Group"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Spec Rows */}
            <div className="space-y-2.5">
              {group.items.map((item, rIdx) => (
                <div key={rIdx} className="flex items-center gap-2">
                  
                  {/* Up/Down buttons */}
                  <div className="flex flex-col gap-0.5">
                    <button
                      type="button"
                      onClick={() => moveRow(gIdx, rIdx, -1)}
                      disabled={rIdx === 0}
                      className="p-1 text-gray-400 hover:text-[#0E4FB3] disabled:opacity-30 border-none bg-transparent cursor-pointer"
                    >
                      <ArrowUp className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveRow(gIdx, rIdx, 1)}
                      disabled={rIdx === group.items.length - 1}
                      className="p-1 text-gray-400 hover:text-[#0E4FB3] disabled:opacity-30 border-none bg-transparent cursor-pointer"
                    >
                      <ArrowDown className="w-3 h-3" />
                    </button>
                  </div>

                  <input
                    type="text"
                    value={item.key}
                    onChange={(e) => handleRowChange(gIdx, rIdx, 'key', e.target.value)}
                    placeholder="Key (e.g. Capacity)"
                    className="flex-1 px-3.5 py-2 rounded-xl border border-[#E8E2DA] bg-white font-sans text-xs outline-none focus:border-[#0E4FB3]"
                  />

                  <input
                    type="text"
                    value={item.value}
                    onChange={(e) => handleRowChange(gIdx, rIdx, 'value', e.target.value)}
                    placeholder="Value (e.g. 800 kg - 1600 kg)"
                    className="flex-1 px-3.5 py-2 rounded-xl border border-[#E8E2DA] bg-white font-sans text-xs outline-none focus:border-[#0E4FB3]"
                  />

                  <button
                    type="button"
                    onClick={() => removeRow(gIdx, rIdx)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 cursor-pointer bg-transparent border-none"
                    title="Delete Row"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                </div>
              ))}
            </div>

          </div>
        ))}

        {/* Add Group Button */}
        {form.specGroups.length > 0 && (
          <button
            type="button"
            onClick={addGroup}
            className="w-full py-3 rounded-2xl border-2 border-dashed border-[#E8E2DA] hover:border-[#0E4FB3] text-[#0E4FB3] font-sans font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors bg-white"
          >
            <Plus className="w-4 h-4" />
            Add New Specification Group Header
          </button>
        )}

        {/* Live Specs Frontend Card Preview */}
        {showPreview && (
          <div className="mt-6 border border-[#E8E2DA] rounded-3xl p-6 bg-white shadow-lg space-y-4">
            <div className="flex items-center gap-2 border-b border-[#E8E2DA] pb-3">
              <Eye className="w-4 h-4 text-[#0E4FB3]" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#0E4FB3]">
                Frontend Detail Page Specs Preview
              </span>
            </div>

            <div className="space-y-4">
              {form.specGroups.map((group, gIdx) => (
                <div key={gIdx} className="space-y-2">
                  <h4 className="font-mono text-[10px] uppercase font-bold tracking-widest text-[#6B6B6B]">
                    {group.title}
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {group.items.map((item, rIdx) => (
                      <div key={rIdx} className="bg-[#F5F0EB]/60 p-3 rounded-xl flex flex-col justify-between">
                        <span className="font-mono text-[9px] uppercase text-[#6B6B6B]">{item.key || 'Metric'}</span>
                        <span className="font-sans font-bold text-xs text-[#111111] mt-1">{item.value || 'Value'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </SectionCard>
  )
}
