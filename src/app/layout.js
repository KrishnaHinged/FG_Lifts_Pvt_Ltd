import { Cormorant_Garamond, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import NewsletterStrip from '@/components/newsletter/NewsletterStrip'
import AppProvider from '@/providers/AppProvider'
import { headers } from 'next/headers'
import { SchemaScript } from '@/seo/schema'
import { buildOrganizationSchema, buildLocalBusinessSchema, buildWebSiteSchema } from '@/seo/jsonld'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetBrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://fglifts.com'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'FG Lifts Pvt. Ltd. | Premium Vertical Mobility Solutions',
    template: '%s | FG Lifts Pvt. Ltd.'
  },
  description: 'FG Lift — Future & Growth. Premium passenger lifts, capsule elevators, and vertical mobility solutions engineered for modern infrastructure.',
  keywords: [
    'FG Lift',
    'Elevator Manufacturer',
    'Passenger Lifts',
    'Capsule Elevators',
    'Home Lifts',
    'Commercial Elevators',
    'Vertical Mobility Solutions',
    'Ahmedabad Elevators',
    'Surat Elevators'
  ],
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'FG Lifts Pvt. Ltd. | Premium Elevator Manufacturing',
    description: 'Engineering vertical mobility systems, luxury passenger elevators, industrial goods lifts, and interactive cabin designs.',
    url: SITE_URL,
    siteName: 'FG Lifts Pvt. Ltd.',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/images/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'FG Lifts Pvt. Ltd. Premium Elevators'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FG Lifts Pvt. Ltd. | Premium Vertical Mobility Solutions',
    description: 'Engineering vertical mobility systems, luxury passenger elevators, industrial goods lifts, and interactive cabin designs.',
    images: ['/images/og-home.jpg']
  },
  icons: {
    icon: [
      { url: '/favicon.jpg', type: 'image/jpeg' },
      { url: '/images/fg-logo.jpg', type: 'image/jpeg' }
    ],
    shortcut: ['/favicon.jpg'],
    apple: ['/images/fg-logo.jpg']
  },
  robots: {
    index: true,
    follow: true
  }
}

export default async function RootLayout({ children }) {
  const reqHeaders = await headers()
  const pathname = reqHeaders.get('x-pathname') || ''
  const isAdmin = pathname.startsWith('/admin')

  const orgSchema = buildOrganizationSchema()
  const businessSchema = buildLocalBusinessSchema()
  const websiteSchema = buildWebSiteSchema()

  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} ${jetBrains.variable}`}>
      <head>
        <link rel="icon" type="image/jpeg" href="/favicon.jpg" />
        <link rel="apple-touch-icon" href="/images/fg-logo.jpg" />
        <SchemaScript schema={orgSchema} />
        <SchemaScript schema={businessSchema} />
        <SchemaScript schema={websiteSchema} />
      </head>
      <body className="bg-fg-cream font-sans antialiased">
        <a href="#main" className="sr-only focus:not-sr-only bg-fg-blue text-white px-4 py-2.5 absolute top-0 left-0 z-[9999] font-sans font-bold text-xs uppercase rounded-br-xl select-none">
          Skip to main content
        </a>
        <AppProvider>
          {isAdmin ? (
            <main id="main">{children}</main>
          ) : (
            <>
              <Navbar />
              <main id="main">{children}</main>
              <NewsletterStrip />
              <Footer />
            </>
          )}
        </AppProvider>
      </body>
    </html>
  )
}
