'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, CheckCircle, ArrowRight } from 'lucide-react'
import Section from '@/components/layouts/Section'
import Container from '@/components/layouts/Container'
import Field from '@/components/forms/Field'
import Input from '@/components/forms/Input'
import Textarea from '@/components/forms/Textarea'
import Select from '@/components/forms/Select'

const elevatorTypes = [
  { value: 'Passenger Lift', label: 'Passenger Lift' },
  { value: 'Goods / Freight Lift', label: 'Goods / Freight Lift' },
  { value: 'Capsule / Glass Lift', label: 'Capsule / Glass Lift' },
  { value: 'Home / Villa Lift', label: 'Home / Villa Lift' },
  { value: 'Hospital / Stretcher Lift', label: 'Hospital / Stretcher Lift' },
  { value: 'Panoramic Lift', label: 'Panoramic Lift' },
]

const floorOptions = [
  { value: '2–5 Floors', label: '2–5 Floors' },
  { value: '6–10 Floors', label: '6–10 Floors' },
  { value: '11–20 Floors', label: '11–20 Floors' },
  { value: '20+ Floors', label: '20+ Floors' },
]

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

const getDefaultMessage = (pName) => {
  if (pName && pName.trim()) {
    return `Hello, I am interested in inquiring about specifications, lead times, and pricing details for the ${pName.trim()}. Please share the brochure and catalog.`
  }
  return `Hello, I am interested in inquiring about specifications, lead times, and pricing details for your elevator systems. Please share the brochure and catalog.`
}

