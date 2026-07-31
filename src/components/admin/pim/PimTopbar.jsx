'use client'

import { memo } from 'react'
import Link from 'next/link'
import { ExternalLink, Save, ArrowLeft, Send } from 'lucide-react'

export default memo(function PimTopbar({
  productName,
  slug,
  isEdit = false,
  isLoading = false,
  onSaveDraft,
  onPublish
}) {
  return (
    <div className="sticky top-0 z-30 bg-[#F5F0EB]/90 backdrop-blur-md border-b border-[#E8E2DA] py-3.5 px-6 -mx-6 mb-8 flex items-center justify-between gap-4 select-none">
      
      {/* Left: Back & Live Name */}
      <div className="flex items-center gap-3 min-w-0">
        <Link
          href="/admin/products"
          className="w-9 h-9 rounded-xl border border-[#E8E2DA] bg-white hover:bg-[#F5F0EB] text-[#6B6B6B] hover:text-[#111111] flex items-center justify-center transition-colors shrink-0 no-underline"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="font-display font-bold text-[#111111] text-lg leading-tight truncate m-0">
              {productName || (isEdit ? 'Edit Product' : 'Untitled Product')}
            </h1>
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0" title="Draft changes" />
          </div>

          <span className="font-mono text-[10px] text-[#6B6B6B] truncate">
            {slug ? `/products/${slug}` : 'Generating URL...'}
          </span>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2.5 shrink-0">
        
        {/* Preview Button */}
        {slug && (
          <Link
            href={`/products/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#E8E2DA] bg-white hover:bg-[#F5F0EB] text-[#111111] font-sans font-bold text-xs cursor-pointer transition-colors no-underline"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#0E4FB3]" />
            Preview
          </Link>
        )}

        {/* Save Draft */}
        <button
          type="button"
          onClick={onSaveDraft}
          disabled={isLoading}
          className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#E8E2DA] bg-white hover:bg-[#F5F0EB] text-[#525252] hover:text-[#111111] font-sans font-bold text-xs cursor-pointer transition-colors border-none disabled:opacity-50"
        >
          <Save className="w-3.5 h-3.5" />
          Save Draft
        </button>

        {/* Publish / Update CTA */}
        <button
          type="button"
          onClick={onPublish}
          disabled={isLoading}
          className="bg-[#E8600A] hover:bg-[#d55406] text-white rounded-full px-6 py-2.5 font-sans font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer border-none outline-none disabled:opacity-50 flex items-center gap-2"
        >
          {isLoading ? (
            <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Send className="w-3.5 h-3.5" />
          )}
          {isLoading ? 'Saving...' : (isEdit ? 'Update Product' : 'Publish Product')}
        </button>

      </div>

    </div>
  )
})
