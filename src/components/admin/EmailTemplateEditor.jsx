'use client'

import { useState } from 'react'
import { FileCode, Play, Loader2 } from 'lucide-react'

export default function EmailTemplateEditor({ template, currentAdmin, onSave }) {
  const [subject, setSubject] = useState(template.subject || '')
  const [body, setBody] = useState(template.body || '')
  const [showPreview, setShowPreview] = useState(false)
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch(`/api/admin/email-templates/${template._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, body })
      })
      const data = await res.json()
      if (res.ok && data.success) {
        onSave()
        alert('Email template updated successfully!')
      } else {
        alert(data.error || 'Failed to update template')
      }
    } catch {
      alert('Network error')
    } finally {
      setSaving(false)
    }
  }

  // Compile layout preview locally (replacing mock values)
  const getCompiledPreview = () => {
    let mockValues = {
      name: 'Krishna Murthy',
      product: 'AeroLux Premium Capsule Lift',
      company: 'Future & Growth Elevators',
      referenceId: 'A1B2C3',
      executiveName: 'Rajesh Kumar',
      clientName: 'Sanjay Sharma',
      clientPhone: '+91 98765 43210',
      clientCompany: 'Apex Commercial Towers',
      assignedBy: 'Super Admin',
      adminUrl: '#'
    }
    
    let compiled = body
    Object.entries(mockValues).forEach(([key, value]) => {
      compiled = compiled.replaceAll(`{{${key}}}`, value)
    })
    return compiled
  }

  return (
    <div className="space-y-4 select-none">
      
      {/* Subject Line Input */}
      <div className="flex flex-col gap-1.5">
        <label className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold">Email Subject Line</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Template subject line..."
          className="px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white font-sans text-sm text-gray-900 outline-none focus:border-fg-blue w-full"
        />
      </div>

      {/* Editor Toggles */}
      <div className="flex border-b border-gray-100 gap-6">
        <button
          type="button"
          onClick={() => setShowPreview(false)}
          className={`pb-2.5 font-sans font-semibold text-xs uppercase tracking-wider cursor-pointer bg-transparent border-none outline-none ${
            !showPreview ? 'text-fg-blue border-b-2 border-fg-blue' : 'text-gray-400 hover:text-gray-700'
          }`}
        >
          HTML Code Editor
        </button>
        <button
          type="button"
          onClick={() => setShowPreview(true)}
          className={`pb-2.5 font-sans font-semibold text-xs uppercase tracking-wider cursor-pointer bg-transparent border-none outline-none ${
            showPreview ? 'text-fg-blue border-b-2 border-fg-blue' : 'text-gray-400 hover:text-gray-700'
          }`}
        >
          Render Layout Preview
        </button>
      </div>

      {/* Code Editor block */}
      {!showPreview ? (
        <div className="space-y-2 select-text">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={10}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 font-mono text-xs bg-gray-950 text-emerald-400 outline-none focus:border-fg-blue resize-y min-h-[250px]"
          />
          {/* Dynamic variables list */}
          <div className="flex flex-wrap items-center gap-2 select-none">
            <span className="font-mono text-[9px] uppercase tracking-wider text-gray-400 font-bold mr-1">Available Tokens:</span>
            {template.variables?.map(v => (
              <span key={v} className="bg-gray-100 border border-gray-200 text-gray-600 font-mono text-[10px] px-2 py-0.5 rounded select-all font-bold">
                {v}
              </span>
            ))}
          </div>
        </div>
      ) : (
        /* Compiled View Panel in iframe */
        <div className="border border-gray-200 rounded-xl overflow-hidden h-72 bg-white">
          <iframe
            srcDoc={getCompiledPreview()}
            title="Email Template Render Preview"
            className="w-full h-full border-none bg-white"
          />
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-end select-none">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="bg-fg-blue text-white rounded-full px-6 py-2.5 font-sans font-bold text-xs no-underline shadow-sm hover:shadow-md hover:bg-fg-blue/90 transition-all duration-300 cursor-pointer border-none outline-none disabled:opacity-50 flex items-center gap-1.5"
        >
          {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3 h-3 fill-white" />}
          Save Template changes
        </button>
      </div>

    </div>
  )
}
