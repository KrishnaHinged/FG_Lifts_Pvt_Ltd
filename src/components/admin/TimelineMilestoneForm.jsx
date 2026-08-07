'use client'

import { useState, memo } from 'react'
import Image from 'next/image'
import { UploadCloud, Image as ImageIcon, Trash2, CheckCircle2, Sparkles } from 'lucide-react'
import MediaGalleryModal from '@/components/admin/MediaGalleryModal'
import { compressImage } from '@/utils/image'
import { uploadImageToMedia } from '@/utils/mediaUpload'

export default memo(function TimelineMilestoneForm({ milestone = null, onSubmit, isLoading = false }) {
  const [year, setYear] = useState(milestone?.year || '')
  const [title, setTitle] = useState(milestone?.title || '')
  const [desc, setDesc] = useState(milestone?.desc || '')
  const [image, setImage] = useState(milestone?.image || '')
  const [highlight, setHighlight] = useState(!!milestone?.highlight)
  const [sortOrder, setSortOrder] = useState(milestone?.sortOrder || 0)
  const [isActive, setIsActive] = useState(milestone ? !!milestone.isActive : true)

  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false)

  const handleDirectImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = async (event) => {
      const rawDataUrl = event.target.result
      const compressed = await compressImage(rawDataUrl, 1200, 0.8)
      const uploadedUrl = await uploadImageToMedia(compressed, file.name, 'timeline-photo')
      setImage(uploadedUrl)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {
      year: year.trim(),
      title: title.trim(),
      desc: desc.trim(),
      image: image.trim(),
      highlight,
      sortOrder: Number(sortOrder) || 0,
      isActive
    }
    onSubmit(payload)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 select-none max-w-4xl mx-auto pb-12">
      
      {/* Card 1: Core Milestone Details */}
      <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        <div className="border-b border-gray-100 pb-3">
          <h3 className="font-sans font-bold text-gray-900 text-lg m-0">
            Milestone Details
          </h3>
          <p className="font-sans text-xs text-gray-500 m-0 mt-0.5">
            Configure year, title, and historical summary text.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-4 flex flex-col gap-1.5">
            <label className="font-mono text-xs uppercase tracking-wider text-gray-600 font-bold">
              Year <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="e.g. 1993 or 2026"
              required
              className="px-4 py-2.5 rounded-xl border border-gray-300 font-mono text-sm text-gray-900 font-bold outline-none focus:border-fg-blue w-full"
            />
          </div>

          <div className="md:col-span-8 flex flex-col gap-1.5">
            <label className="font-mono text-xs uppercase tracking-wider text-gray-600 font-bold">
              Milestone Headline / Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Inception of Firozgar Elevator"
              required
              className="px-4 py-2.5 rounded-xl border border-gray-300 font-sans text-sm text-gray-900 font-bold outline-none focus:border-fg-blue w-full"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-xs uppercase tracking-wider text-gray-600 font-bold">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Summarize the technological achievement, expansion, or milestone..."
            rows={3}
            required
            className="px-4 py-2.5 rounded-xl border border-gray-300 font-sans text-sm text-gray-900 outline-none focus:border-fg-blue w-full resize-y"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[10px] uppercase tracking-wider text-gray-500 font-bold">
              Sort Priority Order
            </label>
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              placeholder="0"
              className="px-3.5 py-2 rounded-xl border border-gray-300 font-sans text-sm text-gray-900 outline-none focus:border-fg-blue w-full"
            />
          </div>

          <div className="flex items-center gap-6 pt-5 md:col-span-2">
            <label className="flex items-center gap-2 cursor-pointer font-sans text-xs font-bold text-gray-800">
              <input
                type="checkbox"
                checked={highlight}
                onChange={(e) => setHighlight(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-fg-blue focus:ring-fg-blue cursor-pointer"
              />
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Key Milestone Highlight
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer font-sans text-xs font-bold text-gray-800">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-fg-blue focus:ring-fg-blue cursor-pointer"
              />
              Active Listed
            </label>
          </div>
        </div>
      </div>

      {/* Card 2: Milestone Photo */}
      <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-4">
        <div className="border-b border-gray-100 pb-3">
          <h3 className="font-sans font-bold text-gray-900 text-base flex items-center gap-2 m-0">
            <ImageIcon className="w-4 h-4 text-fg-blue" />
            Milestone Photo / Illustration
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-6">
            {image ? (
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-gray-200 group bg-neutral-900">
                <Image
                  src={image}
                  alt={title || 'Milestone Photo'}
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => setImage('')}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-red-600 text-white cursor-pointer border-none shadow-md hover:bg-red-700 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="w-full aspect-[16/10] border-2 border-dashed border-gray-300 hover:border-fg-blue bg-gray-50 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition p-4 text-center group block">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleDirectImageUpload}
                  className="hidden"
                />
                <UploadCloud className="w-6 h-6 text-fg-blue mb-2 group-hover:scale-110 transition-transform" />
                <span className="font-sans font-bold text-xs text-gray-800">Upload Photo File</span>
              </label>
            )}
          </div>

          <div className="md:col-span-6 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => setIsMediaModalOpen(true)}
              className="py-2.5 px-4 rounded-xl bg-fg-blue text-white font-sans font-bold text-xs uppercase tracking-wider hover:bg-fg-blue/90 transition cursor-pointer border-none"
            >
              Select from Media Gallery
            </button>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Or paste direct image URL (/images/...)"
              className="px-3.5 py-2 rounded-xl border border-gray-300 font-sans text-xs outline-none focus:border-fg-blue w-full"
            />
          </div>
        </div>
      </div>

      {/* Submit bar */}
      <div className="flex justify-end bg-white border border-gray-200 rounded-2xl p-4 md:px-8 shadow-sm">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-fg-blue text-white rounded-full px-8 py-3 font-sans font-bold text-sm shadow-md hover:shadow-lg hover:bg-fg-blue/90 transition cursor-pointer border-none disabled:opacity-50"
        >
          {isLoading ? 'Saving Milestone...' : 'Save Timeline Milestone'}
        </button>
      </div>

      {/* Media Gallery Modal */}
      <MediaGalleryModal
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        onSelect={(url) => {
          setImage(url)
          setIsMediaModalOpen(false)
        }}
        title="Select Milestone Photo"
      />
    </form>
  )
})
