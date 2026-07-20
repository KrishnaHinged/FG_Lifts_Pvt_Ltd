'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function FeaturedProductBanner({ product }) {
  if (!product) return null

  const scaleIn = {
    hidden: { scale: 1.04, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }
    }
  }

  const slideUpContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      }
    }
  }

  const slideUp = {
    hidden: { y: 25, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  }

  return (
    <section className="bg-[#F5F0EB] pt-0 pb-16 px-6 lg:px-24 select-none">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-0 items-stretch border border-[#E8E2DA] overflow-hidden">
          
          {/* LEFT — Image */}
          <motion.div 
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative h-[480px] lg:h-[600px] w-full"
          >
            <Image
              src={product.images?.[0]?.url || '/images/services-collage.png'}
              alt={product.name}
              fill
              className="object-cover rounded-none"
              sizes="(max-w-1024px) 100vw, 650px"
            />
          </motion.div>

          {/* RIGHT — Content */}
          <motion.div 
            variants={slideUpContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="bg-white p-10 sm:p-12 lg:p-16 flex flex-col justify-center h-full items-start"
          >
            {/* Mono Label */}
            <motion.span 
              variants={slideUp}
              className="font-mono text-[11px] tracking-[0.2em] text-[#6B6B6B] uppercase"
            >
              Featured System
            </motion.span>

            {/* Product Name */}
            <motion.h3 
              variants={slideUp}
              className="m-0 font-display text-3xl lg:text-5xl text-[#111111] mt-4 leading-tight font-normal"
            >
              {product.name}
            </motion.h3>

            {/* Tagline */}
            <motion.p 
              variants={slideUp}
              className="font-sans text-lg text-[#6B6B6B] mt-4 mb-0 leading-relaxed font-normal"
            >
              {product.tagline || product.description?.slice(0, 120) + '...'}
            </motion.p>

            {/* Spec list */}
            {product.specifications?.length > 0 && (
              <motion.div 
                variants={slideUp}
                className="mt-8 space-y-3.5 w-full"
              >
                {product.specifications.slice(0, 3).map((spec) => (
                  <div key={spec.key} className="flex items-center gap-4">
                    <span className="font-mono text-[11px] text-[#9A9A9A] uppercase w-28 flex-shrink-0 font-semibold">
                      {spec.key}
                    </span>
                    <span className="font-sans text-sm text-[#111111] font-semibold">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Thin Rule */}
            <motion.div 
              variants={slideUp}
              className="w-full h-px bg-[#E8E2DA] my-8" 
            />

            {/* CTA Arrow Link */}
            <motion.div variants={slideUp}>
              <Link
                href={`/products/${product.slug}`}
                className="group inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-[#111111] no-underline hover:text-[#0E4FB3] transition-colors cursor-pointer"
              >
                Explore This System
                <span className="group-hover:translate-x-1.5 transition-transform duration-300">
                  &rarr;
                </span>
              </Link>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
