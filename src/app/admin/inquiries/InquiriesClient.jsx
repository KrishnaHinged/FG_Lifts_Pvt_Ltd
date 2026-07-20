'use client'

import { useState, useEffect } from 'react'
import { Kanban, List, Download, RefreshCw, Loader2, ArrowUpRight } from 'lucide-react'
import InquiriesKanban from '@/components/admin/InquiriesKanban'
import InquiriesTable from '@/components/admin/InquiriesTable'
import InquiryDetailModal from '@/components/admin/InquiryDetailModal'
import { hasPermission } from '@/permissions/permissions'
import { PERMISSIONS } from '@/permissions/roles'
import { AnimatePresence } from 'framer-motion'

export default function InquiriesClient({ initialInquiries, admins, currentAdmin }) {
  const [viewMode, setViewMode] = useState('kanban') // kanban | table
  const [inquiries, setInquiries] = useState(initialInquiries || [])
  const [selectedInquiry, setSelectedInquiry] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleRefresh = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/inquiries')
      const data = await res.json()
      if (data.success && data.inquiries) {
        setInquiries(data.inquiries)
        
        // Update selected inquiry reference if modal is open
        if (selectedInquiry) {
          const fresh = data.inquiries.find(i => i._id === selectedInquiry._id)
          if (fresh) setSelectedInquiry(fresh)
        }
      }
    } catch {
      console.error('Refresh error')
    } finally {
      setLoading(false)
    }
  }

  // Trigger auto refresh when selectedInquiry note list changes
  const handleUpdate = (updatedInquiry) => {
    if (updatedInquiry) {
      setInquiries(prev => prev.map(i => i._id === updatedInquiry._id ? updatedInquiry : i))
      setSelectedInquiry(updatedInquiry)
    }
    handleRefresh()
  }

  const handleExport = () => {
    window.location.href = '/api/admin/inquiries/export'
  }

  const canExport = hasPermission(currentAdmin, PERMISSIONS.EXPORT_CRM)

  return (
    <div className="space-y-6 select-none flex flex-col h-full">
      
      {/* Top Header Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="font-sans font-bold text-gray-900 text-2xl tracking-tight leading-none">
            Inquiries
          </h1>
          <span className="bg-gray-150 text-gray-500 font-mono text-xs px-2 py-0.5 rounded-full font-bold">
            {inquiries.length} total
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="p-2 border border-gray-200 hover:border-gray-300 rounded-xl bg-white hover:bg-gray-50 cursor-pointer disabled:opacity-50 outline-none transition-all flex items-center justify-center"
            title="Refresh List"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin text-gray-400" /> : <RefreshCw className="w-4 h-4 text-gray-400" />}
          </button>

          {/* View Toggles */}
          <div className="bg-gray-100 border border-gray-200/50 p-1 rounded-xl flex items-center">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                viewMode === 'kanban' ? 'bg-white text-gray-800 shadow-xs' : 'text-gray-400 hover:text-gray-600'
              }`}
              title="Kanban Board"
            >
              <Kanban className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                viewMode === 'table' ? 'bg-white text-gray-800 shadow-xs' : 'text-gray-400 hover:text-gray-600'
              }`}
              title="List Table"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Export Button */}
          {canExport && (
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-1.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-sans text-xs font-semibold px-4 py-2.5 rounded-xl cursor-pointer shadow-xs hover:shadow-md transition-all outline-none"
            >
              <Download className="w-4 h-4 text-gray-400" />
              Export CSV
            </button>
          )}
        </div>
      </div>

      {/* CRM Board views */}
      <div className="flex-1 min-h-0 bg-transparent rounded-2xl">
        {viewMode === 'kanban' ? (
          <InquiriesKanban
            inquiries={inquiries}
            admins={admins}
            currentAdmin={currentAdmin}
            onUpdate={handleUpdate}
          />
        ) : (
          <InquiriesTable
            inquiries={inquiries}
            admins={admins}
            currentAdmin={currentAdmin}
            onUpdate={handleUpdate}
            onCardClick={setSelectedInquiry}
          />
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedInquiry && (
          <InquiryDetailModal
            inquiry={selectedInquiry}
            admins={admins}
            currentAdmin={currentAdmin}
            onClose={() => setSelectedInquiry(null)}
            onUpdate={handleUpdate}
          />
        )}
      </AnimatePresence>

    </div>
  )
}
