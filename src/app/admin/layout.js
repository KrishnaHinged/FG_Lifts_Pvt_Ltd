import { cookies, headers } from 'next/headers'
import { verifyToken, COOKIE_NAME } from '@/lib/auth'
import AdminLayoutShell from '@/components/admin/AdminLayoutShell'

export const metadata = {
  title: 'FG Lift Admin Console',
  description: 'FG Lifts Pvt. Ltd. internal CRM and content management systems.',
}

export default async function AdminLayout({ children }) {
  const reqHeaders = await headers()
  const pathname = reqHeaders.get('x-pathname') || ''

  // If we are on the login or forgot-password page, bypass layout decoration completely
  if (pathname.includes('/admin/login') || pathname.includes('/admin/forgot-password')) {
    return <div className="admin select-none bg-[#F5F0EB] min-h-screen w-full flex items-center justify-center">{children}</div>
  }

  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  const admin = token ? verifyToken(token) : null

  // If no admin token, bypass layout decoration (allows login screen render)
  if (!admin) {
    return <div className="admin select-none bg-[#F5F0EB] min-h-screen w-full flex items-center justify-center">{children}</div>
  }

  return (
    <AdminLayoutShell admin={admin}>
      {children}
    </AdminLayoutShell>
  )
}
