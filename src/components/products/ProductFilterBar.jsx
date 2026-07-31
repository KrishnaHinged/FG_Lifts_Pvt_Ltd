'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ChevronDown } from 'lucide-react'

const tabOptions = [
  { id: 'All', label: 'All Products' },
  { id: 'Systems', label: 'Our Systems' },
  { id: 'Cabins', label: 'Luxury Cabins' },
  { id: 'Components', label: 'Components & Kits' }
]

const categoryOptions = {
  All: ['All', 'Passenger', 'Goods', 'Capsule', 'Hospital', 'Standard', 'Premium', 'Luxury', 'Bespoke', 'Control Panels', 'Safety Devices'],
  Systems: ['All', 'Passenger', 'Goods', 'Capsule', 'Hospital'],
  Cabins: ['All', 'Standard', 'Premium', 'Luxury', 'Bespoke'],
  Components: ['All', 'Control Panels', 'Safety Devices', 'Cabin Parts']
}

const capacityOptions = ['All', '400 kg+', '680 kg+', '1000 kg+', '2000 kg+']
const speedOptions = ['All', '1.0 m/s+', '1.5 m/s+', '2.0 m/s+']

export default function ProductFilterBar({
  activeTab,
  setActiveTab,
  activeCategory,
  setActiveCategory,
  activeCapacity,
  setActiveCapacity,
  activeSpeed,
  setActiveSpeed,
  onSearch
}) {
  const [openDropdown, setOpenDropdown] = useState(null)

  // Auto-close dropdowns when clicking outside
  useEffect(() => {
    const handleOutsideClick = () => setOpenDropdown(null)
    window.addEventListener('click', handleOutsideClick)
    return () => window.removeEventListener('click', handleOutsideClick)
  }, [])

  return (
    <section className="relative -mt-16 sm:-mt-20 pb-10 px-4 sm:px-6 lg:px-8 z-20">
      <div className="max-w-[1380px] mx-auto relative">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2 lg:translate-y-1/2 w-full lg:max-w-[1000px] mt-6 lg:mt-0 px-0"
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
              onClick={onSearch}
              className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-[#111111] hover:bg-[#0E4FB3] text-white flex items-center justify-center flex-shrink-0 cursor-pointer transition-all duration-300 hover:scale-105 outline-none border-none shadow-sm hover:shadow-[0_8px_24px_-6px_rgba(14,79,179,0.45)] self-end lg:self-center"
            >
              <Search className="w-5 h-5" />
            </button>

          </div>
        </motion.div>
      </div>
    </section>
  )
}

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
