'use client'

import { useState } from 'react'
import { ImageIcon, Plus, Trash2, Star, UploadCloud, FileText, Box, ArrowUp, ArrowDown } from 'lucide-react'
import SectionCard from '../shared/SectionCard'
import { FieldLabel, ToggleSwitch } from '../shared/FieldLabel'
import MediaGalleryModal from '../../MediaGalleryModal'
import { compressImage } from '@/utils/image'

export default function MediaGallerySection({ form }) {
  const [activePicker, setActivePicker] = useState(null) // { setIdx, imgIdx }

  const addPhotoSet = () => {
    form.setPhotoSets([
      ...form.photoSets,
      {
        id: `set-${Date.now()}`,
        title: `Gallery Set #${form.photoSets.length + 1}`,
        images: [{ url: '', alt: '', caption: '', isHero: false }]
      }
    ])
  }

  const removePhotoSet = (sIdx) => {
    form.setPhotoSets(form.photoSets.filter((_, idx) => idx !== sIdx))
  }

  const handleSetTitleChange = (sIdx, title) => {
    const next = [...form.photoSets]
    next[sIdx].title = title
    form.setPhotoSets(next)
  }

  const addImageToSet = (sIdx) => {
    const next = [...form.photoSets]
    next[sIdx].images.push({ url: '', alt: '', caption: '', isHero: false })
    form.setPhotoSets(next)
  }

  const removeImageFromSet = (sIdx, iIdx) => {
    const next = [...form.photoSets]
    next[sIdx].images = next[sIdx].images.filter((_, idx) => idx !== iIdx)
    form.setPhotoSets(next)
  }

  const handleImageFieldChange = (sIdx, iIdx, field, val) => {
    const next = [...form.photoSets]
    next[sIdx].images[iIdx][field] = val
    if (field === 'isHero' && val) {
      // Clear other hero stars in all sets
      next.forEach(s => s.images.forEach(img => { img.isHero = false }))
      next[sIdx].images[iIdx].isHero = true
    }
    form.setPhotoSets(next)
  }

  const moveImageInSet = (sIdx, iIdx, direction) => {
    const next = [...form.photoSets]
    const list = [...next[sIdx].images]
    const targetIdx = iIdx + direction
    if (targetIdx < 0 || targetIdx >= list.length) return
    const temp = list[iIdx]
    list[iIdx] = list[targetIdx]
    list[targetIdx] = temp
    next[sIdx].images = list
    form.setPhotoSets(next)
  }

  return (
    <SectionCard
      id="pim-media"
      title="Media & Gallery Workspace"
      description="Named photo sets, variant galleries, hero photo assignments, and technical brochure downloads."
      icon={ImageIcon}
      action={
        <button
          type="button"
          onClick={addPhotoSet}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E8E2DA] bg-white hover:bg-[#F5F0EB] font-sans font-bold text-xs text-[#0E4FB3] cursor-pointer transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Named Photo Set
        </button>
      }
    >
      <div className="space-y-8">
        
        {/* Brochure Download Card */}
        <div className="bg-[#F5F0EB]/50 border border-[#E8E2DA] rounded-2xl p-4 space-y-3">
          <FieldLabel helper="Technical brochure PDF download link">Product Specification Brochure</FieldLabel>
          <div className="flex gap-3 items-center">
            <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={form.brochureUrl}
              onChange={(e) => form.setBrochureUrl(e.target.value)}
              placeholder="e.g. /brochures/aerolux-spec.pdf"
              className="flex-1 px-4 py-2.5 rounded-xl border border-[#E8E2DA] bg-white font-sans text-xs text-[#111111] outline-none focus:border-[#0E4FB3]"
            />
          </div>
        </div>

        {/* 360° Configurator Toggle Box */}
        <div className="bg-[#0E4FB3]/[0.03] border border-[#0E4FB3]/20 rounded-2xl p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#0E4FB3]/10 text-[#0E4FB3] flex items-center justify-center shrink-0">
              <Box className="w-4 h-4" />
            </div>
            <div>
              <span className="font-sans font-bold text-xs text-[#111111] block">
                Enable Interactive 360° WebGL Cabin Configurator
              </span>
              <span className="font-sans text-[10px] text-[#6B6B6B] block mt-0.5">
                Displays real-time 3D texture viewer on the product detail page. Opens 360° Configurator sidebar section.
              </span>
            </div>
          </div>

          <ToggleSwitch
            checked={form.has360View}
            onChange={() => form.setHas360View(!form.has360View)}
          />
        </div>

        {/* Named Photo Sets List */}
        {form.photoSets.map((set, sIdx) => (
          <div key={set.id || sIdx} className="border border-[#E8E2DA] rounded-2xl p-5 space-y-4 bg-white">
            
            {/* Set Header */}
            <div className="flex items-center justify-between border-b border-[#E8E2DA]/60 pb-3">
              <input
                type="text"
                value={set.title}
                onChange={(e) => handleSetTitleChange(sIdx, e.target.value)}
                placeholder="Photo Set Title (e.g. Champagne Gold Gallery)"
                className="font-display font-bold text-sm text-[#111111] bg-transparent outline-none focus:border-[#0E4FB3] border-b border-transparent hover:border-gray-200"
              />

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => addImageToSet(sIdx)}
                  className="flex items-center gap-1 bg-[#0E4FB3]/10 text-[#0E4FB3] px-3 py-1 rounded-lg font-bold text-xs cursor-pointer border-none hover:bg-[#0E4FB3]/20 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Photo
                </button>

                <button
                  type="button"
                  onClick={() => removePhotoSet(sIdx)}
                  disabled={form.photoSets.length === 1}
                  className="p-1 rounded-lg text-gray-400 hover:text-red-600 disabled:opacity-40 cursor-pointer bg-transparent border-none"
                  title="Delete Set"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Images Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {set.images.map((img, iIdx) => (
                <div key={iIdx} className="border border-[#E8E2DA] rounded-2xl p-4 bg-[#F5F0EB]/30 space-y-3 relative group">
                  
                  {/* Actions Bar */}
                  <div className="flex items-center justify-between text-xs">
                    <button
                      type="button"
                      onClick={() => handleImageFieldChange(sIdx, iIdx, 'isHero', true)}
                      className={`flex items-center gap-1 font-mono text-[9px] uppercase font-bold px-2 py-0.5 rounded-full border cursor-pointer ${
                        img.isHero
                          ? 'bg-amber-500 text-white border-amber-500'
                          : 'bg-white text-gray-400 border-gray-200 hover:border-amber-400 hover:text-amber-500'
                      }`}
                    >
                      <Star className="w-3 h-3 fill-current" />
                      {img.isHero ? 'Primary Hero Photo' : 'Set as Hero'}
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => moveImageInSet(sIdx, iIdx, -1)}
                        disabled={iIdx === 0}
                        className="p-1 text-gray-400 hover:text-[#0E4FB3] disabled:opacity-30 border-none bg-transparent cursor-pointer"
                      >
                        <ArrowUp className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveImageInSet(sIdx, iIdx, 1)}
                        disabled={iIdx === set.images.length - 1}
                        className="p-1 text-gray-400 hover:text-[#0E4FB3] disabled:opacity-30 border-none bg-transparent cursor-pointer"
                      >
                        <ArrowDown className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeImageFromSet(sIdx, iIdx)}
                        disabled={set.images.length === 1}
                        className="p-1 text-gray-400 hover:text-red-600 disabled:opacity-30 border-none bg-transparent cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Dropzone Card */}
                  <div
                    onDragOver={(e) => { e.preventDefault(); e.stopPropagation() }}
                    onDrop={(e) => {
                      e.preventDefault(); e.stopPropagation()
                      const files = e.dataTransfer.files
                      if (files && files.length > 0) {
                        const file = files[0]
                        const reader = new FileReader()
                        reader.onload = async (evt) => {
                          const compressed = await compressImage(evt.target.result, 1200, 0.7)
                          handleImageFieldChange(sIdx, iIdx, 'url', compressed)
                        }
                        reader.readAsDataURL(file)
                      }
                    }}
                    onClick={() => setActivePicker({ sIdx, iIdx })}
                    className="relative w-full aspect-[4/3] rounded-xl border-2 border-dashed border-[#E8E2DA] hover:border-[#0E4FB3] bg-white overflow-hidden flex flex-col items-center justify-center cursor-pointer transition-all group/preview"
                  >
                    {img.url ? (
                      <div className="relative w-full h-full">
                        <img src={img.url} alt={img.alt || `Photo ${iIdx + 1}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center text-white font-sans text-xs font-bold gap-2">
                          <ImageIcon className="w-4 h-4" />
                          Change Image
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-1 text-center p-3">
                        <UploadCloud className="w-6 h-6 text-gray-400 group-hover/preview:text-[#0E4FB3] transition-colors" />
                        <span className="font-sans text-xs font-bold text-[#111111]">Click or drop file to upload</span>
                        <span className="font-mono text-[9px] text-[#0E4FB3] font-bold uppercase">Pick from Media Gallery</span>
                      </div>
                    )}
                  </div>

                  {/* Image details input */}
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={img.url?.startsWith('data:image/') ? '[Uploaded Local Image File]' : img.url}
                      onChange={(e) => handleImageFieldChange(sIdx, iIdx, 'url', e.target.value)}
                      placeholder="Image URL path..."
                      className="w-full px-3 py-1.5 rounded-xl border border-[#E8E2DA] bg-white font-mono text-[10px] text-gray-700 outline-none focus:border-[#0E4FB3]"
                    />
                    <input
                      type="text"
                      value={img.alt}
                      onChange={(e) => handleImageFieldChange(sIdx, iIdx, 'alt', e.target.value)}
                      placeholder="Alt Description Text (e.g. Front Elevation)"
                      className="w-full px-3 py-1.5 rounded-xl border border-[#E8E2DA] bg-white font-sans text-xs text-[#111111] outline-none focus:border-[#0E4FB3]"
                    />
                  </div>

                </div>
              ))}
            </div>

          </div>
        ))}

        {/* Media Gallery Modal Picker */}
        <MediaGalleryModal
          isOpen={Boolean(activePicker)}
          onClose={() => setActivePicker(null)}
          title={`Select Photo for Set #${(activePicker?.sIdx ?? 0) + 1} Image #${(activePicker?.iIdx ?? 0) + 1}`}
          onSelect={(url) => {
            if (activePicker) {
              handleImageFieldChange(activePicker.sIdx, activePicker.iIdx, 'url', url)
            }
          }}
        />

      </div>
    </SectionCard>
  )
}
