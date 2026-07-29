'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

// Modular Showcase Subcomponents
import HomeLiftHero from '@/components/home-lift/HomeLiftHero'
import HomeLiftSystems from '@/components/home-lift/HomeLiftSystems'
import HomeLiftCabins from '@/components/home-lift/HomeLiftCabins'
import HomeLiftArtWalls from '@/components/home-lift/HomeLiftArtWalls'
import HomeLiftAccessories from '@/components/home-lift/HomeLiftAccessories'
import HomeLiftParameters from '@/components/home-lift/HomeLiftParameters'

export default function HomeLiftClient({ initialProducts = [] }) {
  const [selectedSystem, setSelectedSystem] = useState('geh160')
  const [activeCabinTab, setActiveCabinTab] = useState('Standard') // Standard | More Options | Panoramic
  const [selectedCabinSlug, setSelectedCabinSlug] = useState('hc188')

  // Categorize products based on subCategory & tabGroup
  const systems = useMemo(() => {
    return initialProducts.filter(p => p.tabGroup === 'Systems')
  }, [initialProducts])

  const cabins = useMemo(() => {
    return initialProducts.filter(p => p.tabGroup === 'Cabins' && p.subCategory !== 'Art Background Wall')
  }, [initialProducts])

  const filteredCabins = useMemo(() => {
    if (activeCabinTab === 'Standard') {
      return cabins.filter(c => c.subCategory === 'Standard Cabin')
    } else if (activeCabinTab === 'More Options') {
      return cabins.filter(c => c.subCategory === 'More Cabin Options')
    } else {
      return cabins.filter(c => c.subCategory === 'Panoramic Cabin')
    }
  }, [cabins, activeCabinTab])

  // Select first cabin in active tab when tab changes
  const handleCabinTabChange = (tab) => {
    setActiveCabinTab(tab)
    const list = cabins.filter(c => {
      if (tab === 'Standard') return c.subCategory === 'Standard Cabin'
      if (tab === 'More Options') return c.subCategory === 'More Cabin Options'
      return c.subCategory === 'Panoramic Cabin'
    })
    if (list.length > 0) {
      setSelectedCabinSlug(list[0].slug)
    }
  }

  const activeSystemDetails = useMemo(() => {
    return systems.find(s => s.slug === selectedSystem) || systems[0]
  }, [systems, selectedSystem])

  const activeCabinDetails = useMemo(() => {
    return cabins.find(c => c.slug === selectedCabinSlug) || cabins[0]
  }, [cabins, selectedCabinSlug])

  const artWalls = useMemo(() => {
    return initialProducts.filter(p => p.subCategory === 'Art Background Wall')
  }, [initialProducts])

  // Config options details
  const configOptions = {
    ceilings: [
      { code: 'HCL027', name: 'Spiral Nebula Star Map' },
      { code: 'HCL032', name: 'Stippled Frosted Glass' },
      { code: 'HCL036', name: 'Warm LED Recessed Panel' }
    ],
    cops: [
      { code: 'HOP026', name: 'Flush Smart Touch COP' },
      { code: 'HOP030', name: 'Multimedia Display Panel' },
      { code: 'HOP036', name: 'Slimline Metal Key COP' },
      { code: 'HOP038', name: 'Classic Braille Button COP' }
    ]
  }

  return (
    <div className="min-h-screen bg-[#F5F0EB] text-[#111111] font-sans pb-24 overflow-x-hidden selection:bg-[#0E4FB3] selection:text-white">
      {/* 1. Hero Showcase Banner */}
      <HomeLiftHero />

      {/* 2. Systems Drive Technology Section */}
      <HomeLiftSystems 
        systems={systems}
        selectedSystem={selectedSystem}
        setSelectedSystem={setSelectedSystem}
        activeSystemDetails={activeSystemDetails}
      />

      {/* 3. Luxury Cabin Customizer Section */}
      <HomeLiftCabins 
        filteredCabins={filteredCabins}
        activeCabinTab={activeCabinTab}
        handleCabinTabChange={handleCabinTabChange}
        selectedCabinSlug={selectedCabinSlug}
        setSelectedCabinSlug={setSelectedCabinSlug}
        activeCabinDetails={activeCabinDetails}
      />

      {/* 4. Art Background Wall Section */}
      <HomeLiftArtWalls artWalls={artWalls} />

      {/* 5. Custom Accessories Section */}
      <HomeLiftAccessories configOptions={configOptions} />

      {/* 6. Technical Parameter Table */}
      <HomeLiftParameters />

      {/* 7. Get a Quote CTA */}
      <section className="pt-20 px-6 sm:px-10 lg:px-16 max-w-[1200px] mx-auto text-center">
        <div className="bg-gradient-to-br from-[#0B1B33] to-[#0A2647] rounded-[2.5rem] p-10 sm:p-16 text-white shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(232,96,10,0.15)_0%,transparent_60%)] pointer-events-none" />
          <h2 className="m-0 font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight mb-4">
            Bring German Luxury Home
          </h2>
          <p className="font-sans text-sm sm:text-base text-gray-300 max-w-xl mx-auto mb-8 font-light">
            Plan your premium custom elevator configuration with our engineers today. Contact us for a tailored design proposal.
          </p>
          <Link
            href="/#contact"
            className="inline-flex justify-center items-center h-[54px] px-[36px] bg-[#E8600A] text-white hover:bg-orange-600 rounded-full font-bold uppercase tracking-wider text-xs transition-colors duration-300 no-underline shadow-lg"
          >
            Get a Free Proposal
          </Link>
        </div>
      </section>
    </div>
  )
}
