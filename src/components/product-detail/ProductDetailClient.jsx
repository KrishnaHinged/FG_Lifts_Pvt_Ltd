'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import ProductGallery from './ProductGallery'
import SpecsTable from './SpecsTable'
import FeaturesList from './FeaturesList'
import ApplicationChips from './ApplicationChips'
import ProductCTA from './ProductCTA'
import RelatedProducts from './RelatedProducts'
import ContactSection from '@/components/home/ContactSection'

export default function ProductDetailClient({ product, related = [] }) {
  if (!product) return null

  return (
    <div className="bg-[#F5F0EB] pt-32 pb-0 relative overflow-hidden select-none">
      
      {/* Ambient Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 50, -25, 0],
            y: [0, -40, 35, 0],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] rounded-full bg-[#0E4FB3]/[0.025] blur-[140px]"
        />
        <motion.div
          animate={{
            x: [0, -35, 45, 0],
            y: [0, 55, -25, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-[10%] -right-[10%] w-[45vw] h-[45vw] rounded-full bg-[#E8A840]/[0.035] blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, 25, -15, 0],
            y: [0, -20, 15, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[40%] right-[20%] w-[25vw] h-[25vw] rounded-full bg-[#0E4FB3]/[0.015] blur-[100px]"
        />
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <motion.nav 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center gap-2 font-mono text-[9px] sm:text-[10px] text-[#6B6B6B] uppercase tracking-[0.18em] mb-10 select-none"
        >
          <Link href="/" className="hover:text-[#0E4FB3] transition-colors duration-200 no-underline text-[#9A9A9A]">Home</Link>
          <span className="text-[#E8E2DA]">/</span>
          <Link href="/products" className="hover:text-[#0E4FB3] transition-colors duration-200 no-underline text-[#9A9A9A]">Products</Link>
          <span className="text-[#E8E2DA]">/</span>
          <span className="text-[#9A9A9A] hover:text-[#0E4FB3] transition-colors duration-200">{product.category}</span>
          <span className="text-[#E8E2DA]">/</span>
          <span className="text-[#111111] font-bold">{product.name}</span>
        </motion.nav>

        {/* Main Grid - Two Columns Layout */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-20">
          
          {/* Left Column - Product Gallery / 360 View — Sticky */}
          <div className="lg:col-span-7 w-full lg:sticky lg:top-28 lg:self-start">
            <ProductGallery 
              images={product.images} 
              has360View={product.has360View}
              panoramaUrl="/images/360-gold.png"
              colorVariants={product.colorVariants ? product.colorVariants.map(v => {
                let panorama = '/images/360-gold.png';
                if (v.name.toLowerCase().includes('rose')) {
                  panorama = '/images/360-rose-gold.png';
                } else if (v.name.toLowerCase().includes('silver') || v.name.toLowerCase().includes('steel') || v.name.toLowerCase().includes('grey')) {
                  panorama = '/images/360-silver.png';
                }
                return {
                  color: v.hex,
                  label: v.name,
                  panorama
                };
              }) : []}
            />
          </div>

          {/* Right Column - Product Specs Details */}
          <div className="lg:col-span-5 flex flex-col items-start gap-8">
            
            {/* Title & Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="w-full"
            >
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0E4FB3] animate-pulse" />
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#0E4FB3] font-bold">
                  {product.category} {product.subCategory ? `· ${product.subCategory}` : ''}
                </span>
                {product.badge && (
                  <span className="bg-[#0E4FB3]/[0.08] border border-[#0E4FB3]/15 text-[#0E4FB3] font-mono text-[8px] uppercase tracking-[0.2em] font-extrabold px-3 py-1 rounded-full">
                    {product.badge}
                  </span>
                )}
              </div>

              <h1 className="m-0 font-display text-3xl sm:text-4xl lg:text-[2.8rem] font-bold uppercase tracking-tight text-[#111111] leading-[1.05]">
                {product.name}
              </h1>

              {product.tagline && (
                <p className="m-0 mt-4 text-base sm:text-lg text-[#6B6B6B] leading-relaxed font-normal italic font-serif lowercase first-letter:uppercase">
                  {product.tagline}
                </p>
              )}
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="m-0 text-[#525252] text-sm sm:text-[15px] leading-[1.75] font-normal"
            >
              {product.description}
            </motion.p>

            {/* Divider */}
            <div className="w-full h-px bg-[#E8E2DA]/70" />

            {/* Application Chips */}
            <ApplicationChips applications={product.applications} />

            {/* Specs Table */}
            <SpecsTable specifications={product.specifications} />

            {/* CTA panel */}
            <ProductCTA brochureUrl={product.brochureUrl} productName={product.name} />

          </div>
        </div>

        {/* Features List Section */}
        <div className="border-t border-[#E8E2DA]/70 pt-16">
          <FeaturesList features={product.features} />
        </div>

        {/* Related Products Carousel grid */}
        <RelatedProducts products={related} />

      </div>

      {/* Embed Quote Form at bottom */}
      <div className="border-t border-[#E8E2DA] mt-24 pt-16">
        <ContactSection />
      </div>
    </div>
  )
}
