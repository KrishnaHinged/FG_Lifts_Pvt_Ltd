'use client'

import { memo } from 'react'
import {
  Info,
  Sliders,
  Sparkles,
  ImageIcon,
  Palette,
  Box,
  Search,
  Eye,
  CheckCircle2
} from 'lucide-react'
import { CompletionBadge } from './shared/FieldLabel'

export default memo(function PimSidebar({
  activeSection,
  setActiveSection,
  has360View,
  completion
}) {
  const sections = [
    { id: 'pim-basic', label: 'Basic Info', icon: Info, key: 'basic' },
    { id: 'pim-specs', label: 'Specifications', icon: Sliders, key: 'specs' },
    { id: 'pim-features', label: 'Features & Apps', icon: Sparkles, key: 'features' },
    { id: 'pim-media', label: 'Media & Gallery', icon: ImageIcon, key: 'media' },
    { id: 'pim-variants', label: 'Design Variants', icon: Palette, key: 'variants' },
    ...(has360View ? [{ id: 'pim-configurator', label: '360° Configurator', icon: Box, key: 'configurator' }] : []),
    { id: 'pim-seo', label: 'SEO & Metadata', icon: Search, key: 'seo' },
    { id: 'pim-visibility', label: 'Visibility & Publish', icon: Eye, key: 'visibility' }
  ]

  const selectSectionTab = (id) => {
    setActiveSection(id)
    if (typeof window !== 'undefined') {
      const target = document.getElementById('pim-content-anchor')
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }

  return (
    <aside className="w-[230px] shrink-0 sticky top-28 self-start space-y-4 select-none hidden lg:block">
      
      {/* Navigation Card */}
      <div className="bg-white border border-[#E8E2DA] rounded-3xl p-3 shadow-[0_8px_30px_-10px_rgba(17,17,17,0.05)] space-y-1">
        <div className="px-3 py-2 border-b border-[#E8E2DA]/60 mb-2">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold text-[#6B6B6B] block">
            PIM SECTIONS
          </span>
        </div>

        {sections.map(s => {
          const active = activeSection === s.id
          const isComplete = completion.checks[s.key]
          const Icon = s.icon

          return (
            <button
              key={s.id}
              type="button"
              onClick={() => selectSectionTab(s.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl font-sans text-xs transition-all duration-200 cursor-pointer border-none outline-none select-none text-left ${
                active
                  ? 'bg-[#0E4FB3] text-white font-bold shadow-md shadow-[#0E4FB3]/20 scale-[1.02]'
                  : 'text-[#525252] hover:bg-[#F5F0EB] hover:text-[#111111]'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-white' : 'text-[#6B6B6B]'}`} />
                <span className="truncate">{s.label}</span>
              </div>

              {active ? (
                <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
              ) : (
                <CompletionBadge isComplete={isComplete} />
              )}
            </button>
          )
        })}
      </div>

      {/* Completion Meter Card */}
      <div className="bg-white border border-[#E8E2DA] rounded-2xl p-4 shadow-[0_4px_20px_-5px_rgba(17,17,17,0.03)] space-y-2">
        <div className="flex items-center justify-between text-xs font-sans">
          <span className="font-bold text-[#111111]">Form Progress</span>
          <span className="font-mono font-bold text-[#0E4FB3]">
            {completion.completedCount}/{completion.totalSections}
          </span>
        </div>

        <div className="w-full h-2 rounded-full bg-[#F5F0EB] overflow-hidden p-0.5 border border-[#E8E2DA]/60">
          <div
            className="h-full rounded-full bg-[#0E4FB3] transition-all duration-500"
            style={{ width: `${completion.percentage}%` }}
          />
        </div>
      </div>

    </aside>
  )
})
