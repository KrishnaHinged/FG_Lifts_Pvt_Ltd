'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductGrid from './ProductGrid'
import ProductHero from './ProductHero'
import ProductFilterBar from './ProductFilterBar'
import ProductTestimonials from './ProductTestimonials'
import ProductCTA from './ProductCTA'
import { Search, SlidersHorizontal } from 'lucide-react'
import AboutCTA from '../about/AboutCTA'
import Testimonials from '../home/Testimonials'

export default function ProductsClient({ initialProducts = [] }) {
  const [activeTab, setActiveTab] = useState('Systems')
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeCapacity, setActiveCapacity] = useState('All')
  const [activeSpeed, setActiveSpeed] = useState('All')

  const [filteredProducts, setFilteredProducts] = useState([])
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
    if (catalogRef.current) {
      catalogRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Count active filters
  const activeFilterCount = [activeCategory, activeCapacity, activeSpeed].filter(v => v !== 'All').length

  return (
    <div className="min-h-screen bg-[#F5F0EB] pb-0 relative select-none">

      {/* 1. Hero Section */}
      <ProductHero />

      {/* 2. Glassmorphic Filter & Configurator Bar */}
      <ProductFilterBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        activeCapacity={activeCapacity}
        setActiveCapacity={setActiveCapacity}
        activeSpeed={activeSpeed}
        setActiveSpeed={setActiveSpeed}
        onSearch={handleSearchScroll}
      />

      {/* 3. Product Catalog Grid Section */}
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

      {/* 4. Testimonial Section */}
      <Testimonials />

      {/* 5. Immersive CTA Card Section */}
      <AboutCTA />
    </div>
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
