'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Mail, FileCode, Sparkles, RefreshCw } from 'lucide-react'
import EmailTemplateEditor from '@/components/admin/EmailTemplateEditor'

export default function TemplatesClient({ initialTemplates = [], currentAdmin }) {
  const [templates, setTemplates] = useState(initialTemplates)
  const [expandedId, setExpandedId] = useState(null)
  const [isSeeding, setIsSeeding] = useState(false)

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

  const handleSeedTemplates = async () => {
    setIsSeeding(true)
    try {
      const res = await fetch('/api/admin/email-templates', { method: 'POST' })
      const data = await res.json()
      if (data.success && data.templates) {
        setTemplates(data.templates)
      }
    } catch {
      console.error('Failed to seed default email templates')
    } finally {
      setIsSeeding(false)
    }
  }

  const handleSave = () => {
    handleRefresh()
  }

  return (
    <div className="space-y-6 select-none max-w-4xl mx-auto">
      
      {/* Top Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h1 className="font-sans font-bold text-gray-900 text-2xl tracking-tight leading-none">
            Email Templates
          </h1>
          <p className="text-gray-500 font-sans text-sm">
            Customize system notifications, CRM client responses and verification layouts.
          </p>
        </div>

        {templates.length > 0 && (
          <button
            type="button"
            onClick={handleSeedTemplates}
            disabled={isSeeding}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-mono text-xs font-bold text-[#0E4FB3] bg-blue-50 border border-blue-100 hover:bg-blue-100/70 transition cursor-pointer border-none"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSeeding ? 'animate-spin' : ''}`} />
            {isSeeding ? 'Restoring...' : 'Restore Defaults'}
          </button>
        )}
      </div>

      {/* Templates Accordion Grid list */}
      <div className="space-y-4">
        {templates.map((template) => {
          const isExpanded = expandedId === template._id
          
          return (
            <div
              key={template._id || template.code}
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
          <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center space-y-4 shadow-2xs">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-[#0E4FB3] mx-auto flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-sans font-bold text-gray-900 text-base m-0">No System Email Templates Found</h3>
              <p className="font-sans text-xs text-gray-500 m-0 mt-1">
                Populate your environment with default notification templates for inquiries, CRM leads, and newsletters.
              </p>
            </div>
            <button
              type="button"
              onClick={handleSeedTemplates}
              disabled={isSeeding}
              className="inline-flex items-center gap-2 bg-[#0E4FB3] hover:bg-[#0b3e8e] text-white px-6 py-2.5 rounded-full font-sans font-bold text-xs uppercase tracking-wider transition cursor-pointer border-none shadow-sm disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              {isSeeding ? 'Seeding Templates...' : 'Seed Default Email Templates'}
            </button>
          </div>
        )}
      </div>

    </div>
  )
}
