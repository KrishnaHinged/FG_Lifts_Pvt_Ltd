import mongoose from 'mongoose'

const TestimonialSchema = new mongoose.Schema({
  name:      { type: String, required: true, trim: true },
  title:     { type: String, default: '', trim: true },
  quote:     { type: String, required: true, trim: true },
  bgColor:   { type: String, default: 'bg-[#1A1A1A] text-white' },
  isActive:  { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 }
}, { timestamps: true })

export default mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema)
