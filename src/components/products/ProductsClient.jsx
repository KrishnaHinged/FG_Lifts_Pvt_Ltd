'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import ProductGrid from './ProductGrid'
import { Search, ChevronDown, SlidersHorizontal, ArrowRight, Quote, Star } from 'lucide-react'

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

  // Count active filters
  const activeFilterCount = [activeCategory, activeCapacity, activeSpeed].filter(v => v !== 'All').length

  return (
    <div className="min-h-screen bg-[#F5F0EB] pb-0 relative select-none">
      
      {/* ── 1. Editorial Hero Section ── */}
      <section className="relative pt-28 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Ambient floating orbs */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <motion.div
            animate={{ x: [0, 40, -20, 0], y: [0, -35, 30, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-[10%] -left-[8%] w-[45vw] h-[45vw] rounded-full bg-[#0E4FB3]/[0.025] blur-[130px]"
          />
          <motion.div
            animate={{ x: [0, -30, 35, 0], y: [0, 45, -20, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-[15%] -right-[8%] w-[40vw] h-[40vw] rounded-full bg-[#E8A840]/[0.03] blur-[100px]"
          />
        </div>

        <div className="max-w-[1380px] mx-auto relative z-10">
          
          {/* Hero Banner Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-[42vh] sm:h-[50vh] md:h-[55vh] rounded-[2rem] sm:rounded-[3rem] overflow-hidden border border-[#E8E2DA] shadow-[0_20px_60px_-15px_rgba(17,17,17,0.08)] flex items-end"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/hero-bg.jpg"
                alt="Premium Elevator Solutions"
                fill
                priority
                className="object-cover object-center"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
            </div>

            {/* Banner Text Overlays */}
            <div className="relative z-10 w-full p-8 sm:p-12 md:p-16 lg:p-20">
              <div className="max-w-2xl">
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-block font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-white/50 uppercase mb-4"
                >
                  FG Lift Pvt Ltd &middot; Catalog
                </motion.span>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="m-0 font-display text-4xl sm:text-5xl lg:text-7xl font-bold uppercase tracking-tight leading-[0.95] text-white"
                >
                  Enjoy Your <br />
                  <span className="italic font-normal text-[#E8A840] font-serif tracking-normal lowercase first-letter:uppercase">Dream Ascent</span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="m-0 mt-5 text-sm sm:text-base text-white/60 max-w-md font-normal leading-relaxed"
                >
                  Explore customized elevator solutions designed with state-of-the-art engineering, architectural aesthetics, and silent motion.
                </motion.p>
              </div>
            </div>

            {/* Grid overlay detail */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          </motion.div>

          {/* ── 2. Glassmorphic Filter & Configurator Bar ── */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2 lg:translate-y-1/2 w-full lg:max-w-[1000px] mt-6 lg:mt-0 z-20 px-0 lg:px-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full bg-white/95 lg:bg-white/80 backdrop-blur-2xl border border-[#E8E2DA]/70 rounded-[1.5rem] lg:rounded-full p-4 lg:py-3 lg:pl-8 lg:pr-3 shadow-[0_20px_50px_-15px_rgba(17,17,17,0.1)] flex flex-col lg:flex-row items-stretch lg:items-center gap-4 lg:gap-0 justify-between">
              
              {/* Col 1: Category */}
              <FilterColumn
                label="Category"
                value={tabOptions.find(t => t.id === activeTab)?.label}
                isOpen={openDropdown === 'tabGroup'}
                onToggle={() => setOpenDropdown(openDropdown === 'tabGroup' ? null : 'tabGroup')}
                hasBorder
              >
                {tabOptions.map((opt) => (
                  <DropdownItem
                    key={opt.id}
                    label={opt.label}
                    isActive={activeTab === opt.id}
                    onClick={() => {
                      setActiveTab(opt.id)
                      setOpenDropdown(null)
                    }}
                  />
                ))}
              </FilterColumn>

              {/* Col 2: Type */}
              <FilterColumn
                label="System Type"
                value={activeCategory === 'All' ? 'All Types' : activeCategory}
                isOpen={openDropdown === 'category'}
                onToggle={() => setOpenDropdown(openDropdown === 'category' ? null : 'category')}
                hasBorder
              >
                {categoryOptions[activeTab].map((opt) => (
                  <DropdownItem
                    key={opt}
                    label={opt === 'All' ? 'All Types' : opt}
                    isActive={activeCategory === opt}
                    onClick={() => {
                      setActiveCategory(opt)
                      setOpenDropdown(null)
                    }}
                  />
                ))}
              </FilterColumn>

              {/* Col 3: Capacity */}
              <FilterColumn
                label="Duty Load"
                value={activeCapacity === 'All' ? 'Any Load' : activeCapacity}
                isOpen={openDropdown === 'capacity'}
                onToggle={() => setOpenDropdown(openDropdown === 'capacity' ? null : 'capacity')}
                hasBorder
              >
                {capacityOptions.map((opt) => (
                  <DropdownItem
                    key={opt}
                    label={opt === 'All' ? 'Any Load' : opt}
                    isActive={activeCapacity === opt}
                    onClick={() => {
                      setActiveCapacity(opt)
                      setOpenDropdown(null)
                    }}
                  />
                ))}
              </FilterColumn>

              {/* Col 4: Speed */}
              <FilterColumn
                label="Velocity"
                value={activeSpeed === 'All' ? 'Any Speed' : activeSpeed}
                isOpen={openDropdown === 'speed'}
                onToggle={() => setOpenDropdown(openDropdown === 'speed' ? null : 'speed')}
              >
                {speedOptions.map((opt) => (
                  <DropdownItem
                    key={opt}
                    label={opt === 'All' ? 'Any Speed' : opt}
                    isActive={activeSpeed === opt}
                    onClick={() => {
                      setActiveSpeed(opt)
                      setOpenDropdown(null)
                    }}
                  />
                ))}
              </FilterColumn>

              {/* Action Button: Search */}
              <button 
                onClick={handleSearchScroll}
                className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-[#111111] hover:bg-[#0E4FB3] text-white flex items-center justify-center flex-shrink-0 cursor-pointer transition-all duration-300 hover:scale-105 outline-none border-none shadow-sm hover:shadow-[0_8px_24px_-6px_rgba(14,79,179,0.45)] self-end lg:self-center"
              >
                <Search className="w-5 h-5" />
              </button>

            </div>
          </motion.div>

        </div>
      </section>

      {/* ── 3. Product Catalog Grid Section ── */}
      <section ref={catalogRef} className="pt-20 lg:pt-28 pb-20 px-6 sm:px-10 lg:px-16 scroll-mt-6">
        <div className="max-w-[1200px] mx-auto">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <span className="font-mono text-[10px] tracking-[0.3em] text-[#9A9A9A] uppercase mb-3 block">
              Featured Catalog
            </span>
            <h2 className="m-0 font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold uppercase tracking-tight text-[#111111]">
              Popular Systems
            </h2>
            <div className="w-12 h-[2px] bg-[#0E4FB3] mx-auto mt-5 rounded-full" />

            {/* Active filter tags */}
            {activeFilterCount > 0 && (
              <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
                <SlidersHorizontal className="w-3 h-3 text-[#9A9A9A]" />
                {activeCategory !== 'All' && (
                  <FilterTag label={activeCategory} onClear={() => setActiveCategory('All')} />
                )}
                {activeCapacity !== 'All' && (
                  <FilterTag label={activeCapacity} onClear={() => setActiveCapacity('All')} />
                )}
                {activeSpeed !== 'All' && (
                  <FilterTag label={activeSpeed} onClear={() => setActiveSpeed('All')} />
                )}
                <button
                  onClick={() => {
                    setActiveCategory('All')
                    setActiveCapacity('All')
                    setActiveSpeed('All')
                  }}
                  className="font-mono text-[9px] text-[#0E4FB3] uppercase tracking-widest bg-transparent border-none outline-none font-bold cursor-pointer hover:underline ml-1"
                >
                  Clear All
                </button>
              </div>
            )}
          </motion.div>

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
                <div className="text-center py-28 border border-dashed border-[#E8E2DA] rounded-[2rem] bg-white/30">
                  <div className="w-14 h-14 rounded-full bg-[#0E4FB3]/[0.06] flex items-center justify-center mx-auto mb-4">
                    <Search className="w-6 h-6 text-[#0E4FB3]/40" />
                  </div>
                  <p className="font-mono text-[11px] text-[#9A9A9A] tracking-wider uppercase m-0 mb-3">
                    No matching systems found
                  </p>
                  <button 
                    onClick={() => {
                      setActiveCategory('All')
                      setActiveCapacity('All')
                      setActiveSpeed('All')
                    }}
                    className="font-mono text-[10px] uppercase text-[#0E4FB3] tracking-widest bg-transparent border-none outline-none font-bold cursor-pointer hover:underline"
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
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-white border-t border-[#E8E2DA]/60">
        <div className="max-w-[1200px] mx-auto">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <span className="font-mono text-[10px] tracking-[0.3em] text-[#9A9A9A] uppercase mb-3 block">
              Testimonials
            </span>
            <h2 className="m-0 font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold uppercase tracking-tight text-[#111111]">
              What Our Clients Say
            </h2>
            <div className="w-12 h-[2px] bg-[#0E4FB3] mx-auto mt-5 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((t, index) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-[#F5F0EB]/40 border border-[#E8E2DA]/60 rounded-[1.75rem] p-7 sm:p-8 flex flex-col justify-between hover:shadow-[0_12px_40px_-10px_rgba(17,17,17,0.06)] hover:border-[#E8E2DA] transition-all duration-400 relative overflow-hidden"
              >
                {/* Quote mark */}
                <div className="absolute top-6 right-6 opacity-[0.04]">
                  <Quote className="w-16 h-16 text-[#0E4FB3]" />
                </div>

                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-[#E8A840] fill-[#E8A840]" />
                  ))}
                </div>

                <p className="m-0 text-sm sm:text-[15px] text-[#525252] leading-[1.75] font-normal relative z-10">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-[#E8E2DA]/50">
                  <div className={`w-11 h-11 rounded-full ${t.avatarGradient} text-white flex items-center justify-center font-mono text-xs font-bold shadow-xs`}>
                    {t.initials}
                  </div>
                  <div>
                    <h5 className="m-0 font-sans text-sm font-semibold text-[#111111]">{t.name}</h5>
                    <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#9A9A9A]">{t.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 5. Immersive CTA Card Section ── */}
      <section className="py-0">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full bg-[#111111] py-24 sm:py-28 lg:py-32 px-6 sm:px-12 lg:px-24 text-center relative overflow-hidden"
        >
          {/* Animated ambient orbs */}
          <motion.div
            animate={{ x: [0, 30, -15, 0], y: [0, -25, 20, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[10%] left-[10%] w-[350px] h-[350px] rounded-full bg-[#0E4FB3]/[0.06] blur-[100px] pointer-events-none"
          />
          <motion.div
            animate={{ x: [0, -20, 25, 0], y: [0, 30, -15, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[10%] right-[10%] w-[300px] h-[300px] rounded-full bg-[#E8A840]/[0.05] blur-[80px] pointer-events-none"
          />

          {/* Grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-[#0E4FB3] uppercase font-bold mb-5">
              Partner with FG Lifts
            </span>
            
            <h3 className="m-0 font-display text-3xl sm:text-4xl lg:text-[3.2rem] font-bold uppercase tracking-tight text-white leading-[1.1]">
              Join Rewards &amp; Discover <br />
              <span className="text-[#E8A840] italic font-normal font-serif tracking-normal lowercase first-letter:uppercase">Exclusive Options</span> On Your Project
            </h3>
            
            <p className="m-0 mt-5 text-sm sm:text-base text-white/50 font-normal leading-relaxed max-w-lg">
              Connect with our vertical engineering consultants today to access custom specifications, luxury design catalogs, and contract pricing configurations.
            </p>
            
            <Link 
              href="/contact"
              className="group mt-10 relative px-9 py-4 rounded-full bg-[#0E4FB3] text-white text-xs font-semibold tracking-wider uppercase transition-all duration-400 flex items-center gap-2.5 overflow-hidden shadow-[0_4px_20px_-6px_rgba(14,79,179,0.4)] hover:shadow-[0_12px_36px_-8px_rgba(14,79,179,0.5)] hover:scale-[1.03] no-underline"
            >
              <span className="relative z-10">Get a Free Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
              <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out" />
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  )
}


/* ─── Sub-components ─────────────────────────────────────────── */

function FilterColumn({ label, value, isOpen, onToggle, hasBorder, children }) {
  return (
    <div 
      onClick={(e) => { e.stopPropagation(); onToggle() }}
      className={`flex-1 flex flex-col items-start cursor-pointer select-none relative py-2 lg:py-0 ${
        hasBorder ? 'border-b lg:border-b-0 lg:border-r border-[#E8E2DA]/50 pb-3 lg:pb-0 lg:pr-6' : 'lg:pl-6'
      }`}
    >
      <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#9A9A9A] mb-0.5">{label}</span>
      <div className="flex items-center justify-between w-full gap-2">
        <span className="font-sans text-sm font-semibold text-[#111111] truncate">
          {value}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-[#9A9A9A] transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      
      {/* Dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 lg:left-[-8px] lg:right-auto lg:w-[220px] top-[100%] mt-3 bg-white/95 backdrop-blur-xl border border-[#E8E2DA] rounded-xl shadow-[0_12px_36px_-8px_rgba(17,17,17,0.12)] p-1.5 z-50 overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function DropdownItem({ label, isActive, onClick }) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick() }}
      className={`w-full text-left font-mono text-[10px] uppercase tracking-wider px-3.5 py-2.5 rounded-lg transition-all duration-150 cursor-pointer border-none outline-none ${
        isActive 
          ? 'bg-[#0E4FB3] text-white font-bold shadow-xs' 
          : 'bg-transparent hover:bg-[#F5F0EB] text-[#111111]'
      }`}
    >
      {label}
    </button>
  )
}

function FilterTag({ label, onClear }) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-[#0E4FB3]/[0.06] text-[#0E4FB3] font-mono text-[9px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full border border-[#0E4FB3]/10">
      {label}
      <button
        onClick={onClear}
        className="w-3.5 h-3.5 rounded-full bg-[#0E4FB3]/10 flex items-center justify-center cursor-pointer border-none outline-none hover:bg-[#0E4FB3]/20 transition-colors"
      >
        <span className="text-[8px] leading-none">&times;</span>
      </button>
    </span>
  )
}


/* ─── Testimonial Data ───────────────────────────────────────── */

const testimonials = [
  {
    quote: 'The AeroLux capsule elevator transformed our shopping atrium into a futuristic experience. Exceptional craftsmanship and incredibly silent operation.',
    name: 'Sonal Patel',
    initials: 'SP',
    role: 'Lead Architect, Surat',
    avatarGradient: 'bg-gradient-to-br from-[#0E4FB3] to-[#1A6BFF]',
  },
  {
    quote: 'Quiet, reliable, and highly energy-efficient. Our highrise residents love the smooth acceleration and deceleration of the Quantum gearless passenger lift.',
    name: 'Rajesh Mehta',
    initials: 'RM',
    role: 'Developer, Highrise Builders',
    avatarGradient: 'bg-gradient-to-br from-[#E8A840] to-[#E59A1B]',
  },
  {
    quote: 'Their 24/7 support team and commitment to strict safety standards made FG Lifts our primary vertical mobility partner for corporate warehouse developments.',
    name: 'Vikram Shah',
    initials: 'VS',
    role: 'Director, Apex Logistics',
    avatarGradient: 'bg-gradient-to-br from-[#333] to-[#111]',
  },
]
