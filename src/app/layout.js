import { Cormorant_Garamond, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import NewsletterStrip from '@/components/newsletter/NewsletterStrip'
import AppProvider from '@/providers/AppProvider'

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

export const metadata = {
  title: 'FG Lift Pvt. Ltd. | Premium Vertical Mobility Solutions',
  description: 'FG Lift — Future & Growth. Premium passenger lifts, capsule elevators, and vertical mobility solutions engineered for modern infrastructure.',
  openGraph: {
    title: 'FG Lift Pvt. Ltd.',
    description: 'Premium elevator solutions — passenger, goods, capsule, and luxury cabin lifts.',
    images: ['/images/og-home.jpg'],
  },
}

import { headers } from 'next/headers'

export default async function RootLayout({ children }) {
  const reqHeaders = await headers()
  const pathname = reqHeaders.get('x-pathname') || ''
  const isAdmin = pathname.startsWith('/admin')

  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} ${jetBrains.variable}`}>
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

