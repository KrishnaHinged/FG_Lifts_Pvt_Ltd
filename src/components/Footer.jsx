'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Projects', href: '/gallery' },
  { label: 'Contact', href: '/#contact' },
]

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
            <h4 className="font-mono text-[14px] uppercase tracking-[0.2em] text-[#F5F0EB]/40 m-0 mb-6 font-medium">
              // Company
            </h4>
            <p className="font-sans text-[15px] leading-relaxed text-[#F5F0EB]/50 m-0 max-w-[340px]">
              Engineering precision systems for luxury estates, commercial landmark towers, and high-density infrastructure across India. Established in 1993.
            </p>
          </motion.div>

          {/* Column 2: Navigation Links (Asymmetrical Start) */}
          <motion.div
            variants={columnVariants}
            className="col-span-6 md:col-span-4 lg:col-span-2 lg:col-start-7 flex flex-col items-start"
          >
            <h4 className="font-mono text-[14px] uppercase tracking-[0.2em] text-[#F5F0EB]/40 m-0 mb-6 font-medium">
              // Navigation
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
              // Contact
            </h4>
            <ul className="list-none p-0 m-0 space-y-4 font-sans text-[16px] text-[#F5F0EB]/50 leading-relaxed">
              <li>
                <span className="block text-[#F5F0EB]/70 font-medium">Surat</span>
                <span className="block text-xs uppercase tracking-wider text-[#F5F0EB]/40 mt-0.5">Gujarat, India</span>
              </li>
              <li>
                <a
                  href="mailto:info@fglift.com"
                  className="text-[#F5F0EB]/60 hover:text-[#F5F0EB] transition-all duration-[350ms] ease-out inline-block hover:translate-x-1.5 no-underline"
                >
                  info@fglift.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+919876543210"
                  className="text-[#F5F0EB]/60 hover:text-[#F5F0EB] transition-all duration-[350ms] ease-out inline-block hover:translate-x-1.5 no-underline"
                >
                  +91 98765 43210
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Column 4: Social Text-Only Links */}
          <motion.div
            variants={columnVariants}
            className="col-span-6 md:col-span-4 lg:col-span-2 flex flex-col items-start"
          >
            <h4 className="font-mono text-[14px] uppercase tracking-[0.2em] text-[#F5F0EB]/40 m-0 mb-6 font-medium">
              // Social
            </h4>
            <ul className="list-none p-0 m-0 space-y-4">
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[16px] text-[#F5F0EB]/60 hover:text-[#F5F0EB] transition-all duration-[350ms] ease-out inline-block hover:translate-x-1.5 no-underline"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[16px] text-[#F5F0EB]/60 hover:text-[#F5F0EB] transition-all duration-[350ms] ease-out inline-block hover:translate-x-1.5 no-underline"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[16px] text-[#F5F0EB]/60 hover:text-[#F5F0EB] transition-all duration-[350ms] ease-out inline-block hover:translate-x-1.5 no-underline"
                >
                  YouTube
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Divider for Bottom Bar */}
        <div className="w-full h-[1px] bg-[#F5F0EB]/5 mt-20 lg:mt-28 mb-10" />

        {/* BOTTOM BAR: Copy & Policy */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-mono tracking-widest text-[#F5F0EB]/30 uppercase">
          <div>
            © {new Date().getFullYear()} FG LIFT PVT. LTD. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-8">
            <Link href="/privacy" className="text-[#F5F0EB]/30 hover:text-[#EDE8E2] transition-colors no-underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-[#F5F0EB]/30 hover:text-[#EDE8E2] transition-colors no-underline">
              Terms & Conditions
            </Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
