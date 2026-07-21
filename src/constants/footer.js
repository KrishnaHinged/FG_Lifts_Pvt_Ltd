import navigationConfig from '@/config/navigation'
import companyConfig from '@/config/company'

export const FOOTER = Object.freeze({
  SECTIONS: Object.freeze({
    COMPANY: {
      TITLE: '// Company',
      TEXT: `Engineering precision systems for luxury estates, commercial landmark towers, and high-density infrastructure across India. Established in ${companyConfig.foundingYear}.`
    },
    NAVIGATION: {
      TITLE: '// Navigation',
      LINKS: Object.freeze(navigationConfig.navbar)
    },
    CONTACT: {
      TITLE: '// Contact',
      CITY: 'Surat',
      REGION: 'Gujarat, India',
      EMAIL: companyConfig.emails.info,
      PHONE: companyConfig.phone
    },
    SOCIAL: {
      TITLE: '// Social'
    }
  }),
  COPYRIGHT: `© ${new Date().getFullYear()} ${companyConfig.name.toUpperCase()}. ALL RIGHTS RESERVED.`,
  LEGAL_LINKS: Object.freeze([
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms & Conditions', href: '/terms' }
  ])
})

export default FOOTER
