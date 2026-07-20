import { headers } from 'next/headers'
import Link from 'next/link'
import { connectDB } from '@/lib/mongodb'
import Inquiry from '@/models/Inquiry'
import Product from '@/models/Product'
import Subscriber from '@/models/Subscriber'
import BlogPost from '@/models/BlogPost'
import EmailQueue from '@/models/EmailQueue'
import StatCard from '@/components/admin/StatCard'
import {
  Inbox,
  Sparkles,
  Boxes,
  Users,
  BookOpen,
  Mail,
  ArrowRight,
  Plus,
  FileText
} from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  await connectDB()

  // Retrieve admin info from request headers injected by middleware
  const reqHeaders = await headers()
  const adminName = reqHeaders.get('x-admin-name') || 'Admin'
  const adminRole = reqHeaders.get('x-admin-role') || ''
  const adminId = reqHeaders.get('x-admin-id') || ''

  // Fetch metrics in parallel
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const [
    totalInquiries,
    newInquiries,
    activeProducts,
    subscribers,
    postsPublished,
    pendingEmails,
    recentInquiries
  ] = await Promise.all([
    Inquiry.countDocuments(),
    Inquiry.countDocuments({ status: 'New', createdAt: { $gte: thirtyDaysAgo } }),
    Product.countDocuments({ isActive: true }),
    Subscriber.countDocuments({ isActive: true }),
    BlogPost.countDocuments({ isPublished: true }),
    EmailQueue.countDocuments({ status: 'pending' }),
    Inquiry.find(adminRole === 'SALES_EXECUTIVE' ? { assignedTo: adminId } : {})
      .sort({ createdAt: -1 })
      .limit(10)
      .lean()
  ])

  // Simple relative time display
  const getRelativeTime = (dateStr) => {
    const diff = new Date() - new Date(dateStr)
    const mins = Math.floor(diff / 60000)
    const hours = Math.floor(mins / 60)
    const days = Math.floor(hours / 24)

    if (mins < 60) return `${mins || 1}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'New': return 'bg-blue-50 text-blue-700 border-blue-100'
      case 'Contacted': return 'bg-amber-50 text-amber-700 border-amber-100'
      case 'Qualified': return 'bg-emerald-50 text-emerald-700 border-emerald-100'
      case 'Closed': return 'bg-gray-50 text-gray-500 border-gray-200'
      case 'Rejected': return 'bg-red-50 text-red-700 border-red-100'
      default: return 'bg-gray-50 text-gray-400'
    }
  }

  return (
    <div className="space-y-8 select-none">
      
      {/* Welcome header */}
      <div className="space-y-1">
        <h1 className="font-sans font-bold text-gray-900 text-2xl tracking-tight leading-none">
          Dashboard
        </h1>
        <p className="text-gray-500 font-sans text-sm">
          Good morning, {adminName} — here is the platform status summary.
        </p>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Leads" value={totalInquiries} iconName="inbox" color="blue" />
        <StatCard title="Fresh Leads (30d)" value={newInquiries} iconName="sparkles" color="amber" />
        <StatCard title="Active Systems" value={activeProducts} iconName="boxes" color="green" />
        <StatCard title="Subscribers" value={subscribers} iconName="users" color="blue" />
        <StatCard title="Published Articles" value={postsPublished} iconName="bookOpen" color="green" />
        <StatCard title="Pending Outbox" value={pendingEmails} iconName="mail" color="amber" />
      </div>

      {/* Action splits */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6">
        
        {/* Left Column: Recent Leads table */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <span className="font-sans font-bold text-gray-900 text-sm">Recent CRM Leads</span>
            <Link
              href="/admin/inquiries"
              className="text-xs text-fg-blue font-bold flex items-center gap-1 hover:underline no-underline"
            >
              Pipeline Board
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse" role="table">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 font-mono text-[9px] font-bold uppercase tracking-wider text-gray-400">
                  <th className="px-6 py-3" scope="col">Client</th>
                  <th className="px-6 py-3" scope="col">Elevator type</th>
                  <th className="px-6 py-3" scope="col">Status</th>
                  <th className="px-6 py-3 text-right" scope="col">Age</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-sans text-xs text-gray-700">
                {recentInquiries.map((inquiry) => (
                  <tr key={inquiry._id}>
                    <td className="px-6 py-3" scope="row">
                      <div className="flex flex-col font-semibold text-gray-950">
                        <span>{inquiry.name}</span>
                        <span className="text-[10px] text-gray-400 font-normal">{inquiry.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <span className="bg-gray-100 font-mono text-[9px] text-gray-500 font-bold px-1.5 py-0.5 rounded">
                        {inquiry.elevatorType || 'Passenger'}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full font-bold border ${getStatusBadge(inquiry.status)}`}>
                        {inquiry.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-right text-gray-400 font-mono">
                      {getRelativeTime(inquiry.createdAt)}
                    </td>
                  </tr>
                ))}
                {recentInquiries.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center py-8 text-gray-400 font-mono">
                      No inquiries recorded.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Quick Actions menu panel */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col space-y-4">
          <h3 className="font-sans font-bold text-gray-900 text-sm border-b border-gray-100 pb-2">
            Quick Actions
          </h3>
          <div className="flex flex-col gap-3">
            <Link
              href="/admin/inquiries"
              className="flex items-center justify-between p-3.5 border border-gray-200 hover:border-fg-blue rounded-xl text-xs font-semibold font-sans text-gray-700 hover:text-fg-blue transition-all no-underline bg-white"
            >
              <span className="flex items-center gap-2">
                <Inbox className="w-4.5 h-4.5 text-gray-400" />
                View Leads Pipeline
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/admin/products/new"
              className="flex items-center justify-between p-3.5 border border-gray-200 hover:border-fg-blue rounded-xl text-xs font-semibold font-sans text-gray-700 hover:text-fg-blue transition-all no-underline bg-white"
            >
              <span className="flex items-center gap-2">
                <Boxes className="w-4.5 h-4.5 text-gray-400" />
                Add New Product
              </span>
              <Plus className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/admin/blog/new"
              className="flex items-center justify-between p-3.5 border border-gray-200 hover:border-fg-blue rounded-xl text-xs font-semibold font-sans text-gray-700 hover:text-fg-blue transition-all no-underline bg-white"
            >
              <span className="flex items-center gap-2">
                <FileText className="w-4.5 h-4.5 text-gray-400" />
                Write Blog Post
              </span>
              <Plus className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/admin/newsletter"
              className="flex items-center justify-between p-3.5 border border-gray-200 hover:border-fg-blue rounded-xl text-xs font-semibold font-sans text-gray-700 hover:text-fg-blue transition-all no-underline bg-white"
            >
              <span className="flex items-center gap-2">
                <Users className="w-4.5 h-4.5 text-gray-400" />
                Newsletter Roster
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  )
}
