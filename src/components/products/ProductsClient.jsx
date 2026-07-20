'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import ProductGrid from './ProductGrid'

const tabOptions = [
  { id: 'Systems', label: 'Our Systems' },
  { id: 'Cabins', label: 'Luxury Cabins' },
  { id: 'Components', label: 'Components & Kits' }
]

const categoryOptions = {
  Systems: ['All', 'Passenger', 'Goods', 'Capsule', 'Home', 'Hospital'],
  Cabins: ['All', 'Standard', 'Premium', 'Luxury', 'Bespoke'],
  Components: ['All', 'Control Panels', 'Safety Devices', 'Cabin Parts']
}

const capacityOptions = ['All', '400 kg+', '680 kg+', '1000 kg+', '2000 kg+']
const speedOptions = ['All', '1.0 m/s+', '1.5 m/s+', '2.0 m/s+']

export default function ProductsClient({ initialProducts = [] }) {
  const [activeTab, setActiveTab] = useState('Systems')
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeCapacity, setActiveCapacity] = useState('All')
  const [activeSpeed, setActiveSpeed] = useState('All')
  
  const [filteredProducts, setFilteredProducts] = useState([])
  const [openDropdown, setOpenDropdown] = useState(null)
  
  const catalogRef = useRef(null)

  // Reset filter selections when tab shifts
  useEffect(() => {
    setActiveCategory('All')
    setActiveCapacity('All')
    setActiveSpeed('All')
  }, [activeTab])

  // Filter products reactively when selections change
  useEffect(() => {
    let list = initialProducts || []
    
    // 1. Filter by category group (tabGroup)
    list = list.filter((p) => p.tabGroup === activeTab)

    // 2. Filter by lift type (category) if not 'All'
    if (activeCategory !== 'All') {
      list = list.filter(
        (p) => p.category?.toLowerCase() === activeCategory.toLowerCase()
      )
    }

    // 3. Filter by capacity spec
    if (activeCapacity !== 'All') {
      const minCap = parseInt(activeCapacity.replace(/\D/g, ''))
      list = list.filter((p) => {
        const capSpec = p.specifications?.find(s => s.key === 'Capacity')?.value || ''
        const matches = capSpec.match(/\d+/g)
        if (!matches) return false
        const maxProductCap = Math.max(...matches.map(Number))
        return maxProductCap >= minCap
      })
    }

    // 4. Filter by speed spec
    if (activeSpeed !== 'All') {
      const minSpeed = parseFloat(activeSpeed.replace(/[^\d.]/g, ''))
      list = list.filter((p) => {
        const speedSpec = p.specifications?.find(s => s.key === 'Speed')?.value || ''
        const matches = speedSpec.match(/\d+(\.\d+)?/g)
        if (!matches) return false
        const maxProductSpeed = Math.max(...matches.map(Number))
        return maxProductSpeed >= minSpeed
      })
    }

    setFilteredProducts(list)
  }, [activeTab, activeCategory, activeCapacity, activeSpeed, initialProducts])

  // Scroll to catalog section on Search button click
  const handleSearchScroll = () => {
    setOpenDropdown(null)
    if (catalogRef.current) {
      catalogRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Close dropdowns on backdrop click
  useEffect(() => {
    const handleOutsideClick = () => setOpenDropdown(null)
    window.addEventListener('click', handleOutsideClick)
    return () => window.removeEventListener('click', handleOutsideClick)
  }, [])

  return (
    <div className="min-h-screen bg-[#F5F0EB] pb-24 relative select-none">
      

      


      <section className="relative pt-32 pb-16 px-3 sm:px-4 lg:px-6">
        <div className="max-w-[2400px] mx-auto relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-[40vh] sm:h-[50vh] md:h-[55vh] rounded-[2rem] sm:rounded-[3rem] overflow-hidden border border-[#E8E2DA] bg-[#EDE8E2]/50 shadow-md flex items-center p-8 sm:p-12 md:p-16 lg:p-20"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/hero-bg.jpg"
                alt="Premium Elevator Solutions"
                fill
                priority
                className="object-cover object-center scale-[1.01]"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Banner Text Overlays */}
            <div className="relative z-10 text-left max-w-2xl text-white">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-white/60 uppercase mb-4"
              >
                FG Lift Pvt Ltd &middot; Catalog
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="m-0 font-display text-4xl sm:text-5xl lg:text-7xl font-bold uppercase tracking-tight leading-[0.95]"
              >
                Enjoy Your <br />
                <span className="italic font-normal text-[#E8A840] font-serif tracking-normal lowercase first-letter:uppercase">Dream Ascent</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="m-0 mt-4 text-sm sm:text-base text-white/70 max-w-md font-normal leading-relaxed"
              >
                Explore customized elevator solutions designed with state-of-the-art engineering, architectural aesthetics, and silent motion.
              </motion.p>
            </div>

            {/* Grid overlay detail */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
          </motion.div>

          {/* ── 2. Glassmorphic Filter & Configurator Bar ── */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2 lg:translate-y-1/2 w-full lg:max-w-[1000px] mt-6 lg:mt-0 z-20 px-4 lg:px-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full bg-white/95 lg:bg-white/75 backdrop-blur-xl border border-[#E8E2DA] rounded-[1.5rem] lg:rounded-full p-4 lg:py-3 lg:pl-8 lg:pr-3 shadow-[0_16px_40px_-12px_rgba(17,17,17,0.08)] flex flex-col lg:flex-row items-stretch lg:items-center gap-4 lg:gap-0 justify-between">
              
              {/* Col 1: Category */}
              <div 
                onClick={() => setOpenDropdown(openDropdown === 'tabGroup' ? null : 'tabGroup')}
                className="flex-1 flex flex-col items-start cursor-pointer border-b lg:border-b-0 lg:border-r border-[#E8E2DA]/60 pb-3 lg:pb-0 lg:pr-6 select-none relative"
              >
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#9A9A9A] mb-0.5">Category</span>
                <div className="flex items-center justify-between w-full">
                  <span className="font-display text-sm font-semibold text-[#111111] truncate">
                    {tabOptions.find(t => t.id === activeTab)?.label}
                  </span>
                  <svg className={`w-3.5 h-3.5 text-[#6B6B6B] transition-transform duration-200 ${openDropdown === 'tabGroup' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                
                {/* Category Dropdown menu */}
                <AnimatePresence>
                  {openDropdown === 'tabGroup' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 right-0 lg:left-[-16px] lg:right-auto lg:w-[220px] top-[100%] mt-3 bg-white border border-[#E8E2DA] rounded-xl shadow-lg p-2 z-50 overflow-hidden"
                    >
                      {tabOptions.map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => {
                            setActiveTab(opt.id)
                            setOpenDropdown(null)
                          }}
                          className={`w-full text-left font-mono text-[10px] uppercase tracking-wider px-3.5 py-2.5 rounded-lg transition-colors duration-150 ${activeTab === opt.id ? 'bg-[#0E4FB3] text-white font-bold' : 'hover:bg-neutral-100 text-[#111111]'}`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Col 2: Type */}
              <div 
                onClick={() => setOpenDropdown(openDropdown === 'category' ? null : 'category')}
                className="flex-1 flex flex-col items-start cursor-pointer border-b lg:border-b-0 lg:border-r border-[#E8E2DA]/60 pb-3 lg:pb-0 lg:px-6 select-none relative"
              >
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#9A9A9A] mb-0.5">System Type</span>
                <div className="flex items-center justify-between w-full">
                  <span className="font-display text-sm font-semibold text-[#111111] truncate">
                    {activeCategory === 'All' ? 'All Types' : activeCategory}
                  </span>
                  <svg className={`w-3.5 h-3.5 text-[#6B6B6B] transition-transform duration-200 ${openDropdown === 'category' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                
                {/* Type Dropdown menu */}
                <AnimatePresence>
                  {openDropdown === 'category' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 right-0 lg:left-2 lg:right-auto lg:w-[220px] top-[100%] mt-3 bg-white border border-[#E8E2DA] rounded-xl shadow-lg p-2 z-50 overflow-hidden"
                    >
                      {categoryOptions[activeTab].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => {
                            setActiveCategory(opt)
                            setOpenDropdown(null)
                          }}
                          className={`w-full text-left font-mono text-[10px] uppercase tracking-wider px-3.5 py-2.5 rounded-lg transition-colors duration-150 ${activeCategory === opt ? 'bg-[#0E4FB3] text-white font-bold' : 'hover:bg-neutral-100 text-[#111111]'}`}
                        >
                          {opt === 'All' ? 'All Types' : opt}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Col 3: Capacity */}
              <div 
                onClick={() => setOpenDropdown(openDropdown === 'capacity' ? null : 'capacity')}
                className="flex-1 flex flex-col items-start cursor-pointer border-b lg:border-b-0 lg:border-r border-[#E8E2DA]/60 pb-3 lg:pb-0 lg:px-6 select-none relative"
              >
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#9A9A9A] mb-0.5">Duty Load</span>
                <div className="flex items-center justify-between w-full">
                  <span className="font-display text-sm font-semibold text-[#111111] truncate">
                    {activeCapacity === 'All' ? 'Any Load' : activeCapacity}
                  </span>
                  <svg className={`w-3.5 h-3.5 text-[#6B6B6B] transition-transform duration-200 ${openDropdown === 'capacity' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                
                {/* Capacity Dropdown menu */}
                <AnimatePresence>
                  {openDropdown === 'capacity' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 right-0 lg:left-2 lg:right-auto lg:w-[220px] top-[100%] mt-3 bg-white border border-[#E8E2DA] rounded-xl shadow-lg p-2 z-50 overflow-hidden"
                    >
                      {capacityOptions.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => {
                            setActiveCapacity(opt)
                            setOpenDropdown(null)
                          }}
                          className={`w-full text-left font-mono text-[10px] uppercase tracking-wider px-3.5 py-2.5 rounded-lg transition-colors duration-150 ${activeCapacity === opt ? 'bg-[#0E4FB3] text-white font-bold' : 'hover:bg-neutral-100 text-[#111111]'}`}
                        >
                          {opt === 'All' ? 'Any Load' : opt}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Col 4: Speed */}
              <div 
                onClick={() => setOpenDropdown(openDropdown === 'speed' ? null : 'speed')}
                className="flex-1 flex flex-col items-start cursor-pointer pb-3 lg:pb-0 lg:pl-6 select-none relative"
              >
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#9A9A9A] mb-0.5">Velocity</span>
                <div className="flex items-center justify-between w-full">
                  <span className="font-display text-sm font-semibold text-[#111111] truncate">
                    {activeSpeed === 'All' ? 'Any Speed' : activeSpeed}
                  </span>
                  <svg className={`w-3.5 h-3.5 text-[#6B6B6B] transition-transform duration-200 ${openDropdown === 'speed' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                
                {/* Speed Dropdown menu */}
                <AnimatePresence>
                  {openDropdown === 'speed' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 right-0 lg:left-auto lg:right-[-16px] lg:w-[220px] top-[100%] mt-3 bg-white border border-[#E8E2DA] rounded-xl shadow-lg p-2 z-50 overflow-hidden"
                    >
                      {speedOptions.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => {
                            setActiveSpeed(opt)
                            setOpenDropdown(null)
                          }}
                          className={`w-full text-left font-mono text-[10px] uppercase tracking-wider px-3.5 py-2.5 rounded-lg transition-colors duration-150 ${activeSpeed === opt ? 'bg-[#0E4FB3] text-white font-bold' : 'hover:bg-neutral-100 text-[#111111]'}`}
                        >
                          {opt === 'All' ? 'Any Speed' : opt}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Action Button: Search */}
              <button 
                onClick={handleSearchScroll}
                className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-[#111111] hover:bg-[#0E4FB3] text-white flex items-center justify-center flex-shrink-0 cursor-pointer transition-all duration-300 hover:scale-105 outline-none border-none shadow-sm hover:shadow-[0_8px_20px_-6px_rgba(14,79,179,0.5)] self-end lg:self-center"
              >
                <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

            </div>
          </motion.div>

        </div>
      </section>

      {/* ── 3. Product Catalog Grid Section ── */}
      <section ref={catalogRef} className="pt-24 pb-16 px-6 sm:px-12 lg:px-24 scroll-mt-6">
        <div className="max-w-[1200px] mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="font-mono text-[10px] tracking-[0.3em] text-[#6B6B6B] uppercase mb-3 block">
              Featured Catalog
            </span>
            <h2 className="m-0 font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight text-[#111111]">
              Popular Systems
            </h2>
            <div className="w-12 h-0.5 bg-[#0E4FB3] mx-auto mt-5" />
          </div>

          {/* Product Grid / Empty State */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${activeCategory}-${activeCapacity}-${activeSpeed}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              {filteredProducts.length > 0 ? (
                <ProductGrid products={filteredProducts} />
              ) : (
                <div className="text-center py-24 border border-dashed border-[#E8E2DA] rounded-[2rem] bg-white/20">
                  <p className="font-mono text-[11px] text-[#9A9A9A] tracking-wider uppercase m-0 mb-2">
                    No matching systems found
                  </p>
                  <button 
                    onClick={() => {
                      setActiveCategory('All')
                      setActiveCapacity('All')
                      setActiveSpeed('All')
                    }}
                    className="font-mono text-[10px] uppercase text-[#0E4FB3] tracking-widest bg-transparent border-none outline-none font-bold cursor-pointer"
                  >
                    Reset filters &times;
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* ── 4. Testimonial Section ── */}
      <section className="py-20 px-6 sm:px-12 lg:px-24">
        <div className="max-w-[1200px] mx-auto">
          
          <div className="text-center mb-16">
            <span className="font-mono text-[10px] tracking-[0.3em] text-[#6B6B6B] uppercase mb-3 block">
              Testimonials
            </span>
            <h2 className="m-0 font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight text-[#111111]">
              What our clients say
            </h2>
            <div className="w-12 h-0.5 bg-[#0E4FB3] mx-auto mt-5" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Review 1 */}
            <div className="bg-white border border-[#E8E2DA]/50 rounded-[2rem] p-8 flex flex-col justify-between shadow-xs">
              <p className="m-0 text-sm sm:text-base text-[#6B6B6B] leading-relaxed font-normal italic">
                "The AeroLux capsule elevator transformed our shopping atrium into a futuristic experience. Exceptional craftsmanship and incredibly silent operation."
              </p>
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-[#E8E2DA]/40">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0E4FB3] to-[#1A6BFF] text-white flex items-center justify-center font-mono text-xs font-bold shadow-xs">
                  SP
                </div>
                <div>
                  <h5 className="m-0 font-display text-sm font-semibold text-[#111111]">Sonal Patel</h5>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#9A9A9A]">Lead Architect, Surat</span>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-white border border-[#E8E2DA]/50 rounded-[2rem] p-8 flex flex-col justify-between shadow-xs">
              <p className="m-0 text-sm sm:text-base text-[#6B6B6B] leading-relaxed font-normal italic">
                "Quiet, reliable, and highly energy-efficient. Our highrise residents love the smooth acceleration and deceleration of the Quantum gearless passenger lift."
              </p>
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-[#E8E2DA]/40">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E8A840] to-[#E59A1B] text-[#111111] flex items-center justify-center font-mono text-xs font-bold shadow-xs">
                  RM
                </div>
                <div>
                  <h5 className="m-0 font-display text-sm font-semibold text-[#111111]">Rajesh Mehta</h5>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#9A9A9A]">Developer, Highrise Builders</span>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-white border border-[#E8E2DA]/50 rounded-[2rem] p-8 flex flex-col justify-between shadow-xs">
              <p className="m-0 text-sm sm:text-base text-[#6B6B6B] leading-relaxed font-normal italic">
                "Their 24/7 support team and commitment to strict safety standards made FG Lifts our primary vertical mobility partner for corporate warehouse developments."
              </p>
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-[#E8E2DA]/40">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#333] to-[#111] text-white flex items-center justify-center font-mono text-xs font-bold shadow-xs">
                  VS
                </div>
                <div>
                  <h5 className="m-0 font-display text-sm font-semibold text-[#111111]">Vikram Shah</h5>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#9A9A9A]">Director, Apex Logistics</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 5. Reward / CTA Card Section ── */}
      <section className="py-12 px-6 sm:px-12 lg:px-24">
        <div className="max-w-[1200px] mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full bg-white border border-[#E8E2DA]/80 rounded-[2rem] sm:rounded-[3rem] p-10 sm:p-14 lg:p-20 text-center relative overflow-hidden shadow-xs"
          >
            {/* Subtle background glow */}
            <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-[#0E4FB3]/[0.02] blur-[80px] pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-[#0E4FB3] uppercase font-bold mb-4">
                Partner with FG Lifts
              </span>
              
              <h3 className="m-0 font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-[#111111] leading-tight">
                Join Rewards & Discover <br />
                <span className="text-[#0E4FB3] italic font-normal font-serif tracking-normal lowercase first-letter:uppercase">Exclusive Options</span> On Your Project
              </h3>
              
              <p className="m-0 mt-4 text-sm sm:text-base text-[#6B6B6B] font-normal leading-relaxed">
                Connect with our vertical engineering consultants today to access custom specifications, luxury design catalogs, and contract pricing configurations.
              </p>
              
              <a 
                href="/contact"
                className="mt-8 group relative px-8 py-4 rounded-full bg-[#0E4FB3] text-white text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 overflow-hidden shadow-xs hover:shadow-[0_8px_24px_-8px_rgba(14,79,179,0.5)] hover:scale-[1.02]"
              >
                <span className="relative z-10">Get a Free Consultation</span>
                <svg className="w-3.5 h-3.5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <span className="absolute inset-0 bg-[#111111] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              </a>
            </div>

            {/* Fine architectural detail overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.008)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.008)_1px,transparent_1px)] bg-[size:15px_15px] pointer-events-none" />
          </motion.div>

        </div>
      </section>

    </div>
  )
}
