'use client'

export default function HomeLiftParameters() {
  return (
    <section className="py-20 px-6 sm:px-10 lg:px-16 bg-gray-50 border-t border-gray-200">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">

          <h2 className="m-0 font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#111111]">
            Technical Parameters
          </h2>
          <div className="w-16 h-[2px] bg-[#E8600A] mx-auto mt-5" />
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-sans text-xs">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200 font-mono text-[9px] font-bold uppercase tracking-wider text-gray-500">
                  <th className="px-6 py-4">Model & Structure</th>
                  <th className="px-6 py-4">Duty Load</th>
                  <th className="px-6 py-4">Speed</th>
                  <th className="px-6 py-4">Car Size (CW × CD × CH)</th>
                  <th className="px-6 py-4">Door Size (OP × OPH)</th>
                  <th className="px-6 py-4">Shaft Size (HW × HD)</th>
                  <th className="px-6 py-4">Overhead (OH)</th>
                  <th className="px-6 py-4">Pit (PP)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-250/60 text-gray-700 font-medium">
                {/* Concrete/Steel structure */}
                <tr className="bg-gray-50/50">
                  <td colSpan="8" className="px-6 py-2.5 font-mono text-[9px] font-bold uppercase tracking-wider text-[#E8600A] bg-orange-50/30">
                    Concrete / Steel Shaft Parameters
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold text-gray-900">GEH160 (Concrete/Steel)</td>
                  <td className="px-6 py-4">400 kg</td>
                  <td className="px-6 py-4">0.4 m/s</td>
                  <td className="px-6 py-4">1000 × 1080 × 2200 mm</td>
                  <td className="px-6 py-4">700 × 2000 mm</td>
                  <td className="px-6 py-4">1500 × 1330 mm</td>
                  <td className="px-6 py-4">2850 mm</td>
                  <td className="px-6 py-4">250 mm</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold text-gray-900">GEH320S (Concrete/Steel)</td>
                  <td className="px-6 py-4">400 kg</td>
                  <td className="px-6 py-4">0.4 m/s</td>
                  <td className="px-6 py-4">1200 × 1280 × 2200 mm</td>
                  <td className="px-6 py-4">700 × 2000 mm</td>
                  <td className="px-6 py-4">1750 × 1500 mm</td>
                  <td className="px-6 py-4">2850 mm</td>
                  <td className="px-6 py-4">250 mm</td>
                </tr>
                {/* Aluminum structure */}
                <tr className="bg-gray-50/50">
                  <td colSpan="8" className="px-6 py-2.5 font-mono text-[9px] font-bold uppercase tracking-wider text-[#0E4FB3] bg-blue-50/20">
                    Aluminum Shaft Parameters
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold text-gray-900">GEH160 (Aluminum)</td>
                  <td className="px-6 py-4">400 kg</td>
                  <td className="px-6 py-4">0.4 m/s</td>
                  <td className="px-6 py-4">1000 × 1080 × 2200 mm</td>
                  <td className="px-6 py-4">700 × 2000 mm</td>
                  <td className="px-6 py-4">1650 × 1480 mm</td>
                  <td className="px-6 py-4">2850 mm</td>
                  <td className="px-6 py-4">250 mm</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold text-gray-900">GEH320S (Aluminum)</td>
                  <td className="px-6 py-4">400 kg</td>
                  <td className="px-6 py-4">0.4 m/s</td>
                  <td className="px-6 py-4">1200 × 1280 × 2200 mm</td>
                  <td className="px-6 py-4">700 × 2000 mm</td>
                  <td className="px-6 py-4">1900 × 1650 mm</td>
                  <td className="px-6 py-4">2850 mm</td>
                  <td className="px-6 py-4">250 mm</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold text-gray-900">SLP500 (Aluminum)</td>
                  <td className="px-6 py-4">350 kg</td>
                  <td className="px-6 py-4">0.3 m/s</td>
                  <td className="px-6 py-4">1200 × 950 × 2200 mm</td>
                  <td className="px-6 py-4">800 × 2000 mm</td>
                  <td className="px-6 py-4">1315 × 1450 mm</td>
                  <td className="px-6 py-4">2500 mm</td>
                  <td className="px-6 py-4">100 mm</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
