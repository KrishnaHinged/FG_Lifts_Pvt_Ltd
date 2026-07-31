'use client'

import { useState } from 'react'
import { Sparkles, Plus, Check, Shield, Zap, HeartHandshake, Layout } from 'lucide-react'
import SectionCard from '../shared/SectionCard'
import { FieldLabel } from '../shared/FieldLabel'

const commonFeaturesLibrary = [
  { name: 'VVVF Digital Motor Controller', category: 'Technology' },
  { name: 'Emergency Automatic Rescue Device (ARD)', category: 'Safety' },
  { name: 'Whisper-Quiet Gearless PMSM Machine', category: 'Comfort' },
  { name: '180° Curved Panoramic Glass Cabin', category: 'Design' },
  { name: 'Full-Height Infrared Light Curtain Sensors', category: 'Safety' },
  { name: 'Micro-Processor Duplex Control Network', category: 'Technology' },
  { name: 'Regenerative Clean Power Drive System', category: 'Technology' },
  { name: 'Custom Etched Champagne Gold Mirror Walls', category: 'Design' },
  { name: 'Over-Speed Safety Governor & Wedge Clamps', category: 'Safety' }
]

const availableApps = [
  { label: 'Residential', icon: Layout, desc: 'Luxury villas, penthouses, apartments' },
  { label: 'Commercial', icon: Zap, desc: 'Corporate towers, tech parks, malls' },
  { label: 'Industrial', icon: Shield, desc: 'Manufacturing plants, warehouses' },
  { label: 'Hospital', icon: HeartHandshake, desc: 'Stretcher & bed elevators' },
  { label: 'Hospitality', icon: Sparkles, desc: '5-star hotels & resorts' },
  { label: 'Luxury', icon: Sparkles, desc: 'Bespoke custom glass architectural lifts' }
]

export default function FeaturesAppsSection({ form }) {
  const [inputVal, setInputVal] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Technology')

  const categoryColors = {
    Technology: 'bg-blue-50 text-blue-700 border-blue-200',
    Safety: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Comfort: 'bg-purple-50 text-purple-700 border-purple-200',
    Design: 'bg-amber-50 text-amber-700 border-amber-200'
  }

  const addFeature = (featObj) => {
    const exists = form.features.some(f => (typeof f === 'string' ? f : f.name) === featObj.name)
    if (!exists) {
      form.setFeatures([...form.features, featObj])
    }
  }

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const name = inputVal.trim()
      if (name) {
        addFeature({ name, category: selectedCategory })
        setInputVal('')
      }
    }
  }

  const removeFeature = (idx) => {
    form.setFeatures(form.features.filter((_, i) => i !== idx))
  }

  const handleAppToggle = (appLabel) => {
    if (form.applications.includes(appLabel)) {
      form.setApplications(form.applications.filter(a => a !== appLabel))
    } else {
      form.setApplications([...form.applications, appLabel])
    }
  }

  return (
    <SectionCard
      id="pim-features"
      title="Features & Applications"
      description="Categorized engineering features and target domain suitability."
      icon={Sparkles}
    >
      <div className="space-y-8">
        
        {/* Features Input Section */}
        <div className="space-y-4">
          <FieldLabel helper="Press Enter to add tag to list">Engineering Feature Highlights</FieldLabel>
          
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2.5 rounded-2xl border border-[#E8E2DA] bg-[#F5F0EB]/60 font-sans text-xs font-bold text-[#111111] outline-none cursor-pointer"
            >
              <option value="Technology">Technology</option>
              <option value="Safety">Safety</option>
              <option value="Comfort">Comfort</option>
              <option value="Design">Design</option>
            </select>

            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Type feature (e.g. VVVF Digital Controller) and press Enter..."
              className="flex-1 px-4 py-2.5 rounded-2xl border border-[#E8E2DA] bg-white font-sans text-sm text-[#111111] outline-none focus:border-[#0E4FB3]"
            />
          </div>

          {/* Preset Library Suggestions */}
          <div className="space-y-2 pt-2">
            <span className="font-mono text-[9px] uppercase tracking-wider text-[#6B6B6B] font-bold block">
              Common Features Library (Click to add)
            </span>
            <div className="flex flex-wrap gap-2">
              {commonFeaturesLibrary.map((item, idx) => {
                const isAdded = form.features.some(f => (typeof f === 'string' ? f : f.name) === item.name)
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => addFeature(item)}
                    disabled={isAdded}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border font-sans text-xs transition-all cursor-pointer ${
                      isAdded
                        ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-default'
                        : 'bg-white text-[#525252] border-[#E8E2DA] hover:border-[#0E4FB3] hover:text-[#0E4FB3]'
                    }`}
                  >
                    {isAdded ? <Check className="w-3 h-3 text-emerald-600" /> : <Plus className="w-3 h-3" />}
                    {item.name}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Active Features Tags */}
          {form.features.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-3 border-t border-[#E8E2DA]/60">
              {form.features.map((feat, idx) => {
                const name = typeof feat === 'string' ? feat : feat.name
                const cat = typeof feat === 'string' ? 'Technology' : (feat.category || 'Technology')
                const badgeClass = categoryColors[cat] || categoryColors.Technology

                return (
                  <span
                    key={idx}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold select-none ${badgeClass}`}
                  >
                    <span className="font-mono text-[9px] uppercase tracking-wider opacity-60">[{cat}]</span>
                    {name}
                    <button
                      type="button"
                      onClick={() => removeFeature(idx)}
                      className="hover:text-red-600 font-bold border-none bg-transparent cursor-pointer ml-1 p-0"
                    >
                      ×
                    </button>
                  </span>
                )
              })}
            </div>
          )}
        </div>

        {/* Applications Card Grid */}
        <div className="space-y-3 pt-4 border-t border-[#E8E2DA]/60">
          <FieldLabel helper="Select ideal sectors for this elevator model">Target Domain Applications</FieldLabel>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {availableApps.map((app) => {
              const isChecked = form.applications.includes(app.label)
              const Icon = app.icon

              return (
                <button
                  key={app.label}
                  type="button"
                  onClick={() => handleAppToggle(app.label)}
                  className={`flex items-start gap-3 p-4 rounded-2xl border text-left cursor-pointer transition-all duration-200 ${
                    isChecked
                      ? 'border-[#0E4FB3] bg-[#0E4FB3]/[0.04] ring-1 ring-[#0E4FB3] shadow-xs'
                      : 'border-[#E8E2DA] bg-white hover:border-[#0E4FB3]/30'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    isChecked ? 'bg-[#0E4FB3] text-white' : 'bg-gray-100 text-gray-500'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>

                  <div>
                    <span className={`font-sans font-bold text-xs block ${isChecked ? 'text-[#0E4FB3]' : 'text-[#111111]'}`}>
                      {app.label}
                    </span>
                    <span className="font-sans text-[10px] text-[#6B6B6B] mt-0.5 block leading-tight">
                      {app.desc}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

      </div>
    </SectionCard>
  )
}
