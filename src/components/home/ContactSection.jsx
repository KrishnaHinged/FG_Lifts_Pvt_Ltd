'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, CheckCircle } from 'lucide-react'

const elevatorTypes = [
  'Passenger Lift',
  'Goods / Freight Lift',
  'Capsule / Glass Lift',
  'Home / Villa Lift',
  'Hospital / Stretcher Lift',
  'Panoramic Lift',
]

const floorOptions = ['2–5 Floors', '6–10 Floors', '11–20 Floors', '20+ Floors']

const initialForm = {
  name: '',
  email: '',
  phone: '',
  company: '',
  city: '',
  elevatorType: '',
  floorCount: '',
  message: '',
}

export default function ContactSection() {
  const [formData, setFormData] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const validate = () => {
    const errs = {}
    if (!formData.name.trim()) errs.name = 'Name is required'
    if (!formData.email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Invalid email'
    if (!formData.phone.trim()) errs.phone = 'Phone is required'
    else if (!/^\+?\d{10,15}$/.test(formData.phone.replace(/[\s-]/g, ''))) errs.phone = 'Invalid phone (10+ digits)'
    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    let errorMsg = ''
    if (name === 'name') {
      if (!value.trim()) errorMsg = 'Name is required'
    } else if (name === 'email') {
      if (!value.trim()) errorMsg = 'Email is required'
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errorMsg = 'Invalid email'
    } else if (name === 'phone') {
      if (!value.trim()) errorMsg = 'Phone is required'
      else if (!/^\+?\d{10,15}$/.test(value.replace(/[\s-]/g, ''))) errorMsg = 'Invalid phone (10+ digits)'
    }
    setErrors((prev) => ({ ...prev, [name]: errorMsg || undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const labelClasses = "font-mono text-[9px] tracking-widest text-white/50 uppercase font-bold mb-2 block"
  const inputClasses = (field) =>
    `w-full bg-[#252525] border ${errors[field] ? 'border-[#D72638]' : 'border-white/5'
    } rounded-2xl px-5 py-4 text-white text-sm placeholder-white/20 outline-none transition-colors duration-300 focus:border-[#E8A840] focus:ring-1 focus:ring-[#E8A840]`

  const selectClasses = (field) =>
    `w-full bg-[#252525] border ${errors[field] ? 'border-[#D72638]' : 'border-white/5'
    } rounded-2xl px-5 py-4 text-white text-sm outline-none transition-colors duration-300 focus:border-[#E8A840] focus:ring-1 focus:ring-[#E8A840] appearance-none cursor-pointer`

  return (
    <section id="contact" className="bg-[#F5F0EB] py-[120px] sm:py-[180px] select-none relative overflow-hidden">

      {/* Background Glowing Balls */}
      <div className="absolute top-[10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(165,124,240,0.12)_0%,transparent_70%)] blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(168,230,120,0.15)_0%,transparent_70%)] blur-[100px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-[1380px] mx-auto px-6 lg:px-8">

        {/* Header Block */}
        <div className="flex flex-col items-center text-center gap-4 mb-16 max-w-3xl mx-auto">
          {/* <span className="font-mono text-[9px] tracking-[0.25em] text-[#D72638] uppercase font-bold">
            // 09 / Get In Touch
          </span> */}
          <h2 className="font-sans text-4xl sm:text-5xl lg:text-[4rem] font-bold tracking-tight uppercase leading-[1.05] text-[#111111] m-0">
            Get in
            {/* Custom SVG Clicking Pointer Hand outline */}
            <svg viewBox="0 0 24 24" width="40" height="40" stroke="#0797CE" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="inline-block mx-3 sm:mx-4 -translate-y-1 sm:-translate-y-2">
              <path d="M10 11V6a2 2 0 0 1 4 0v5" />
              <path d="M14 10.5a2 2 0 0 1 4 0v.5" />
              <path d="M6 10a2 2 0 0 1 4 0v2" />
              <path d="M18 11.5a2 2 0 0 1 4 0V15a8 8 0 0 1-16 0v-4" />
            </svg>
            touch <br />
            with FG Lifts
          </h2>
        </div>

        {/* Form Container Card */}
        <div className="max-w-4xl mx-auto bg-[#1A1A1A] rounded-[3rem] p-8 sm:p-12 lg:p-16 shadow-2xl border border-white/5 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,79,179,0.04),transparent_60%)] pointer-events-none rounded-[3rem]" />

          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16 space-y-4 text-white"
              >
                <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6 text-[#0797CE]" />
                </div>
                <h3 className="font-sans text-2xl font-bold">Quote Request Sent</h3>
                <p className="text-sm text-white/60 max-w-sm mx-auto font-light leading-relaxed">
                  Thank you, {formData.name}. We will reach out within 24 hours with a customized proposal.
                </p>
                <button
                  onClick={() => { setStatus('idle'); setFormData(initialForm) }}
                  className="text-sm text-[#0797CE] font-medium cursor-pointer bg-transparent border-none underline mt-2"
                >
                  Send another inquiry
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6 relative z-10"
              >
                {/* Grid 1: Name & Email */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contact-name" className={labelClasses}>Full Name *</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="name"
                      className={inputClasses('name')}
                    />
                    {errors.name && <p className="text-[#D72638] text-xs mt-2 font-mono">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="contact-email" className={labelClasses}>Email *</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="email"
                      className={inputClasses('email')}
                    />
                    {errors.email && <p className="text-[#D72638] text-xs mt-2 font-mono">{errors.email}</p>}
                  </div>
                </div>

                {/* Grid 2: Phone & Company */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contact-phone" className={labelClasses}>Phone *</label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="tel"
                      className={inputClasses('phone')}
                    />
                    {errors.phone && <p className="text-[#D72638] text-xs mt-2 font-mono">{errors.phone}</p>}
                  </div>
                  <div>
                    <label htmlFor="contact-company" className={labelClasses}>Company</label>
                    <input
                      id="contact-company"
                      name="company"
                      type="text"
                      placeholder="Enter your company name"
                      value={formData.company}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="organization"
                      className={inputClasses('company')}
                    />
                  </div>
                </div>

                {/* Grid 3: City, Elevator Type & Floors */}
                <div className="grid sm:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="contact-city" className={labelClasses}>City</label>
                    <input
                      id="contact-city"
                      name="city"
                      type="text"
                      placeholder="Enter city"
                      value={formData.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="street-address"
                      className={inputClasses('city')}
                    />
                  </div>
                  <div className="relative">
                    <label htmlFor="contact-elevator-type" className={labelClasses}>Elevator Type</label>
                    <select
                      id="contact-elevator-type"
                      name="elevatorType"
                      value={formData.elevatorType}
                      onChange={handleChange}
                      className={selectClasses('elevatorType')}
                    >
                      <option value="" className="bg-[#1A1A1A]">Select type</option>
                      {elevatorTypes.map((t) => (
                        <option key={t} value={t} className="bg-[#1A1A1A]">{t}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 bottom-5 pointer-events-none text-white/40">
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  <div className="relative">
                    <label htmlFor="contact-floor-count" className={labelClasses}>Floors</label>
                    <select
                      id="contact-floor-count"
                      name="floorCount"
                      value={formData.floorCount}
                      onChange={handleChange}
                      className={selectClasses('floorCount')}
                    >
                      <option value="" className="bg-[#1A1A1A]">Select range</option>
                      {floorOptions.map((f) => (
                        <option key={f} value={f} className="bg-[#1A1A1A]">{f}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 bottom-5 pointer-events-none text-white/40">
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className={labelClasses}>Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder="Type your message here"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${inputClasses('message')} resize-none h-36`}
                  />
                </div>

                {status === 'error' && (
                  <p className="text-[#D72638] text-xs font-mono">
                    Something went wrong. Please try again or contact us directly.
                  </p>
                )}

                {/* Submit Pill Button (Zestate layout matching gold theme) */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full sm:w-auto min-w-[160px] bg-[#0797CE] text-black py-4 px-10 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:bg-[#3263d5] hover:scale-105 disabled:opacity-60 cursor-pointer border-none flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A840] focus-visible:ring-offset-2"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Submit'
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
