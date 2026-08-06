'use client'

import { useState } from 'react'
import {
  Settings,
  Globe,
  Phone,
  Share2,
  Save,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Building2,
  Mail,
  MessageSquare,
} from 'lucide-react'
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa6'

export default function SettingsClient({ initialSettings = {}, currentAdmin }) {
  const [formData, setFormData] = useState({
    siteName: initialSettings.siteName || 'FG Lifts Pvt. Ltd.',
    tagline: initialSettings.tagline || 'Future & Growth',
    heroTitle: initialSettings.heroTitle || 'Engineered for every vertical space.',
    contactEmail: initialSettings.contactEmail || 'info@fglifts.com',
    contactPhone: initialSettings.contactPhone || '+91 70460 55586',
    whatsappNumber: initialSettings.whatsappNumber || '+91 70460 55586',
    address: initialSettings.address || 'Surat HQ, Gujarat, India',
    city: initialSettings.city || 'Surat',
    region: initialSettings.region || 'Gujarat, India',
    mapsUrl: initialSettings.mapsUrl || 'https://maps.app.goo.gl/ajjJY7us73cBceP46',
    facebookUrl: initialSettings.facebookUrl || 'https://www.facebook.com/fgliftspvtltd',
    instagramUrl: initialSettings.instagramUrl || 'https://www.instagram.com/fgliftspvtltd',
    linkedinUrl: initialSettings.linkedinUrl || 'https://www.linkedin.com/company/fg-lifts-private-limited/',
    youtubeUrl: initialSettings.youtubeUrl || '',
    footerText: initialSettings.footerText || 'Engineering vertical mobility systems, luxury passenger elevators, industrial goods lifts, and interactive cabin designs.',
    metaDescription: initialSettings.metaDescription || 'FG Lifts Pvt. Ltd. — Premium Vertical Mobility Solutions.',
  })

  const [activeTab, setActiveTab] = useState('general') // 'general' | 'contact' | 'social'
  const [isSaving, setIsSaving] = useState(false)
  const [toast, setToast] = useState(null) // { type: 'success' | 'error', message: string }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    if (e) e.preventDefault()
    setIsSaving(true)
    setToast(null)

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()

      if (res.ok && data.success) {
        setFormData(prev => ({ ...prev, ...data.settings }))
        setToast({ type: 'success', message: 'Website settings saved successfully!' })
      } else {
        setToast({ type: 'error', message: data.error || 'Failed to update settings.' })
      }
    } catch (err) {
      console.error('Settings save error:', err)
      setToast({ type: 'error', message: 'An unexpected error occurred while saving.' })
    } finally {
      setIsSaving(false)
      setTimeout(() => {
        setToast(null)
      }, 4000)
    }
  }

  return (
    <div className="space-y-6 select-none max-w-5xl mx-auto pb-16">
      
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#0E4FB3]/10 text-[#0E4FB3] flex items-center justify-center">
              <Settings className="w-4 h-4" />
            </div>
            <h1 className="font-sans font-bold text-gray-900 text-2xl tracking-tight leading-none m-0">
              Website Settings
            </h1>
          </div>
          <p className="text-gray-500 font-sans text-sm m-0">
            Configure site-wide brand info, contact details, social links, and metadata.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSaving}
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-sans text-xs font-bold text-white bg-[#0E4FB3] hover:bg-[#0b3d8c] transition-all cursor-pointer border-none shadow-sm disabled:opacity-50"
        >
          {isSaving ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>

      {/* Alert Notification Toast */}
      {toast && (
        <div
          className={`p-4 rounded-xl text-xs font-semibold flex items-center justify-between transition-all duration-300 shadow-xs border ${
            toast.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-red-50 text-red-800 border-red-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Tabs Navigation Bar */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('general')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer border-none outline-none ${
            activeTab === 'general'
              ? 'bg-[#0E4FB3] text-white shadow-xs'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>General &amp; Branding</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('contact')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer border-none outline-none ${
            activeTab === 'contact'
              ? 'bg-[#0E4FB3] text-white shadow-xs'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Contact &amp; Address</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('social')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer border-none outline-none ${
            activeTab === 'social'
              ? 'bg-[#0E4FB3] text-white shadow-xs'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Social Media Links</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* TAB 1: GENERAL & BRANDING */}
        {activeTab === 'general' && (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider font-mono m-0 pb-2 border-b border-gray-100 flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#0E4FB3]" />
              Brand &amp; Identity Configuration
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Company / Site Name
                </label>
                <input
                  type="text"
                  value={formData.siteName}
                  onChange={(e) => handleChange('siteName', e.target.value)}
                  placeholder="FG Lifts Pvt. Ltd."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-900 outline-none focus:border-[#0E4FB3] focus:ring-1 focus:ring-[#0E4FB3] transition"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Brand Tagline
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => handleChange('tagline', e.target.value)}
                  placeholder="Future & Growth"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-900 outline-none focus:border-[#0E4FB3] focus:ring-1 focus:ring-[#0E4FB3] transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Hero Headline Text
              </label>
              <input
                type="text"
                value={formData.heroTitle}
                onChange={(e) => handleChange('heroTitle', e.target.value)}
                placeholder="Engineered for every vertical space."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-900 outline-none focus:border-[#0E4FB3] focus:ring-1 focus:ring-[#0E4FB3] transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                SEO Meta Description
              </label>
              <textarea
                rows={3}
                value={formData.metaDescription}
                onChange={(e) => handleChange('metaDescription', e.target.value)}
                placeholder="FG Lifts Pvt. Ltd. — Premium Vertical Mobility Solutions..."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-900 outline-none focus:border-[#0E4FB3] focus:ring-1 focus:ring-[#0E4FB3] transition resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Footer Company Description
              </label>
              <textarea
                rows={3}
                value={formData.footerText}
                onChange={(e) => handleChange('footerText', e.target.value)}
                placeholder="Engineering vertical mobility systems..."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-900 outline-none focus:border-[#0E4FB3] focus:ring-1 focus:ring-[#0E4FB3] transition resize-none"
              />
            </div>
          </div>
        )}

        {/* TAB 2: CONTACT & ADDRESS */}
        {activeTab === 'contact' && (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider font-mono m-0 pb-2 border-b border-gray-100 flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#0E4FB3]" />
              Official Contact &amp; Location Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-gray-400" />
                  Primary Phone
                </label>
                <input
                  type="text"
                  value={formData.contactPhone}
                  onChange={(e) => handleChange('contactPhone', e.target.value)}
                  placeholder="+91 70460 55586"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-900 outline-none focus:border-[#0E4FB3] focus:ring-1 focus:ring-[#0E4FB3] transition"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  WhatsApp Number
                </label>
                <input
                  type="text"
                  value={formData.whatsappNumber}
                  onChange={(e) => handleChange('whatsappNumber', e.target.value)}
                  placeholder="+91 70460 55586"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-900 outline-none focus:border-[#0E4FB3] focus:ring-1 focus:ring-[#0E4FB3] transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-blue-600" />
                  Support Email
                </label>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => handleChange('contactEmail', e.target.value)}
                  placeholder="info@fglifts.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-900 outline-none focus:border-[#0E4FB3] focus:ring-1 focus:ring-[#0E4FB3] transition"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-gray-400" />
                  Headquarters Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder="Surat HQ, Gujarat, India"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-900 outline-none focus:border-[#0E4FB3] focus:ring-1 focus:ring-[#0E4FB3] transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    placeholder="Surat"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-900 outline-none focus:border-[#0E4FB3] focus:ring-1 focus:ring-[#0E4FB3] transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Region / State
                  </label>
                  <input
                    type="text"
                    value={formData.region}
                    onChange={(e) => handleChange('region', e.target.value)}
                    placeholder="Gujarat, India"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-900 outline-none focus:border-[#0E4FB3] focus:ring-1 focus:ring-[#0E4FB3] transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-blue-600" />
                  Google Maps Location Link (Surat Branch)
                </label>
                <input
                  type="url"
                  value={formData.mapsUrl}
                  onChange={(e) => handleChange('mapsUrl', e.target.value)}
                  placeholder="https://maps.app.goo.gl/ajjJY7us73cBceP46"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-900 outline-none focus:border-[#0E4FB3] focus:ring-1 focus:ring-[#0E4FB3] transition"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SOCIAL MEDIA LINKS */}
        {activeTab === 'social' && (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider font-mono m-0 pb-2 border-b border-gray-100 flex items-center gap-2">
              <Share2 className="w-4 h-4 text-[#0E4FB3]" />
              Social Media Profile Links
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <FaFacebook className="w-4 h-4 text-blue-600" />
                  Facebook Page URL
                </label>
                <input
                  type="url"
                  value={formData.facebookUrl}
                  onChange={(e) => handleChange('facebookUrl', e.target.value)}
                  placeholder="https://www.facebook.com/fgliftspvtltd"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-900 outline-none focus:border-[#0E4FB3] focus:ring-1 focus:ring-[#0E4FB3] transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <FaInstagram className="w-4 h-4 text-pink-600" />
                  Instagram Profile URL
                </label>
                <input
                  type="url"
                  value={formData.instagramUrl}
                  onChange={(e) => handleChange('instagramUrl', e.target.value)}
                  placeholder="https://www.instagram.com/fgliftspvtltd"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-900 outline-none focus:border-[#0E4FB3] focus:ring-1 focus:ring-[#0E4FB3] transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <FaLinkedin className="w-4 h-4 text-blue-700" />
                  LinkedIn Company Page URL
                </label>
                <input
                  type="url"
                  value={formData.linkedinUrl}
                  onChange={(e) => handleChange('linkedinUrl', e.target.value)}
                  placeholder="https://www.linkedin.com/company/fg-lifts-private-limited/"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-900 outline-none focus:border-[#0E4FB3] focus:ring-1 focus:ring-[#0E4FB3] transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <FaYoutube className="w-4 h-4 text-red-600" />
                  YouTube Channel URL
                </label>
                <input
                  type="url"
                  value={formData.youtubeUrl}
                  onChange={(e) => handleChange('youtubeUrl', e.target.value)}
                  placeholder="https://www.youtube.com/@fglifts"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-900 outline-none focus:border-[#0E4FB3] focus:ring-1 focus:ring-[#0E4FB3] transition"
                />
              </div>
            </div>
          </div>
        )}

      </form>
    </div>
  )
}
