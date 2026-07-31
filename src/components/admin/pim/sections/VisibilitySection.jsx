'use client'

import { Eye, Sparkles, Tag, ArrowUpCircle } from 'lucide-react'
import SectionCard from '../shared/SectionCard'
import { FieldLabel, ToggleSwitch } from '../shared/FieldLabel'

export default function VisibilitySection({ form }) {
  // Find active hero image or first uploaded image from photoSets
  const heroImage = (() => {
    for (const set of form.photoSets || []) {
      const hero = set.images?.find(img => img.isHero && img.url)
      if (hero) return hero.url
    }
    const firstImg = form.photoSets?.[0]?.images?.find(img => img.url)
    if (firstImg) return firstImg.url
    return '/images/projects-collage.png'
  })()

  return (
    <SectionCard
      id="pim-visibility"
      title="Visibility & Publishing Control"
      description="Publication status, catalog priority ordering, promotional badges, and audience access rules."
      icon={Eye}
    >
      <div className="space-y-8">
        
        {/* Active Listed Status Card */}
        <div className="bg-white border border-[#E8E2DA] rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-sans font-bold text-sm text-[#111111] block">
                Catalog Listing Status
              </span>
              <span className="font-sans text-xs text-[#6B6B6B] block mt-0.5">
                Active products are published live to the public website catalog.
              </span>
            </div>

            <span className={`font-mono text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full ${
              form.isActive
                ? 'bg-emerald-500/10 text-emerald-700 border border-emerald-500/20'
                : 'bg-amber-500/10 text-amber-700 border border-amber-500/20'
            }`}>
              {form.isActive ? 'Active / Published' : 'Draft / Unpublished'}
            </span>
          </div>

          <ToggleSwitch
            checked={form.isActive}
            onChange={() => form.setIsActive(!form.isActive)}
            label="Publish Product to Public Website"
            sublabel="Toggle off to unlist from public product pages without deleting"
          />
        </div>

        {/* Featured Product Flag */}
        <div className="bg-white border border-[#E8E2DA] rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="font-sans font-bold text-xs text-[#111111] block">
                  Featured Product Spotlight
                </span>
                <span className="font-sans text-[10px] text-[#6B6B6B] block mt-0.5">
                  Displays product in high-priority homepage carousels and hero showcases.
                </span>
              </div>
            </div>

            <span className="font-mono text-[9px] uppercase font-bold text-[#0E4FB3] bg-[#0E4FB3]/10 px-2.5 py-1 rounded-full">
              Featured Slot
            </span>
          </div>

          <ToggleSwitch
            checked={form.isFeatured}
            onChange={() => form.setIsFeatured(!form.isFeatured)}
            label="Highlight as Featured System"
          />
        </div>

        {/* Overlay Badge Field & Live Mockup Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="space-y-4">
            <div>
              <FieldLabel helper="Overlay badge tag on product cards">Promotional Badge Text</FieldLabel>
              <input
                type="text"
                value={form.badge}
                onChange={(e) => form.setBadge(e.target.value)}
                placeholder="e.g. 360° View / NEW / BESTSELLER"
                className="w-full px-4 py-3 rounded-2xl border border-[#E8E2DA] bg-white font-sans text-sm text-[#111111] outline-none focus:border-[#0E4FB3]"
              />
            </div>

            <div>
              <FieldLabel helper="Catalog sort sequence index">Sort Priority Index</FieldLabel>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={form.sortOrder}
                  onChange={(e) => form.setSortOrder(e.target.value)}
                  placeholder="0"
                  className="w-full px-4 py-3 rounded-2xl border border-[#E8E2DA] bg-white font-mono text-sm text-[#111111] outline-none focus:border-[#0E4FB3]"
                />
                <ArrowUpCircle className="w-6 h-6 text-[#0E4FB3] shrink-0" />
              </div>
            </div>
          </div>

          {/* Mini Card Mockup Preview */}
          <div className="bg-[#F5F0EB]/60 border border-[#E8E2DA] rounded-3xl p-5 space-y-2">
            <span className="font-mono text-[9px] uppercase tracking-wider text-[#0E4FB3] font-bold block">
              Live Badge Overlay Card Mockup
            </span>

            <div className="bg-white border border-[#E8E2DA] rounded-2xl overflow-hidden shadow-md max-w-xs mx-auto">
              <div className="relative aspect-[4/3] bg-[#EDE8E2]">
                <img src={heroImage} alt="Mockup" className="w-full h-full object-cover" />
                {form.badge && (
                  <span className="absolute top-3 right-3 bg-[#0E4FB3] text-white font-mono text-[8px] uppercase tracking-widest font-extrabold px-3 py-1 rounded-full shadow-md">
                    {form.badge}
                  </span>
                )}
              </div>
              <div className="p-3 bg-white space-y-1">
                <span className="font-mono text-[9px] text-[#0E4FB3] uppercase font-bold">{form.category || 'Category'}</span>
                <h4 className="font-display font-bold text-xs text-[#111111] truncate m-0">{form.name || 'Product Title'}</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Schedule & Visibility Access Rules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-[#E8E2DA]">
          <div>
            <FieldLabel helper="Optional scheduled release date">Publish Date & Time</FieldLabel>
            <input
              type="datetime-local"
              value={form.publishDate}
              onChange={(e) => form.setPublishDate(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-[#E8E2DA] bg-white font-sans text-xs text-[#111111] outline-none focus:border-[#0E4FB3]"
            />
          </div>

          <div>
            <FieldLabel helper="Access permission level">Visibility Scope</FieldLabel>
            <select
              value={form.visibility}
              onChange={(e) => form.setVisibility(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-[#E8E2DA] bg-white font-sans text-xs outline-none cursor-pointer"
            >
              <option value="Public">Public (Accessible to everyone)</option>
              <option value="Private">Private (Admin only preview)</option>
              <option value="Password Protected">Password Protected (Inquiry clients)</option>
            </select>
          </div>
        </div>

      </div>
    </SectionCard>
  )
}
