'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const featuredProduct = {
  title: 'Capsule & Panoramic Lifts',
  slug: 'capsule-lifts',
  desc: 'Bespoke architectural glass capsules designed to offer seamless panoramic transits.',
  image: '/images/elevator-gold.jpg',
  tag: 'Featured System'
}

const products = [
  {
    title: 'Passenger Elevators',
    slug: 'passenger-lifts',
    desc: 'Premium high-speed vertical systems engineered for modern high-rises.',
    image: '/images/elevator-steel.jpg',
    tag: 'Residential & Commercial'
  },
  {
    title: 'Home & Villa Lifts',
    slug: 'home-lifts',
    desc: 'Compact, gearless vertical mobility crafted to integrate with luxury homes.',
    image: '/images/elevator-wood.jpg',
    tag: 'Private Residences'
  }
]

export default function ProductsHome() {
  return (
    <section className="bg-white py-[120px] select-none">
      <div className="max-w-[1380px] mx-auto px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="grid grid-cols-12 gap-6 mb-[80px]">
          <div className="col-span-12 md:col-span-8 flex flex-col gap-4">
            <span className="font-mono text-[9px] tracking-widest text-[#D72638] uppercase font-bold">
              // 02 / Systems
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-light text-[#111111] leading-[1.1] m-0">
              Bespoke cabins, <br />
              <span className="italic font-serif text-[#0E4FB3] lowercase first-letter:uppercase">seamless transitions.</span>
            </h2>
          </div>
        </div>

        {/* Editorial Grid */}
        <div className="grid grid-cols-12 gap-6 md:gap-[40px] items-stretch">
          
          {/* Column 1-7: Featured Product */}
          <Link 
            href={`/products`}
            className="col-span-12 md:col-span-7 group flex flex-col justify-between p-6 md:p-10 rounded-[2rem] border border-[#E8E2DA] hover:shadow-lg transition-all duration-500 bg-[#F5F0EB]/30 relative overflow-hidden"
          >
            {/* Tag & Title */}
            <div className="relative z-10 flex flex-col gap-2 mb-6">
              <span className="font-mono text-[9px] tracking-widest text-[#D72638] uppercase font-bold">
                {featuredProduct.tag}
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-light text-[#111111] m-0 group-hover:text-[#0E4FB3] transition-colors duration-300">
                {featuredProduct.title}
              </h3>
            </div>

            {/* Big Editorial Image */}
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 border border-[#E8E2DA] bg-neutral-100">
              <Image
                src={featuredProduct.image}
                alt={featuredProduct.title}
                fill
                className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700"
                sizes="(max-w-[768px]) 100vw, 60vw"
              />
            </div>

            {/* Description */}
            <p className="m-0 font-sans text-base text-[#6B6B6B] leading-relaxed max-w-[480px]">
              {featuredProduct.desc}
            </p>
          </Link>

          {/* Column 8-12: Secondary Products Stack */}
          <div className="col-span-12 md:col-span-5 flex flex-col gap-6 md:gap-[40px]">
            {products.map((prod) => (
              <Link 
                href={`/products`}
                key={prod.title}
                className="group flex flex-col p-6 rounded-[2rem] border border-[#E8E2DA] hover:shadow-lg transition-all duration-500 bg-[#F5F0EB]/30 relative overflow-hidden flex-1 justify-between"
              >
                {/* Image */}
                <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-6 border border-[#E8E2DA] bg-neutral-100">
                  <Image
                    src={prod.image}
                    alt={prod.title}
                    fill
                    className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700"
                    sizes="(max-w-[768px]) 100vw, 40vw"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[9px] tracking-widest text-[#6B6B6B] uppercase font-bold">
                    {prod.tag}
                  </span>
                  <h3 className="font-display text-xl md:text-2xl font-light text-[#111111] m-0 group-hover:text-[#0E4FB3] transition-colors duration-300">
                    {prod.title}
                  </h3>
                  <p className="m-0 mt-2 font-sans text-sm text-[#6B6B6B] leading-relaxed">
                    {prod.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
