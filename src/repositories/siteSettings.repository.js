import { connectDB } from '@/lib/mongodb'
import SiteSettings from '@/models/SiteSettings'

const DEFAULT_SETTINGS = {
  key: 'global_settings',
  siteName: 'FG Lifts Pvt. Ltd.',
  tagline: 'Future & Growth',
  heroTitle: 'Engineered for every vertical space.',
  contactEmail: 'info@fglifts.com',
  contactPhone: '+91 70460 55586',
  whatsappNumber: '+91 70460 55586',
  address: 'Surat HQ, Gujarat, India',
  city: 'Surat',
  region: 'Gujarat, India',
  mapsUrl: 'https://maps.app.goo.gl/ajjJY7us73cBceP46',
  facebookUrl: 'https://www.facebook.com/fgliftspvtltd',
  instagramUrl: 'https://www.instagram.com/fgliftspvtltd',
  linkedinUrl: 'https://www.linkedin.com/company/fg-lifts-private-limited/',
  youtubeUrl: '',
  footerText: 'Engineering vertical mobility systems, luxury passenger elevators, industrial goods lifts, and interactive cabin designs.',
  metaDescription: 'FG Lifts Pvt. Ltd. — Premium Vertical Mobility Solutions.',
}

export async function getSiteSettings() {
  try {
    await connectDB()
    let settings = await SiteSettings.findOne({ key: 'global_settings' }).lean()
    if (!settings) {
      const created = await SiteSettings.create(DEFAULT_SETTINGS)
      settings = created.toObject()
    }
    return settings
  } catch (err) {
    console.warn('getSiteSettings database fallback:', err.message)
    return DEFAULT_SETTINGS
  }
}

export async function updateSiteSettings(data, adminId) {
  await connectDB()
  const payload = {
    ...data,
    key: 'global_settings',
    updatedBy: adminId,
  }
  const settings = await SiteSettings.findOneAndUpdate(
    { key: 'global_settings' },
    payload,
    { upsert: true, returnDocument: 'after' }
  ).lean()
  return settings
}
