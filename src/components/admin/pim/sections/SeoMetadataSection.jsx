'use client'

import { Search, Globe, Share2, Code } from 'lucide-react'
import SectionCard from '../shared/SectionCard'
import { FieldLabel, ToggleSwitch } from '../shared/FieldLabel'

export default function SeoMetadataSection({ form }) {
  const heroImage = (() => {
    for (const set of form.photoSets || []) {
      const hero = set.images?.find(img => img.isHero && img.url)
      if (hero) return hero.url
    }
    const firstImg = form.photoSets?.[0]?.images?.find(img => img.url)
    if (firstImg) return firstImg.url
    return '/images/projects-collage.png'
  })()

  const displayTitle = form.metaTitle || (form.name ? `${form.name} | FG Lifts` : 'Product Title | FG Lifts')
  const displayDesc = form.metaDescription || form.shortSummary || form.description || 'Discover our luxury elevator systems and 3D customizer.'
  const displayUrl = `https://fglifts.com/products/${form.slug || 'product-slug'}`

  const titleLength = form.metaTitle.length
  const descLength = form.metaDescription.length

  return (
    <SectionCard
      id="pim-seo"
      title="SEO & Search Metadata"
      description="Fine-tune search engine visibility, Google SERP previews, and Open Graph social sharing cards."
      icon={Search}
    >
      <div className="space-y-8">
        
        {/* Meta Title */}
        <div className="space-y-1.5">
          <FieldLabel helper="Google Search Title">Meta Title Tag</FieldLabel>
          <input
            type="text"
            value={form.metaTitle}
            onChange={(e) => form.setMetaTitle(e.target.value)}
            placeholder="e.g. AeroLux Luxury Elevator | High-Speed Traction Passenger Lifts"
            className="w-full px-4 py-3 rounded-2xl border border-[#E8E2DA] bg-white font-sans text-sm text-[#111111] outline-none focus:border-[#0E4FB3]"
          />
          <div className="flex items-center justify-between text-[10px] font-sans">
            <span className="text-[#6B6B6B]">Recommended: 50–60 characters</span>
            <span className={`font-mono font-bold ${
              titleLength >= 50 && titleLength <= 60 ? 'text-emerald-600' : 'text-amber-600'
            }`}>
              {titleLength} characters
            </span>
          </div>
        </div>

        {/* Meta Description */}
        <div className="space-y-1.5">
          <FieldLabel helper="Google Search Snippet">Meta Description</FieldLabel>
          <textarea
            value={form.metaDescription}
            onChange={(e) => form.setMetaDescription(e.target.value)}
            placeholder="e.g. Discover AeroLux, our premier high-speed traction elevator engineered for elite luxury residential and corporate skyscrapers."
            rows={3}
            className="w-full px-4 py-3 rounded-2xl border border-[#E8E2DA] bg-white font-sans text-sm text-[#111111] outline-none focus:border-[#0E4FB3] resize-y"
          />
          <div className="flex items-center justify-between text-[10px] font-sans">
            <span className="text-[#6B6B6B]">Recommended: 150–160 characters</span>
            <span className={`font-mono font-bold ${
              descLength >= 150 && descLength <= 160 ? 'text-emerald-600' : 'text-amber-600'
            }`}>
              {descLength} characters
            </span>
          </div>
        </div>

        {/* Meta Keywords */}
        <div className="space-y-1.5">
          <FieldLabel helper="Comma-separated keywords">Meta Keywords</FieldLabel>
          <input
            type="text"
            value={form.metaKeywords}
            onChange={(e) => form.setMetaKeywords(e.target.value)}
            placeholder="e.g. luxury elevators, capsule lift, passenger lift manufacturer, commercial traction lift"
            className="w-full px-4 py-3 rounded-2xl border border-[#E8E2DA] bg-white font-sans text-sm text-[#111111] outline-none focus:border-[#0E4FB3]"
          />
        </div>

        {/* Google SERP Live Preview Card */}
        <div className="bg-[#F5F0EB]/60 border border-[#E8E2DA] rounded-3xl p-5 space-y-3">
          <div className="flex items-center gap-2 border-b border-[#E8E2DA] pb-2">
            <Globe className="w-4 h-4 text-[#0E4FB3]" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#0E4FB3]">
              Live Google SERP Search Snippet Preview
            </span>
          </div>

          <div className="bg-white border border-[#E8E2DA] rounded-2xl p-4 space-y-1.5 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-sans text-[#202124]">
              <span className="w-4 h-4 rounded-full bg-[#0E4FB3] text-white flex items-center justify-center text-[9px] font-bold">FG</span>
              <span className="truncate text-xs font-normal text-[#202124]">{displayUrl}</span>
            </div>

            <h3 className="font-sans text-base font-normal text-[#1a0dab] hover:underline cursor-pointer leading-tight m-0">
              {displayTitle}
            </h3>

            <p className="font-sans text-xs text-[#4d5156] leading-normal m-0 line-clamp-2">
              {displayDesc}
            </p>
          </div>
        </div>

        {/* Open Graph & Social Sharing Section */}
        <div className="space-y-4 pt-4 border-t border-[#E8E2DA]">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-[#0E4FB3]" />
            <FieldLabel helper="Social link preview card customization">Open Graph Social Media Sharing</FieldLabel>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <FieldLabel>OG Title</FieldLabel>
              <input
                type="text"
                value={form.ogTitle}
                onChange={(e) => form.setOgTitle(e.target.value)}
                placeholder={displayTitle}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2DA] bg-white font-sans text-xs outline-none"
              />
            </div>

            <div>
              <FieldLabel>OG Image URL</FieldLabel>
              <input
                type="text"
                value={form.ogImage}
                onChange={(e) => form.setOgImage(e.target.value)}
                placeholder="/images/projects-collage.png"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2DA] bg-white font-mono text-xs outline-none"
              />
            </div>
          </div>

          {/* Social Share Card Preview */}
          <div className="bg-white border border-[#E8E2DA] rounded-2xl overflow-hidden max-w-sm shadow-md">
            <div className="w-full aspect-video bg-[#EDE8E2] relative overflow-hidden">
              <img
                src={form.ogImage || heroImage}
                alt="Social Preview"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3 bg-[#F5F0EB]/40 space-y-1">
              <span className="font-mono text-[9px] uppercase text-[#6B6B6B]">fglifts.com</span>
              <h4 className="font-sans font-bold text-xs text-[#111111] truncate m-0">
                {form.ogTitle || displayTitle}
              </h4>
              <p className="font-sans text-[10px] text-[#6B6B6B] line-clamp-2 m-0">
                {form.ogDescription || displayDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Schema & Robots Settings */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#E8E2DA]">
          <div>
            <FieldLabel>Canonical URL</FieldLabel>
            <input
              type="text"
              value={form.canonicalUrl || displayUrl}
              onChange={(e) => form.setCanonicalUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E2DA] bg-white font-mono text-xs outline-none"
            />
          </div>

          <div>
            <FieldLabel>Robots Index</FieldLabel>
            <select
              value={form.robotsIndex}
              onChange={(e) => form.setRobotsIndex(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E2DA] bg-white font-sans text-xs outline-none cursor-pointer"
            >
              <option value="index">index (Allow Google indexing)</option>
              <option value="noindex">noindex (Hide from search)</option>
            </select>
          </div>

          <div>
            <FieldLabel>Robots Follow</FieldLabel>
            <select
              value={form.robotsFollow}
              onChange={(e) => form.setRobotsFollow(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E2DA] bg-white font-sans text-xs outline-none cursor-pointer"
            >
              <option value="follow">follow (Follow links)</option>
              <option value="nofollow">nofollow (Don't follow links)</option>
            </select>
          </div>
        </div>

        <div className="pt-2">
          <ToggleSwitch
            checked={form.enableSchema}
            onChange={() => form.setEnableSchema(!form.enableSchema)}
            label="Auto-generate Schema.org Product JSON-LD Markup"
            sublabel="Injects structured rich data for Google shopping and search snippets"
          />
        </div>

      </div>
    </SectionCard>
  )
}
