import navigationConfig from '@/config/navigation'
import routesConfig from '@/config/routes'

export const NAVIGATION = Object.freeze({
  NAVBAR: Object.freeze(navigationConfig.navbar),
  FOOTER: Object.freeze(navigationConfig.footer),
  ADMIN_SIDEBAR: Object.freeze(navigationConfig.adminSidebar),
  NAV_LINKS: Object.freeze([
    { label: 'Home', href: routesConfig.home },
    { label: 'About', href: routesConfig.about },
    { label: 'Products', href: routesConfig.products },
    { label: 'Projects', href: routesConfig.gallery },
    { label: 'Contact', href: `${routesConfig.home}#contact` }
  ])
})

export default NAVIGATION
