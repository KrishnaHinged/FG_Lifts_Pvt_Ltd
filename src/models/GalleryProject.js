import mongoose from 'mongoose'

const GalleryProjectSchema = new mongoose.Schema({
  title:               { type: String, required: true, trim: true },
  subtitle:            { type: String, trim: true },
  slug:                { type: String, trim: true },
  location:            { type: String },       // e.g. "Surat, Gujarat"
  clientType:          { type: String },       // Residential / Commercial / Industrial / Luxury / Hospitality
  category:            { type: String },       // same as clientType — used for filtering
  year:                { type: Number },
  completionYear:      { type: Number },
  description:         { type: String },
  coverImage:          { type: String, required: true },
  images:              [String],               // array of image URLs
  badge:               { type: String },
  isFeatured:          { type: Boolean, default: false },
  isActive:            { type: Boolean, default: true },
  sortOrder:           { type: Number, default: 0 },
  linkedProducts:      [String],
  relatedProductSlugs: [String],
  seoTitle:            { type: String, trim: true },
  seoDescription:      { type: String, trim: true },
  seoKeywords:         { type: String, trim: true },
}, { timestamps: true })

export default mongoose.models.GalleryProject || mongoose.model('GalleryProject', GalleryProjectSchema)

