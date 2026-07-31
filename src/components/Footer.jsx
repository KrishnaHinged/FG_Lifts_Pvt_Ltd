'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

import { FOOTER } from '@/constants/footer'
import { SOCIALS } from '@/constants/socials'
import { NAVIGATION } from '@/constants/navigation'
import { capitalize } from '@/utils/string'
import { FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa6'

const navLinks = NAVIGATION.NAV_LINKS

const socialIcons = {
  linkedin: FaLinkedin,
  facebook: FaFacebook,
  instagram: FaInstagram
}


export default function Footer() {
  // Framer Motion variants for scroll-triggered staggers
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      }
    }
  }

  const columnVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <footer className="relative bg-[#181818] overflow-hidden text-[#F5F0EB] select-none pt-[180px] pb-[60px] px-6 lg:px-12">
      {/* Blueprint Grid Overlay (< 5% opacity) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02] z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Warm Lighting Glow (Subtle radial gradient from top) */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1440px] h-[600px] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at 50% -20%, rgba(245, 240, 235, 0.04), transparent 70%)'
        }}
      />

      {/* Centered Editorial Container */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto">

        {/* BOTTOM GRID: Asymmetrical Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-12 gap-y-12 lg:gap-y-0"
        >
          {/* Column 1: Company Description */}
          <motion.div
            variants={columnVariants}
            className="col-span-12 lg:col-span-5 flex flex-col items-start"
          >
            <div className="bg-white px-3 py-1.5 rounded-lg flex items-center justify-center border border-neutral-800 mb-6">
              <Image 
                src="/images/logo.png" 
                alt="FG Lifts Logo" 
                width={120} 
                height={28} 
                className="object-contain h-[24px] w-auto"
              />
            </div>
            <p className="font-sans text-[15px] leading-relaxed text-[#F5F0EB]/50 m-0 max-w-[340px]">
              {FOOTER.SECTIONS.COMPANY.TEXT}
            </p>
          </motion.div>

          {/* Column 2: Navigation Links (Asymmetrical Start) */}
          <motion.div
            variants={columnVariants}
            className="col-span-6 md:col-span-4 lg:col-span-2 lg:col-start-7 flex flex-col items-start"
          >
            <h4 className="font-mono text-[14px] uppercase tracking-[0.2em] text-[#F5F0EB]/40 m-0 mb-6 font-medium">
              {FOOTER.SECTIONS.NAVIGATION.TITLE}
            </h4>
            <ul className="list-none p-0 m-0 space-y-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-sans text-[16px] text-[#F5F0EB]/60 hover:text-[#F5F0EB] transition-all duration-[350ms] ease-out inline-block hover:translate-x-1.5 no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Contact Details */}
          <motion.div
            variants={columnVariants}
            className="col-span-6 md:col-span-4 lg:col-span-2 flex flex-col items-start"
          >
            <h4 className="font-mono text-[14px] uppercase tracking-[0.2em] text-[#F5F0EB]/40 m-0 mb-6 font-medium">
              {FOOTER.SECTIONS.CONTACT.TITLE}
            </h4>
            <ul className="list-none p-0 m-0 space-y-4 font-sans text-[16px] text-[#F5F0EB]/50 leading-relaxed">
              <li>
                <span className="block text-[#F5F0EB]/70 font-medium">{FOOTER.SECTIONS.CONTACT.CITY}</span>
                <span className="block text-xs uppercase tracking-wider text-[#F5F0EB]/40 mt-0.5">{FOOTER.SECTIONS.CONTACT.REGION}</span>
              </li>
              <li>
                <a
                  href={`mailto:${FOOTER.SECTIONS.CONTACT.EMAIL}`}
                  className="text-[#F5F0EB]/60 hover:text-[#F5F0EB] transition-all duration-[350ms] ease-out inline-block hover:translate-x-1.5 no-underline"
                >
                  {FOOTER.SECTIONS.CONTACT.EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${FOOTER.SECTIONS.CONTACT.PHONE.replace(/\s+/g, '')}`}
                  className="text-[#F5F0EB]/60 hover:text-[#F5F0EB] transition-all duration-[350ms] ease-out inline-block hover:translate-x-1.5 no-underline"
                >
                  {FOOTER.SECTIONS.CONTACT.PHONE}
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Column 4: Social Links with React Icons */}
          <motion.div
            variants={columnVariants}
            className="col-span-6 md:col-span-4 lg:col-span-2 flex flex-col items-start"
          >
            <h4 className="font-mono text-[14px] uppercase tracking-[0.2em] text-[#F5F0EB]/40 m-0 mb-6 font-medium">
              {FOOTER.SECTIONS.SOCIAL.TITLE}
            </h4>
            <ul className="list-none p-0 m-0 space-y-4">
              {Object.entries(SOCIALS).map(([platform, url]) => {
                const IconComponent = socialIcons[platform]
                return (
                  <li key={platform}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans text-[16px] text-[#F5F0EB]/60 hover:text-[#F5F0EB] transition-all duration-[350ms] ease-out inline-flex items-center gap-2.5 hover:translate-x-1.5 no-underline group"
                    >
                      {IconComponent && (
                        <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#F5F0EB]/70 group-hover:bg-[#0E4FB3] group-hover:text-white group-hover:border-[#0E4FB3] transition-all duration-300 shadow-sm">
                          <IconComponent className="w-4 h-4" />
                        </span>
                      )}
                      <span>{capitalize(platform)}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        </motion.div>

        {/* Divider for Bottom Bar */}
        <div className="w-full h-[1px] bg-[#F5F0EB]/5 mt-20 lg:mt-28 mb-10" />

        {/* BOTTOM BAR: Copy & Policy */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-mono tracking-widest text-[#F5F0EB]/30 uppercase">
          <div>
            {FOOTER.COPYRIGHT}
          </div>
          <div className="flex items-center gap-8">
            {FOOTER.LEGAL_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[#F5F0EB]/30 hover:text-[#EDE8E2] transition-colors no-underline"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}
