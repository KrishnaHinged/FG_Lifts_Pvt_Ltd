'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, CheckCircle } from 'lucide-react'
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

  // Visual classes specifically crafted to preserve the dark form container aesthetics
  const inputClass = "w-full !bg-[#252525] !border-white/10 rounded-2xl px-5 py-4 !text-white text-sm !placeholder-white/40 outline-none transition-colors duration-300 focus:!border-[#0797CE] focus:ring-1 focus:ring-[#0797CE]"

  return (
    <Section id="contact" background="cream" size="none" className="py-[120px] sm:py-[180px] select-none relative overflow-hidden">
      <div className="absolute top-[10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(165,124,240,0.12)_0%,transparent_70%)] blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(168,230,120,0.15)_0%,transparent_70%)] blur-[100px] pointer-events-none z-0" />

      <Container className="relative z-10 max-w-[1380px]">
        {/* Header Block */}
        <div className="flex flex-col items-center text-center gap-4 mb-16 max-w-3xl mx-auto">
          <h2 className="font-sans text-4xl sm:text-5xl lg:text-[4rem] font-bold tracking-tight uppercase leading-[1.05] text-[#111111] m-0">
            Get in
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
                  <Field label="Full Name *" error={errors.name} id="contact-name">
                    <Input
                      id="contact-name"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!errors.name}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Email *" error={errors.email} id="contact-email">
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!errors.email}
                      className={inputClass}
                    />
                  </Field>
                </div>

                {/* Grid 2: Phone & Company */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <Field label="Phone *" error={errors.phone} id="contact-phone">
                    <Input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!errors.phone}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Company" id="contact-company">
                    <Input
                      id="contact-company"
                      name="company"
                      placeholder="Enter your company name"
                      value={formData.company}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={inputClass}
                    />
                  </Field>
                </div>

                {/* Grid 3: City, Elevator Type & Floors */}
                <div className="grid sm:grid-cols-3 gap-6">
                  <Field label="City" id="contact-city">
                    <Input
                      id="contact-city"
                      name="city"
                      placeholder="Enter city"
                      value={formData.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Elevator Type" id="contact-elevator-type">
                    <Select
                      id="contact-elevator-type"
                      name="elevatorType"
                      value={formData.elevatorType}
                      onChange={handleChange}
                      options={elevatorTypes}
                      placeholder="Select type"
                      className="w-full !bg-[#252525] !border-white/10 rounded-2xl px-5 py-4 !text-white text-sm outline-none transition-colors duration-300 focus:!border-[#0797CE] focus:ring-1 focus:ring-[#0797CE] appearance-none cursor-pointer"
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
                      className="w-full !bg-[#252525] !border-white/10 rounded-2xl px-5 py-4 !text-white text-sm outline-none transition-colors duration-300 focus:!border-[#0797CE] focus:ring-1 focus:ring-[#0797CE] appearance-none cursor-pointer"
                    />
                  </Field>
                </div>

                {/* Message */}
                <Field label="Message" id="contact-message">
                  <Textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder="Type your message here"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full !bg-[#252525] !border-white/10 rounded-2xl px-5 py-4 !text-white text-sm !placeholder-white/40 outline-none transition-colors duration-300 focus:!border-[#0797CE] focus:ring-1 focus:ring-[#0797CE] resize-none h-36"
                  />
                </Field>

                {status === 'error' && (
                  <p className="text-[#D72638] text-xs font-mono">
                    Something went wrong. Please try again or contact us directly.
                  </p>
                )}

                {/* Submit Pill Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full sm:w-auto min-w-[160px] bg-[#0797CE] text-black py-4 px-10 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:bg-[#3263d5] hover:scale-105 disabled:opacity-60 cursor-pointer border-none flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0797CE] focus-visible:ring-offset-2"
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
      </Container>
    </Section>
  )
}
