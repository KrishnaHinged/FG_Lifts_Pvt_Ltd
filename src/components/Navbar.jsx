'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

import { NAVIGATION } from '@/constants/navigation'
import { COMPANY } from '@/constants/company'
import { ROUTES } from '@/constants/routes'

const navLinks = NAVIGATION.NAV_LINKS


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const lastScrollY = useRef(0)

  // Determine if the current route has a dark background at the top of the page.
  // Home ('/') and Blog ('/blog') pages start with dark hero designs.
  const isDarkBgAtTop = pathname === '/' || pathname.startsWith('/blog')
  const isDark = isDarkBgAtTop && !scrolled

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Toggle scrolled state for glassmorphic cream background
      setScrolled(currentScrollY > 50)

      // Toggle show/hide navbar behavior on scroll direction
      if (currentScrollY > 120) {
        if (currentScrollY > lastScrollY.current) {
          // Scrolling down - hide
          setIsVisible(false)
        } else {
          // Scrolling up - show
          setIsVisible(true)
        }
      } else {
        // Always show near the top
        setIsVisible(true)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on Escape key
  useEffect(() => {
    if (!mobileOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [mobileOpen])

  const isLinkActive = (href) => {
    if (href === '/') return pathname === '/'
    if (href.includes('#')) return false
    return pathname === href || pathname.startsWith(href)
  }

  // Mobile menu staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -150, x: "-50%", opacity: 0 }}
        animate={{ 
          y: isVisible ? 0 : -150, 
          x: "-50%",
          opacity: 1
        }}
        transition={{ 
          y: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
          opacity: { duration: 0.8, delay: 0.1 }
        }}
        className={`fixed top-6 left-1/2 z-50 w-[calc(100%-48px)] lg:w-[calc(100%-96px)] max-w-[1440px] h-[88px] rounded-full flex items-center justify-between px-10 transition-all duration-500 select-none ${
          scrolled
            ? 'bg-[#F5F0EB]/70 backdrop-blur-[20px] shadow-sm border border-[#E8E2DA]/30'
            : 'bg-transparent border border-transparent shadow-none'
        }`}
      >
        {/* Typographic Luxury Logo */}
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link 
            href={ROUTES.home} 
            className={`font-display text-[17px] tracking-[0.25em] font-medium uppercase transition-colors duration-500 no-underline ${
              isDark ? 'text-[#F5F0EB] hover:text-white' : 'text-[#111111] hover:text-[#111111]/70'
            }`}
          >
            {COMPANY.SHORT_NAME.toUpperCase()}
          </Link>
        </motion.div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link, i) => {
            const isActive = isLinkActive(link.href)
            return (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={link.href}
                  className={`group relative py-1 text-[16px] font-medium tracking-[0.05em] uppercase transition-colors duration-[450ms] ease-out no-underline ${
                    isDark
                      ? 'text-[#F5F0EB]/75 hover:text-[#F5F0EB]'
                      : 'text-[#111111]/70 hover:text-[#111111]'
                  }`}
                >
                  <span className="inline-block transition-transform duration-[450ms] ease-out group-hover:-translate-y-[2px]">
                    {link.label}
                  </span>
                  <span 
                    className={`absolute bottom-[-6px] left-1/2 h-[1px] -translate-x-1/2 transition-all duration-[450ms] ease-out ${
                      isActive ? 'w-4' : 'w-0 group-hover:w-4'
                    } ${
                      isDark ? 'bg-[#F5F0EB]' : 'bg-[#111111]'
                    }`}
                  />
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Desktop CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:block"
        >
          <Link
            href={`${ROUTES.home}#contact`}
            className={`inline-flex items-center justify-center h-[46px] px-[28px] rounded-full text-xs font-medium uppercase tracking-[0.15em] no-underline transition-all duration-500 ${
              isDark
                ? 'border border-[#F5F0EB]/30 text-[#F5F0EB] hover:bg-[#F5F0EB]/10 hover:border-[#F5F0EB]/65'
                : 'bg-[#0B1B33] text-[#F5F0EB] hover:bg-[#152A4A] shadow-sm'
            }`}
          >
            Get a Quote
          </Link>
        </motion.div>

        {/* Minimal Mobile Menu Trigger */}
        <button
          onClick={() => setMobileOpen(true)}
          className={`lg:hidden font-mono text-[13px] uppercase tracking-[0.2em] font-medium transition-colors duration-500 bg-transparent border-none cursor-pointer focus:outline-none ${
            isDark ? 'text-[#F5F0EB]/85 hover:text-white' : 'text-[#111111]/85 hover:text-[#111111]'
          }`}
          aria-label="Open menu"
        >
          Menu
        </button>
      </motion.nav>

      {/* Premium Full-Screen Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-[#EDE8E2] flex flex-col justify-between p-8 sm:p-12 md:p-16 select-none"
          >
            {/* Top header row */}
            <div className="flex items-center justify-between w-full max-w-[1440px] mx-auto">
              <span className="font-display text-[17px] tracking-[0.25em] font-medium uppercase text-[#111111]">
                {COMPANY.SHORT_NAME.toUpperCase()}
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="font-mono text-[13px] uppercase tracking-[0.2em] font-medium text-[#111111]/70 hover:text-[#111111] bg-transparent border-none cursor-pointer focus:outline-none py-2"
                aria-label="Close menu"
              >
                Close
              </button>
            </div>

            {/* Giant Editorial Links */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="flex flex-col gap-6 justify-center items-center flex-1 my-16"
            >
              {navLinks.map((link) => (
                <motion.div
                  key={link.label}
                  variants={itemVariants}
                  className="overflow-hidden py-1"
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-display text-[40px] font-light uppercase tracking-wide text-[#111111] hover:text-[#111111]/60 no-underline transition-colors duration-300 block"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Footer row */}
            <div className="flex flex-col items-center gap-4 w-full max-w-[1440px] mx-auto">
              <Link
                href={`${ROUTES.home}#contact`}
                onClick={() => setMobileOpen(false)}
                className="w-full sm:w-[280px] text-center inline-flex items-center justify-center h-[48px] bg-[#0B1B33] text-[#F5F0EB] px-8 rounded-full text-xs font-semibold tracking-wider uppercase no-underline hover:bg-[#152A4A] transition-colors duration-300 shadow-sm"
              >
                Get a Quote
              </Link>
              <div className="text-[10px] font-mono text-[#111111]/40 tracking-[0.2em] uppercase mt-2">
                EST. 1993 // SURAT, GUJARAT
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
