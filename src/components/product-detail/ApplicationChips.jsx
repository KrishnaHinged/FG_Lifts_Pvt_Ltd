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
      <h3 className="m-0 font-display text-base font-bold uppercase tracking-wide text-[#111111] mb-4">
        Ideal Applications
      </h3>

      <div className="flex flex-wrap gap-2.5">
        {applications.map((app) => {
          const key = app.toLowerCase().trim()
          const Icon = iconMap[key] || HelpCircle

          return (
            <span
              key={app}
              className="inline-flex items-center gap-2 bg-[#0E4FB3]/5 text-[#0E4FB3] font-mono text-[9px] uppercase tracking-wider px-4 py-2 rounded-full border border-[#0E4FB3]/10 font-bold"
            >
              <Icon className="w-3 h-3" />
              {app}
            </span>
          )
        })}
      </div>
    </div>
  )
}
