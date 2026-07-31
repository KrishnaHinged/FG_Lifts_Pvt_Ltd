'use client'

import { useState } from 'react'
import { Info, Globe, Edit2, Check } from 'lucide-react'
import SectionCard from '../shared/SectionCard'
import { FieldLabel } from '../shared/FieldLabel'

export default function BasicInfoSection({ form }) {
  const [editingSlug, setEditingSlug] = useState(false)

  return (
    <SectionCard
      id="pim-basic"
      title="Basic Info"
      description="Core identity, URLs, categories, and system descriptions."
      icon={Info}
    >
      <div className="space-y-6">
        
        {/* Name & Slug Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <FieldLabel required helper="Public product title">Product Name</FieldLabel>
            <input
              type="text"
              value={form.name}
              onChange={(e) => form.setName(e.target.value)}
              placeholder="e.g. AeroLux Premium Capsule Lift"
              required
              className="w-full px-4 py-3 rounded-2xl border border-[#E8E2DA] bg-white font-sans text-sm text-[#111111] outline-none focus:border-[#0E4FB3] transition-colors"
            />
          </div>

          <div>
            <FieldLabel required helper="URL permalink slug">Slug Identifier</FieldLabel>
            <div className="relative flex items-center">
              <input
                type="text"
                value={form.slug}
                onChange={(e) => form.setSlug(e.target.value)}
                disabled={!editingSlug}
                placeholder="e.g. aerolux-premium-capsule"
                required
                className={`w-full px-4 py-3 rounded-2xl border border-[#E8E2DA] font-mono text-xs outline-none transition-colors pr-10 ${
                  editingSlug ? 'bg-white text-[#111111] focus:border-[#0E4FB3]' : 'bg-[#F5F0EB]/60 text-gray-500'
                }`}
              />
              <button
                type="button"
                onClick={() => setEditingSlug(!editingSlug)}
                className="absolute right-3 p-1.5 rounded-lg text-gray-400 hover:text-[#0E4FB3] transition-colors border-none bg-transparent cursor-pointer"
                title={editingSlug ? 'Lock Slug' : 'Edit Slug Manually'}
              >
                {editingSlug ? <Check className="w-4 h-4 text-emerald-600" /> : <Edit2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Live URL Preview */}
        <div className="bg-[#F5F0EB]/60 border border-[#E8E2DA] rounded-2xl p-3.5 flex items-center gap-3 font-mono text-xs text-[#525252]">
          <Globe className="w-4 h-4 text-[#0E4FB3] shrink-0" />
          <span className="truncate">
            https://fglifts.com/products/<span className="text-[#0E4FB3] font-bold">{form.slug || 'your-product-slug'}</span>
          </span>
        </div>

        {/* Tagline */}
        <div>
          <FieldLabel helper="Short tagline displayed below product title">Tagline</FieldLabel>
          <input
            type="text"
            value={form.tagline}
            onChange={(e) => form.setTagline(e.target.value)}
            placeholder="e.g. Panoramic vision meets state-of-the-art vertical mobility."
            className="w-full px-4 py-3 rounded-2xl border border-[#E8E2DA] bg-white font-sans text-sm text-[#111111] outline-none focus:border-[#0E4FB3] transition-colors"
          />
        </div>

        {/* Short Summary */}
        <div>
          <FieldLabel badge="Card Text" helper="2-3 sentence overview used on catalog cards">Short Summary</FieldLabel>
          <textarea
            value={form.shortSummary}
            onChange={(e) => form.setShortSummary(e.target.value)}
            placeholder="Engineered for high-density luxury estates and landmark commercial towers. Features 180° panoramic curved glass walls and whisper-quiet gearless PMSM drive technology."
            rows={2}
            className="w-full px-4 py-3 rounded-2xl border border-[#E8E2DA] bg-white font-sans text-sm text-[#111111] outline-none focus:border-[#0E4FB3] transition-colors resize-y"
          />
        </div>

        {/* Description */}
        <div>
          <FieldLabel required helper="Full detailed narrative for product page">Detailed Description</FieldLabel>
          <textarea
            value={form.description}
            onChange={(e) => form.setDescription(e.target.value)}
            placeholder="Provide a comprehensive narrative of this vertical mobility solution, detailing design philosophy, cabin options, safety engineering, and architectural integration..."
            rows={4}
            className="w-full px-4 py-3 rounded-2xl border border-[#E8E2DA] bg-white font-sans text-sm text-[#111111] outline-none focus:border-[#0E4FB3] transition-colors resize-y"
          />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <FieldLabel required>Category</FieldLabel>
            <select
              value={form.category}
              onChange={(e) => form.setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-[#E8E2DA] bg-white font-sans text-sm outline-none focus:border-[#0E4FB3] cursor-pointer"
            >
              {['Passenger', 'Goods', 'Capsule', 'Hospital', 'Panoramic'].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <FieldLabel>Sub-Category</FieldLabel>
            <input
              type="text"
              list="subCategory-presets-pim"
              value={form.subCategory}
              onChange={(e) => form.setSubCategory(e.target.value)}
              placeholder="e.g. Standard Cabin"
              className="w-full px-4 py-3 rounded-2xl border border-[#E8E2DA] bg-white font-sans text-sm text-[#111111] outline-none focus:border-[#0E4FB3]"
            />
            <datalist id="subCategory-presets-pim">
              <option value="High Rise Lifts" />
              <option value="Low Rise Lifts" />
              <option value="MRL Passenger Lifts" />
              <option value="Standard Cabin" />
              <option value="Panoramic Cabin" />
              <option value="Traction Technology" />
              <option value="Industrial Freight Lifts" />
              <option value="Service Dumbwaiters" />
            </datalist>
          </div>

          <div>
            <FieldLabel>Tab Group Grouping</FieldLabel>
            <select
              value={form.tabGroup}
              onChange={(e) => form.setTabGroup(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-[#E8E2DA] bg-white font-sans text-sm outline-none focus:border-[#0E4FB3] cursor-pointer"
            >
              {['Systems', 'Cabins', 'Components'].map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

      </div>
    </SectionCard>
  )
}
