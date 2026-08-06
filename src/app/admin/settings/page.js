import SettingsClient from './SettingsClient'
import { fetchSiteSettings } from '@/services/siteSettings.service'
import { getAdmin } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Website Settings | FG Lifts Admin',
  description: 'Manage brand identity, contact information, and social media profile URLs.',
}

export default async function AdminSettingsPage() {
  const reqHeaders = await headers()
  const fakeReq = { headers: reqHeaders }
  const currentAdmin = getAdmin(fakeReq)

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
