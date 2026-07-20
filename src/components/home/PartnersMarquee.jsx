'use client'

import Image from 'next/image'

const partners = [
  { src: '/images/partners/partner-1.png', alt: 'Shiv Shakti Industries' },
  { src: '/images/partners/partner-2.png', alt: 'Torin Drive International' },
  { src: '/images/partners/partner-3.png', alt: 'Montanari Group' },
  { src: '/images/partners/partner-4.png', alt: 'Monarch by Inovance' },
  { src: '/images/partners/partner-5.png', alt: 'Wittur' },
  { src: '/images/partners/partner-6.png', alt: 'Fermator' },
  { src: '/images/partners/partner-7.png', alt: 'Usha Martin' },
  { src: '/images/partners/partner-8.png', alt: 'Arkel' },
  { src: '/images/partners/partner-9.png', alt: 'GMV India' }
]

function MarqueeRow({ direction = 'left', items }) {
  const doubled = [...items, ...items]

  return (
    <div className="overflow-hidden mask-gradient-horizontal w-full">
      <div
        className={`flex items-center gap-16 whitespace-nowrap ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
          }`}
        style={{ width: 'max-content' }}
      >
        {doubled.map((partner, i) => (
          <div
            key={`${partner.alt}-${i}`}
            className="relative w-[130px] h-16 flex-shrink-0 cursor-default select-none"
          >
            <Image
              src={partner.src}
              alt={partner.alt}
              fill
              className="object-contain"
              sizes="130px"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PartnersMarquee() {
  const row1 = partners.slice(0, 9)
  // const row2 = partners.slice(4)

  return (
    <section className="bg-fg-cream py-10 lg:py-20 overflow-hidden">
      {/* Label */}
      <p className="text-center font-mono text-[11px] tracking-[0.2em] text-fg-muted mb-5 uppercase font-semibold">
        Partnered with leading companies
      </p>

      {/* Marquee Rows */}
      <div className="space-y-3">
        <MarqueeRow direction="right" items={row1} />
        {/* <MarqueeRow direction="right" items={row2} /> */}
      </div>
    </section>
  )
}
