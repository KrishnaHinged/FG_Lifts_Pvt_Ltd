import routesConfig from './routes'

export const navigationConfig = {
  navbar: [
    { label: 'Home', href: routesConfig.home },
    { label: 'About Us', href: routesConfig.about },
    { label: 'Elevators & Products', href: routesConfig.products },
    { label: 'Case Studies', href: routesConfig.gallery },
    { label: 'Editorial Blog', href: routesConfig.blog }
  ],
  footer: {
    divisions: [
      { label: 'Passenger Elevators', href: `${routesConfig.products}?tabGroup=Systems&category=Passenger` },
      { label: 'Heavy-Duty Goods Lifts', href: `${routesConfig.products}?tabGroup=Systems&category=Goods` },
      { label: 'Capsule Glass Elevators', href: `${routesConfig.products}?tabGroup=Systems&category=Capsule` },
      { label: 'Luxury Home Elevators', href: `${routesConfig.products}?tabGroup=Systems&category=Home` },
      { label: 'Bespoke Cabin Designs', href: `${routesConfig.products}?tabGroup=Cabins` }
    ],
    quickLinks: [
      { label: 'About Brand Timeline', href: routesConfig.about },
      { label: 'Products Directory', href: routesConfig.products },
      { label: 'Masonry Portfolio', href: routesConfig.gallery },
      { label: 'Resource Blog Articles', href: routesConfig.blog },
      { label: 'Corporate Office Maps', href: `${routesConfig.home}#contact` }
    ],
    legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Standard SLA', href: '#' }
    ]
  },
  adminSidebar: [
    { label: 'Dashboard', href: routesConfig.admin.dashboard, icon: 'LayoutDashboard' },
    { label: 'Leads CRM', href: routesConfig.admin.inquiries, icon: 'Users' },
    { label: 'CMS Products', href: routesConfig.admin.products, icon: 'Package' },
    { label: 'CMS Gallery', href: routesConfig.admin.gallery, icon: 'Image' },
    { label: 'CMS Blog', href: routesConfig.admin.blog, icon: 'FileText' },
    { label: 'CMS Testimonials', href: routesConfig.admin.testimonials, icon: 'MessageSquareQuote' },
    { label: 'Newsletter', href: routesConfig.admin.newsletter, icon: 'Mail' },
    { label: 'Team Accounts', href: routesConfig.admin.users, icon: 'ShieldAlert' },
    { label: 'Email Templates', href: routesConfig.admin.emailTemplates, icon: 'Code2' },
    { label: 'Audit Logs', href: routesConfig.admin.logs, icon: 'FileCode' }
  ]
}

export default navigationConfig
