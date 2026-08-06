import SettingsClient from './SettingsClient'
import { fetchSiteSettings } from '@/services/siteSettings.service'
import { verifyToken, COOKIE_NAME } from '@/lib/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Website Settings | FG Lifts Admin',
  description: 'Manage brand identity, contact information, and social media profile URLs.',
}

export default async function AdminSettingsPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  const currentAdmin = token ? verifyToken(token) : null

  if (!currentAdmin) {
    redirect('/admin/login')
  }

  const settings = await fetchSiteSettings()
  const plainSettings = JSON.parse(JSON.stringify(settings))

  return (
    <SettingsClient
      initialSettings={plainSettings}
      currentAdmin={currentAdmin}
    />
  )
}
