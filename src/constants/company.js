import companyConfig from '@/config/company'

export const COMPANY = Object.freeze({
  NAME: companyConfig.name,
  SHORT_NAME: companyConfig.shortName,
  TAGLINE: companyConfig.tagline,
  FOUNDED_YEAR: companyConfig.foundingYear,
  PHONE: companyConfig.phone,
  EMAILS: Object.freeze(companyConfig.emails),
  ADDRESSES: Object.freeze(companyConfig.addresses),
  GST: companyConfig.gst,
  WORKING_HOURS: companyConfig.workingHours,
  MAPS_URL: companyConfig.mapsUrl
})

export default COMPANY
