'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Mail, FileCode, CheckCircle } from 'lucide-react'
import EmailTemplateEditor from '@/components/admin/EmailTemplateEditor'

export default function TemplatesClient({ initialTemplates = [], currentAdmin }) {
  const [templates, setTemplates] = useState(initialTemplates)
  const [expandedId, setExpandedId] = useState(null)

  const handleRefresh = async () => {
    try {
      const res = await fetch('/api/admin/email-templates')
      const data = await res.json()
      if (data.success && data.templates) {
        setTemplates(data.templates)
      }
    } catch {
      console.error('Failed to reload email templates list')
    }
  }

  const handleSave = () => {
    handleRefresh()
  }

  return (
    <div className="space-y-6 select-none max-w-4xl mx-auto">
      
      {/* Top Header */}
      <div className="space-y-1">
        <h1 className="font-sans font-bold text-gray-900 text-2xl tracking-tight leading-none">
          Email Templates
        </h1>
        <p className="text-gray-500 font-sans text-sm">
          Customize system notifications, CRM client responses and verification layouts.
        </p>
      </div>

      {/* Templates Accordion Grid list */}
      <div className="space-y-4">
        {templates.map((template) => {
          const isExpanded = expandedId === template._id
          
          return (
            <div
              key={template._id}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden transition-all duration-300"
            >
              {/* Accordion trigger row header */}
              <button
                type="button"
                onClick={() => setExpandedId(isExpanded ? null : template._id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors text-left cursor-pointer border-none outline-none bg-transparent"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-sans font-bold text-gray-900 text-sm truncate">{template.name}</span>
                    <span className="text-[10px] text-gray-400 font-mono mt-0.5 truncate uppercase tracking-widest">{template.code}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-400">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {/* Collapsed container */}
              {isExpanded && (
                <div className="border-t border-gray-100 p-6 bg-gray-50/20">
                  <EmailTemplateEditor
                    template={template}
                    currentAdmin={currentAdmin}
                    onSave={handleSave}
                  />
                </div>
              )}

            </div>
          )
        })}
        {templates.length === 0 && (
          <p className="font-mono text-xs text-gray-400 text-center py-12">No system templates found.</p>
        )}
      </div>

    </div>
  )
}
