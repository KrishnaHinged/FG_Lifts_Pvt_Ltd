import mongoose from 'mongoose'

const SiteSettingsSchema = new mongoose.Schema({
  key:            { type: String, default: 'global_settings', unique: true },
  siteName:       { type: String, default: 'FG Lifts Pvt. Ltd.', trim: true },
  tagline:        { type: String, default: 'Future & Growth', trim: true },
  heroTitle:      { type: String, default: 'Engineered for every vertical space.', trim: true },
  contactEmail:   { type: String, default: 'info@fglifts.com', trim: true },
  contactPhone:   { type: String, default: '+91 70460 55586', trim: true },
  whatsappNumber: { type: String, default: '+91 70460 55586', trim: true },
  address:        { type: String, default: 'Surat HQ, Gujarat, India', trim: true },
  city:           { type: String, default: 'Surat', trim: true },
  region:         { type: String, default: 'Gujarat, India', trim: true },
  mapsUrl:        { type: String, default: 'https://maps.app.goo.gl/ajjJY7us73cBceP46', trim: true },
  facebookUrl:    { type: String, default: 'https://www.facebook.com/fgliftspvtltd', trim: true },
  instagramUrl:   { type: String, default: 'https://www.instagram.com/fgliftspvtltd', trim: true },
  linkedinUrl:    { type: String, default: 'https://www.linkedin.com/company/fg-lifts-private-limited/', trim: true },
  youtubeUrl:     { type: String, default: '', trim: true },
  googleWidgetEmbedUrl: { type: String, default: '', trim: true },
  googleRating:    { type: String, default: '4.9★', trim: true },
  footerText:     { type: String, default: 'Engineering vertical mobility systems, luxury passenger elevators, industrial goods lifts, and interactive cabin designs.', trim: true },
  metaDescription:{ type: String, default: 'FG Lifts Pvt. Ltd. — Premium Vertical Mobility Solutions.', trim: true },
  updatedBy:      { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
}, { timestamps: true })

export default mongoose.models.SiteSettings || mongoose.model('SiteSettings', SiteSettingsSchema)
