import { cookies, headers } from 'next/headers'
import { verifyToken, COOKIE_NAME } from '@/lib/auth'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminTopbar from '@/components/admin/AdminTopbar'

export const metadata = {
  title: 'FG Lift Admin Console',
  description: 'FG Lift Pvt. Ltd. internal CRM and content management systems.',
}

export default async function AdminLayout({ children }) {
  const reqHeaders = await headers()
  const pathname = reqHeaders.get('x-pathname') || ''

  // If we are on the login page, bypass layout decoration completely
  if (pathname.includes('/admin/login')) {
    return <div className="admin select-none bg-[#111827] min-h-screen flex items-center justify-center">{children}</div>
  }

  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  const admin = token ? verifyToken(token) : null

  // If no admin token, bypass layout decoration (allows login screen render)
  if (!admin) {
    return <div className="admin select-none bg-[#111827] min-h-screen flex items-center justify-center">{children}</div>
  }

  return (
    <div className="admin flex h-screen bg-[#F4F6F9] overflow-hidden">
      <AdminSidebar admin={admin} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminTopbar admin={admin} />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 bg-[#F4F6F9]">
          {children}
        </main>
      </div>
    </div>
  )
}
