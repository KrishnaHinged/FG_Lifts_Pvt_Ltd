'use client'

import { useState, useEffect, memo } from 'react'
import { usePimForm } from './hooks/usePimForm'
import PimSidebar from './PimSidebar'
import PimTopbar from './PimTopbar'

import BasicInfoSection from './sections/BasicInfoSection'
import SpecsSection from './sections/SpecsSection'
import FeaturesAppsSection from './sections/FeaturesAppsSection'
import MediaGallerySection from './sections/MediaGallerySection'
import DesignVariantsSection from './sections/DesignVariantsSection'
import ConfiguratorSection from './sections/ConfiguratorSection'
import SeoMetadataSection from './sections/SeoMetadataSection'
import VisibilitySection from './sections/VisibilitySection'

import { motion, AnimatePresence } from 'framer-motion'

export default memo(function PimShell({ product = null, onSubmit, isLoading = false }) {
  const form = usePimForm({ product, onSubmit, isLoading })
  const [activeSection, setActiveSection] = useState('pim-basic')

  // Keyboard shortcuts listener: Ctrl+S / Cmd+S to submit form
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        const payload = form.assemblePayload()
        onSubmit(payload)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [form, onSubmit])

  const handlePublish = (e) => {
    if (e) e.preventDefault()
    const payload = form.assemblePayload()
    onSubmit(payload)
  }

  const handleSaveDraft = (e) => {
    if (e) e.preventDefault()
    const payload = form.assemblePayload(false) // Force isActive = false for draft
    onSubmit(payload)
  }

  return (
    <div className="w-full max-w-[1340px] mx-auto select-none space-y-4">
      
      {/* Sticky Topbar */}
      <PimTopbar
        productName={form.name}
        slug={form.slug}
        isEdit={Boolean(product)}
        isLoading={isLoading}
        onSaveDraft={handleSaveDraft}
        onPublish={handlePublish}
      />

      {/* Main Layout Grid: Left Sidebar + Right Active Tab Content */}
      <div className="flex gap-8 items-start">
        
        {/* Left Sticky Sidebar Nav */}
        <PimSidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          has360View={form.has360View}
          completion={form.completion}
        />

        {/* Right Active Tab Content Area */}
        <main id="pim-content-anchor" className="flex-1 min-w-0 pb-24 scroll-mt-28">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeSection === 'pim-basic' && <BasicInfoSection form={form} />}
              {activeSection === 'pim-specs' && <SpecsSection form={form} />}
              {activeSection === 'pim-features' && <FeaturesAppsSection form={form} />}
              {activeSection === 'pim-media' && <MediaGallerySection form={form} />}
              {activeSection === 'pim-variants' && <DesignVariantsSection form={form} />}
              {activeSection === 'pim-configurator' && <ConfiguratorSection form={form} />}
              {activeSection === 'pim-seo' && <SeoMetadataSection form={form} />}
              {activeSection === 'pim-visibility' && <VisibilitySection form={form} />}
            </motion.div>
          </AnimatePresence>
        </main>

      </div>

    </div>
  )
})
