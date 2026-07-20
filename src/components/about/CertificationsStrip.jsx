'use client'

import Image from 'next/image'

const certifications = [
  { label: 'ISO 9001:2015', desc: 'Quality Management' },
  { label: 'BIS Certified', desc: 'Bureau of Indian Standards' },
  { label: 'NSIC Registered', desc: 'National Small Industries' },
  { label: 'CPWD Approved', desc: 'Government Contractor Grade' },
  { label: 'Make in India', desc: 'Local Manufacturing Initiative' }
]

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

export default function CertificationsStrip() {
  return (
    <section className="bg-[#F5F0EB] py-24 px-6 lg:px-24 select-none relative">


      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Top horizontal rule */}
        <div className="w-full h-px bg-[#E8E2DA] mb-16" />

        {/* Section 1: Certifications */}
        <div className="mb-16">
          <span className="block font-mono text-[9px] tracking-[0.2em] text-[#6B6B6B] uppercase mb-4 font-bold">
            Quality standards
          </span>
          <h2 className="m-0 font-display text-3xl text-[#111111] leading-tight font-bold uppercase tracking-tight">
            Accredited Quality
          </h2>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12 mb-28">
          {certifications.map((cert) => {
            const shortCode = cert.label.split(' ')[0]
            return (
              <div
                key={cert.label}
                className="border-t border-[#E8E2DA] pt-6 flex flex-col items-start"
              >
                {/* Abbreviation */}
                <span className="font-mono text-2xl text-[#111111] font-bold">
                  {shortCode}
                </span>

                {/* Details */}
                <span className="font-mono text-[10px] text-[#6B6B6B] tracking-[0.1em] uppercase mt-3 font-bold">
                  {cert.label}
                </span>
                <span className="font-mono text-[9px] text-[#9A9A9A] tracking-wider uppercase mt-1">
                  {cert.desc}
                </span>
              </div>
            )
          })}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#E8E2DA] mb-16" />

        {/* Section 2: Supply Chain Partners */}
        <div className="mb-16">
          <span className="block font-mono text-[9px] tracking-[0.2em] text-[#6B6B6B] uppercase mb-4 font-bold">
            Supply Chain &amp; Components
          </span>
          <h2 className="m-0 font-display text-3xl text-[#111111] leading-tight font-bold uppercase tracking-tight">
            Partnered with Leading Companies
          </h2>
        </div>

        {/* Partners Flex Row */}
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="w-[125px] h-14 relative flex items-center justify-center grayscale hover:grayscale-0 opacity-55 hover:opacity-100 transition-all duration-500 cursor-pointer"
            >
              <Image
                src={partner.src}
                alt={partner.alt}
                fill
                className="object-contain"
                sizes="125px"
              />
            </div>
          ))}
        </div>

        {/* Bottom horizontal rule */}
        <div className="w-full h-px bg-[#E8E2DA] mt-24" />
      </div>
    </section>
  )
}
