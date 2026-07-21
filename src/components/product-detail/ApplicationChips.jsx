'use client'

import { Home, Building2, Factory, HeartPulse, Hotel, HelpCircle } from 'lucide-react'

const iconMap = {
  residential: Home,
  commercial: Building2,
  industrial: Factory,
  hospital: HeartPulse,
  healthcare: HeartPulse,
  hospitality: Hotel,
  luxury: Hotel
}

export default function ApplicationChips({ applications = [] }) {
  if (!applications || applications.length === 0) return null

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-1 h-5 rounded-full bg-[#0E4FB3]" />
        <h3 className="m-0 font-display text-lg font-bold uppercase tracking-wide text-[#111111]">
          Ideal Applications
        </h3>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {applications.map((app) => {
          const key = app.toLowerCase().trim()
          const Icon = iconMap[key] || HelpCircle

          return (
            <span
              key={app}
              className="inline-flex items-center gap-2.5 bg-white text-[#0E4FB3] font-mono text-[9px] uppercase tracking-[0.18em] px-4 py-2.5 rounded-full border border-[#0E4FB3]/15 font-bold shadow-xs hover:border-[#0E4FB3]/30 hover:shadow-[0_4px_16px_-4px_rgba(14,79,179,0.12)] transition-all duration-300 cursor-default"
            >
              <span className="w-5 h-5 rounded-md bg-[#0E4FB3]/[0.06] flex items-center justify-center">
                <Icon className="w-3 h-3 text-[#0E4FB3]" />
              </span>
              {app}
            </span>
          )
        })}
      </div>
    </div>
  )
}
