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
    <div className="bg-[#F5F0EB] pt-32 pb-24 relative overflow-hidden select-none">
      

      
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -30, 30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-[15%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-[#0E4FB3]/[0.03] blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -30, 40, 0],
            y: [0, 50, -20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-[15%] -right-[10%] w-[45vw] h-[45vw] rounded-full bg-[#E8A840]/[0.04] blur-[100px]"
        />
      </div>



      {/* Main Container */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center gap-2.5 font-mono text-[9px] sm:text-[10px] text-[#6B6B6B] uppercase tracking-wider mb-12 select-none"
        >
          <Link href="/" className="hover:text-[#0E4FB3] transition-colors duration-200 no-underline text-[#6B6B6B]">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#0E4FB3] transition-colors duration-200 no-underline text-[#6B6B6B]">Products</Link>
          <span>/</span>
          <span className="hover:text-[#0E4FB3] transition-colors duration-200 text-[#6B6B6B]">{product.category}</span>
          <span>/</span>
          <span className="text-[#111111] font-bold">{product.name}</span>
        </motion.div>

        {/* Main Grid - Two Columns Layout */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          
          {/* Left Column - Product Gallery / 360 View */}
          <div className="lg:col-span-7 w-full">
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
          <div className="lg:col-span-5 flex flex-col items-start gap-10">
            
            {/* Title & Badge */}
            <div className="w-full">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0E4FB3] animate-pulse" />
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#0E4FB3] font-bold">
                  {product.category} {product.subCategory ? `· ${product.subCategory}` : ''}
                </span>
                {product.badge && (
                  <span className="bg-[#0E4FB3]/10 border border-[#0E4FB3]/20 text-[#0E4FB3] font-mono text-[9px] uppercase tracking-wider font-bold px-3 py-1 rounded-full shadow-xs">
                    {product.badge}
                  </span>
                )}
              </div>

              <h1 className="m-0 font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-[#111111] leading-none">
                {product.name}
              </h1>

              {product.tagline && (
                <p className="m-0 mt-4 text-base text-[#6B6B6B] leading-relaxed font-normal italic font-serif lowercase first-letter:uppercase">
                  {product.tagline}
                </p>
              )}
            </div>

            {/* Description */}
            <p className="m-0 text-[#6B6B6B] text-sm sm:text-base leading-relaxed font-normal">
              {product.description}
            </p>

            {/* Application Chips */}
            <ApplicationChips applications={product.applications} />

            {/* Specs Table */}
            <SpecsTable specifications={product.specifications} />

            {/* CTA panel */}
            <ProductCTA brochureUrl={product.brochureUrl} productName={product.name} />

          </div>
        </div>

        {/* Features List Section */}
        <div className="border-t border-[#E8E2DA] pt-16">
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
