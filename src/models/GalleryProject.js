import mongoose from 'mongoose'

const GalleryProjectSchema = new mongoose.Schema({
  title:               { type: String, required: true, trim: true },
  location:            { type: String },       // e.g. "Surat, Gujarat"
  clientType:          { type: String },       // Residential / Commercial / Industrial / Luxury / Hospitality
  category:            { type: String },       // same as clientType — used for filtering
  year:                { type: Number },
  description:         { type: String },
  coverImage:          { type: String, required: true },
  images:              [String],               // array of image URLs
  relatedProductSlugs: [String],
  isActive:            { type: Boolean, default: true },
  sortOrder:           { type: Number, default: 0 },
}, { timestamps: true })

export default mongoose.models.GalleryProject || mongoose.model('GalleryProject', GalleryProjectSchema)
