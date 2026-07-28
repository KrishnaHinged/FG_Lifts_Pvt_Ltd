import mongoose from 'mongoose'

const ColorFinishTextureSchema = new mongoose.Schema({
  finishName: { type: String, required: true },
  panoramaImages: {
    sphere:  String,
    front:   String,
    back:    String,
    left:    String,
    right:   String,
    ceiling: String,
    floor:   String,
  }
}, { _id: false })

const ColorVariantSchema = new mongoose.Schema({
  name:  { type: String, required: true },   // e.g. "Champagne Gold"
  hex:   { type: String },                   // e.g. "#C9A84C"
  panoramaImages: {
    sphere:  String,
    front:   String,
    back:    String,
    left:    String,
    right:   String,
    ceiling: String,
    floor:   String,
  },
  finishTextures: [ColorFinishTextureSchema],
  isActive: { type: Boolean, default: true }
}, { _id: false })

const FinishVariantSchema = new mongoose.Schema({
  name:        { type: String, required: true },  // Mirror / Hairline / Brushed / Satin
  description: { type: String },                  // Description e.g. "Elegant brushed texture finish"
  isActive:    { type: Boolean, default: true }
}, { _id: false })

const SpecSchema = new mongoose.Schema({
  key:   { type: String, required: true },
  value: { type: String, required: true }
}, { _id: false })

const ImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  alt: { type: String, default: '' }
}, { _id: false })

const ProductSchema = new mongoose.Schema({
  slug:           { type: String, required: true, unique: true, lowercase: true, trim: true },
  name:           { type: String, required: true, trim: true },
  tagline:        { type: String },
  category:       { type: String, required: true },
  // category options: Passenger | Goods | Capsule | Home | Hospital | Panoramic
  subCategory:    { type: String },
  tabGroup:       { type: String, enum: ['Systems', 'Cabins', 'Components'], default: 'Systems' },
  description:    { type: String },
  specifications: [SpecSchema],
  features:       [String],
  applications:   [String],   // Residential / Commercial / Industrial / Hospital
  images:         [ImageSchema],
  brochureUrl:    { type: String },
  has360View:     { type: Boolean, default: false },
  defaultColor:   { type: String },
  defaultFinish:  { type: String },
  metaTitle:      { type: String },
  metaDescription:{ type: String },
  metaKeywords:   { type: String },
  colorVariants:  [ColorVariantSchema],
  finishVariants: [FinishVariantSchema],
  isFeatured:     { type: Boolean, default: false },
  badge:          { type: String },   // "NEW" | "360° View" | "Bestseller" | ""
  isActive:       { type: Boolean, default: true },
  sortOrder:      { type: Number, default: 0 },
}, { timestamps: true })

export default mongoose.models.Product || mongoose.model('Product', ProductSchema)
