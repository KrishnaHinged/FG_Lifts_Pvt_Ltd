'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function ProductCard({ product }) {
  if (!product) return null

  // Extract specs to display on the card
  const capacitySpec = product.specifications?.find(s => s.key === 'Capacity')?.value || 'Custom Spec'
  const speedSpec = product.specifications?.find(s => s.key === 'Speed')?.value || 'Varies'

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block w-full bg-white rounded-[2rem] border border-[#E8E2DA]/50 p-4 hover:shadow-[0_12px_32px_-8px_rgba(17,17,17,0.06)] hover:-translate-y-1 transition-all duration-300 select-none text-left no-underline"
    >
      {/* Image Area with rounded corners */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] bg-[#EDE8E2]">
        <Image
          src={product.images?.[0]?.url || '/images/services-collage.png'}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
          sizes="(max-w-768px) 100vw, 360px"
        />
        
        {/* Absolute badge on top left */}
        {product.badge && (
          <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md border border-white/20 text-[#0E4FB3] font-mono text-[9px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full select-none shadow-sm">
            {product.badge}
          </div>
        )}
      </div>

      {/* Details Row */}
      <div className="mt-5 px-1 pb-1">
        {/* Name and Spec Badge Row */}
        <div className="flex justify-between items-start gap-4">
          <h4 className="m-0 font-display text-lg text-[#111111] font-semibold leading-tight group-hover:text-[#0E4FB3] transition-colors duration-200">
            {product.name}
          </h4>
          <span className="font-mono text-[9px] font-bold text-[#0E4FB3] bg-[#0E4FB3]/5 px-2.5 py-1 rounded-md whitespace-nowrap">
            {product.category || 'Core'}
          </span>
        </div>

        {/* Technical Sub-details */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#E8E2DA]/40">
          <div className="flex flex-col gap-0.5">
            <span className="font-mono text-[9px] uppercase tracking-wider text-[#9A9A9A]">Capacity</span>
            <span className="font-sans text-xs text-[#6B6B6B] font-medium truncate max-w-[155px]">
              {capacitySpec.split(' (')[0]}
            </span>
          </div>
          <div className="flex flex-col items-end gap-0.5">
            <span className="font-mono text-[9px] uppercase tracking-wider text-[#9A9A9A]">Speed</span>
            <span className="font-sans text-xs text-[#6B6B6B] font-medium">
              {speedSpec.split(' - ')[0]}
            </span>
          </div>
        </div>

      </div>
    </Link>
  )
}