export default function ContactSection({ 
  productName = '', 
  elevatorType = '',
  customTitle = '',
  customSubtitle = ''
}) {
  const [activeProduct, setActiveProduct] = useState(productName)
  const [userEditedMessage, setUserEditedMessage] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    city: '',
    elevatorType: elevatorType || '',
    floorCount: '',
    message: getDefaultMessage(productName),
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  // Parse URL search params if product or type passed via URL e.g. ?product=... or ?type=...
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search)
      const urlProduct = searchParams.get('product') || searchParams.get('productName')
      const urlType = searchParams.get('type') || searchParams.get('elevatorType')
      
      const effectiveProduct = urlProduct || productName
      if (effectiveProduct) {
        setActiveProduct(effectiveProduct)
        if (!userEditedMessage) {
          setFormData((prev) => ({
            ...prev,
            elevatorType: urlType || prev.elevatorType || elevatorType || '',
            message: getDefaultMessage(effectiveProduct)
          }))
        }
      }
    }
  }, [productName, elevatorType, userEditedMessage])

  // Sync if props update dynamically
  useEffect(() => {
    if (productName) {
      setActiveProduct(productName)
      if (!userEditedMessage) {
        setFormData((prev) => ({
          ...prev,
          elevatorType: elevatorType || prev.elevatorType,
          message: getDefaultMessage(productName)
        }))
      }
    }
  }, [productName, elevatorType, userEditedMessage])

  const validate = () => {
    const errs = {}
    if (!formData.name.trim()) errs.name = 'Full Name is required'
    if (!formData.email.trim()) errs.email = 'Email Address is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Invalid email address'
    if (!formData.phone.trim()) errs.phone = 'Phone Number is required'
    else if (!/^\+?\d{10,15}$/.test(formData.phone.replace(/[\s-]/g, ''))) errs.phone = 'Invalid phone number (10+ digits)'
    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'message') {
      setUserEditedMessage(true)
    }
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    let errorMsg = ''
    if (name === 'name') {
      if (!value.trim()) errorMsg = 'Full Name is required'
    } else if (name === 'email') {
      if (!value.trim()) errorMsg = 'Email Address is required'
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errorMsg = 'Invalid email address'
    } else if (name === 'phone') {
      if (!value.trim()) errorMsg = 'Phone Number is required'
      else if (!/^\+?\d{10,15}$/.test(value.replace(/[\s-]/g, ''))) errorMsg = 'Invalid phone number'
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
        body: JSON.stringify({ ...formData, productName: activeProduct }),
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

  const inputClass = "w-full !bg-[#252525] !border-white/10 rounded-2xl px-4 sm:px-5 py-3.5 sm:py-4 !text-white text-sm !placeholder-white/40 outline-none transition-all duration-300 focus:!border-[#0797CE] focus:ring-1 focus:ring-[#0797CE]"

  return (
    <Section id="contact" background="cream" size="none" className="py-16 sm:py-24 lg:py-32 select-none relative overflow-hidden">
      <div className="absolute top-[10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(165,124,240,0.12)_0%,transparent_70%)] blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(168,230,120,0.15)_0%,transparent_70%)] blur-[100px] pointer-events-none z-0" />

      <Container className="relative z-10 max-w-[1380px] px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="flex flex-col items-center text-center gap-3 mb-10 sm:mb-14 max-w-3xl mx-auto">
          <h2 className="font-sans text-3xl sm:text-5xl lg:text-[3.8rem] font-bold tracking-tight uppercase leading-[1.08] text-[#111111] m-0">
            Get in
            <svg viewBox="0 0 24 24" width="36" height="36" stroke="#0797CE" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="inline-block mx-2 sm:mx-4 -translate-y-1 sm:-translate-y-2 w-7 h-7 sm:w-10 sm:h-10">
              <path d="M10 11V6a2 2 0 0 1 4 0v5" />
              <path d="M14 10.5a2 2 0 0 1 4 0v.5" />
              <path d="M6 10a2 2 0 0 1 4 0v2" />
              <path d="M18 11.5a2 2 0 0 1 4 0V15a8 8 0 0 1-16 0v-4" />
            </svg>
            touch <br className="hidden sm:inline" />
            with FG Lifts
          </h2>
        </div>

        {/* Form Container Card */}
        <div className="max-w-4xl mx-auto bg-[#1A1A1A] rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 lg:p-14 shadow-2xl border border-white/5 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,79,179,0.06),transparent_60%)] pointer-events-none rounded-[2rem] sm:rounded-[3rem]" />

          {/* Subtext Card Banner */}
          <div className="mb-8 text-center sm:text-left relative z-10 border-b border-white/10 pb-6">
            <h3 className="font-sans text-xl sm:text-2xl font-bold text-white tracking-tight m-0 mb-2">
              {customTitle || 'Request Details & Pricing'}
            </h3>
            <p className="text-xs sm:text-sm text-white/70 font-normal leading-relaxed m-0">
              {customSubtitle ? (
                customSubtitle
              ) : activeProduct ? (
                <>
                  Inquire about <strong className="text-[#0797CE] font-semibold">{activeProduct}</strong>. Our technical team will respond within 24 hours.
                </>
              ) : (
                'Inquire about our lift systems and custom cabin configurations. Our technical team will respond within 24 hours.'
              )}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12 space-y-4 text-white"
              >
                <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6 text-[#0797CE]" />
                </div>
                <h3 className="font-sans text-2xl font-bold">Quote Request Sent</h3>
                <p className="text-sm text-white/60 max-w-sm mx-auto font-light leading-relaxed">
                  Thank you, {formData.name}. We will reach out within 24 hours with a customized proposal for {activeProduct || 'your project'}.
                </p>
                <button
                  onClick={() => { 
                    setStatus('idle')
                    setUserEditedMessage(false)
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      company: '',
                      city: '',
                      elevatorType: elevatorType || '',
                      floorCount: '',
                      message: getDefaultMessage(activeProduct),
                    }) 
                  }}
                  className="text-sm text-[#0797CE] font-medium cursor-pointer bg-transparent border-none underline mt-2 hover:text-white transition-colors"
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
                className="space-y-5 sm:space-y-6 relative z-10"
              >
                {/* Grid 1: Full Name & Company Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <Field label="Full Name *" error={errors.name} id="contact-name">
                    <Input
                      id="contact-name"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!errors.name}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Company Name" id="contact-company">
                    <Input
                      id="contact-company"
                      name="company"
                      placeholder="Company Name"
                      value={formData.company}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={inputClass}
                    />
                  </Field>
                </div>

                {/* Grid 2: Phone Number & Email Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <Field label="Phone Number *" error={errors.phone} id="contact-phone">
                    <Input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!errors.phone}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Email Address *" error={errors.email} id="contact-email">
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!errors.email}
                      className={inputClass}
                    />
                  </Field>
                </div>

                {/* Grid 3: Your City, Elevator Type & Floors */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  <Field label="Your City" id="contact-city">
                    <Input
                      id="contact-city"
                      name="city"
                      placeholder="Your City"
                      value={formData.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Elevator Type" id="contact-[#0797CE]">
                    <Select
                      id="contact-elevator-type"
                      name="elevatorType"
                      value={formData.elevatorType}
                      onChange={handleChange}
                      options={elevatorTypes}
                      placeholder="Select type"
                      className="w-full !bg-[#252525] !border-white/10 rounded-2xl px-4 sm:px-5 py-3.5 sm:py-4 !text-white text-sm outline-none transition-colors duration-300 focus:!border-[#0797CE] focus:ring-1 focus:ring-[#0797CE] appearance-none cursor-pointer"
                    />
                  </Field>
                  <Field label="Floors" id="contact-floor-count">
                    <Select
                      id="contact-floor-count"
                      name="floorCount"
                      value={formData.floorCount}
                      onChange={handleChange}
                      options={floorOptions}
                      placeholder="Select range"
                      className="w-full !bg-[#252525] !border-white/10 rounded-2xl px-4 sm:px-5 py-3.5 sm:py-4 !text-white text-sm outline-none transition-colors duration-300 focus:!border-[#0797CE] focus:ring-1 focus:ring-[#0797CE] appearance-none cursor-pointer"
                    />
                  </Field>
                </div>

                {/* Editable Message Textarea */}
                <Field 
                  label="Message" 
                  id="contact-message"
                  hint="Default product inquiry is prefilled above and is fully editable."
                >
                  <Textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder="Type or edit your message here"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full !bg-[#252525] !border-white/10 rounded-2xl px-4 sm:px-5 py-3.5 sm:py-4 !text-white text-sm !placeholder-white/40 outline-none transition-all duration-300 focus:!border-[#0797CE] focus:ring-1 focus:ring-[#0797CE] resize-none min-h-[120px] sm:min-h-[140px] leading-relaxed"
                  />
                </Field>

                {status === 'error' && (
                  <p className="text-[#D72638] text-xs font-mono">
                    Something went wrong. Please try again or contact us directly.
                  </p>
                )}

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-[#0797CE] hover:bg-[#0684B5] text-black py-4 px-8 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg disabled:opacity-60 cursor-pointer border-none flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0797CE] focus-visible:ring-offset-2 group"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-black" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <span>SUBMIT INQUIRY</span>
                        <ArrowRight className="w-4 h-4 text-black transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </Section>
  )
}
