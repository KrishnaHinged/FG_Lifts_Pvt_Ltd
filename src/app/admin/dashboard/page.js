import { headers } from 'next/headers'
import Link from 'next/link'
import { connectDB } from '@/lib/mongodb'
import Inquiry from '@/models/Inquiry'
import Product from '@/models/Product'
import Subscriber from '@/models/Subscriber'
import BlogPost from '@/models/BlogPost'
import EmailQueue from '@/models/EmailQueue'
import StatCard from '@/components/admin/StatCard'
import PageHeader from '@/components/composition/PageHeader'
import Table from '@/components/composition/Table'
import Badge from '@/components/ui/Badge'
import {
  Inbox,
  Sparkles,
  Boxes,
  Users,
  BookOpen,
  Mail,
  ArrowRight,
  Plus,
  FileText,
  Activity
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

  const getStatusVariant = (status) => {
    switch (status) {
      case 'New': return 'primary'
      case 'Contacted': return 'warning'
      case 'Qualified': return 'success'
      case 'Closed': return 'neutral'
      case 'Rejected': return 'danger'
      default: return 'neutral'
    }
  }

  return (
    <div className="space-y-8 select-none">
      
      {/* Welcome header */}
      <PageHeader
        title="Admin Dashboard"
        subtitle={`Welcome back, ${adminName} — platform status and live activity feed.`}
      />

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
        <div className="bg-white border border-[#E8E2DA] rounded-2xl shadow-xs overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-[#E8E2DA] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#0E4FB3]" />
              <span className="font-sans font-bold text-[#111111] text-sm">Recent CRM Leads</span>
            </div>
            <Link
              href="/admin/inquiries"
              className="text-xs text-[#0E4FB3] font-bold flex items-center gap-1 hover:underline no-underline"
            >
              Pipeline Board
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex-1 overflow-x-auto">
            <Table>
              <thead>
                <tr className="bg-[#EDE8E2]/50 border-b border-[#E8E2DA]">
                  <th className="px-6 py-3 font-mono text-[9px] font-bold uppercase tracking-widest text-[#7A7A7A]" scope="col">Client</th>
                  <th className="px-6 py-3 font-mono text-[9px] font-bold uppercase tracking-widest text-[#7A7A7A]" scope="col">Elevator type</th>
                  <th className="px-6 py-3 font-mono text-[9px] font-bold uppercase tracking-widest text-[#7A7A7A]" scope="col">Status</th>
                  <th className="px-6 py-3 font-mono text-[9px] font-bold uppercase tracking-widest text-[#7A7A7A] text-right" scope="col">Age</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E2DA]">
                {recentInquiries.map((inquiry) => (
                  <tr key={inquiry._id} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="px-6 py-3" scope="row">
                      <div className="flex flex-col font-semibold text-[#111111]">
                        <span>{inquiry.name}</span>
                        <span className="text-[10px] text-[#7A7A7A] font-mono font-normal">{inquiry.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <span className="bg-[#EDE8E2] font-mono text-[9px] text-[#555555] font-bold px-2 py-0.5 rounded">
                        {inquiry.elevatorType || 'Passenger'}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <Badge variant={getStatusVariant(inquiry.status)}>
                        {inquiry.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-3 text-right text-[#7A7A7A] font-mono text-xs">
                      {getRelativeTime(inquiry.createdAt)}
                    </td>
                  </tr>
                ))}
                {recentInquiries.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center py-8 text-[#7A7A7A] font-mono text-xs">
                      No inquiries recorded.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>

        {/* Right Column: Quick Actions menu panel */}
        <div className="bg-white border border-[#E8E2DA] rounded-2xl p-6 shadow-xs flex flex-col space-y-4">
          <h3 className="font-sans font-bold text-[#111111] text-sm border-b border-[#E8E2DA] pb-3 m-0">
            Quick Actions
          </h3>
          <div className="flex flex-col gap-3">
            <Link
              href="/admin/inquiries"
              className="flex items-center justify-between p-3.5 border border-[#E8E2DA] hover:border-[#0E4FB3] rounded-xl text-xs font-semibold font-sans text-[#555555] hover:text-[#0E4FB3] hover:bg-neutral-50 transition-all no-underline bg-white"
            >
              <span className="flex items-center gap-2.5">
                <Inbox className="w-4 h-4 text-[#7A7A7A]" />
                View Leads Pipeline
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/admin/products/new"
              className="flex items-center justify-between p-3.5 border border-[#E8E2DA] hover:border-[#0E4FB3] rounded-xl text-xs font-semibold font-sans text-[#555555] hover:text-[#0E4FB3] hover:bg-neutral-50 transition-all no-underline bg-white"
            >
              <span className="flex items-center gap-2.5">
                <Boxes className="w-4 h-4 text-[#7A7A7A]" />
                Add New Product
              </span>
              <Plus className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/admin/blog/new"
              className="flex items-center justify-between p-3.5 border border-[#E8E2DA] hover:border-[#0E4FB3] rounded-xl text-xs font-semibold font-sans text-[#555555] hover:text-[#0E4FB3] hover:bg-neutral-50 transition-all no-underline bg-white"
            >
              <span className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-[#7A7A7A]" />
                Write Blog Post
              </span>
              <Plus className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/admin/newsletter"
              className="flex items-center justify-between p-3.5 border border-[#E8E2DA] hover:border-[#0E4FB3] rounded-xl text-xs font-semibold font-sans text-[#555555] hover:text-[#0E4FB3] hover:bg-neutral-50 transition-all no-underline bg-white"
            >
              <span className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-[#7A7A7A]" />
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
