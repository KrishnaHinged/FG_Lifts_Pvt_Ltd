'use client'

export default function HomeLiftAccessories({ configOptions }) {
  if (!configOptions) return null

  return (
    <section className="py-20 bg-white px-6 sm:px-10 lg:px-16">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">

          <h2 className="m-0 font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#111111]">
            Premium Customizations
          </h2>
          <div className="w-16 h-[2px] bg-[#E8600A] mx-auto mt-5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Box: Ceilings & Lighting */}
          <div className="bg-[#F5F0EB]/50 border border-gray-200/80 rounded-[2rem] p-8">
            <h3 className="m-0 font-display text-xl font-bold uppercase tracking-wider text-gray-900 border-b border-gray-200 pb-4 mb-6">
              Premium Ceiling Variants
            </h3>
            <div className="space-y-4">
              {configOptions.ceilings?.map((opt, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-white p-3.5 rounded-xl border border-gray-100 shadow-[0_2px_4px_rgba(0,0,0,0.01)]">
                  <span className="w-8 h-8 rounded-full bg-[#E8600A]/10 text-[#E8600A] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                    {opt.code.slice(3)}
                  </span>
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] font-bold text-[#E8600A]">{opt.code}</span>
                    <span className="font-sans text-xs text-gray-700 font-semibold mt-0.5">{opt.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Box: Flooring & COP */}
          <div className="bg-[#F5F0EB]/50 border border-gray-200/80 rounded-[2rem] p-8">
            <h3 className="m-0 font-display text-xl font-bold uppercase tracking-wider text-gray-900 border-b border-gray-200 pb-4 mb-6">
              Control Panels (COP)
            </h3>
            <div className="space-y-4">
              {configOptions.cops?.map((opt, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-white p-3.5 rounded-xl border border-gray-100 shadow-[0_2px_4px_rgba(0,0,0,0.01)]">
                  <span className="w-8 h-8 rounded-full bg-[#0E4FB3]/10 text-[#0E4FB3] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                    {opt.code.slice(3)}
                  </span>
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] font-bold text-[#0E4FB3]">{opt.code}</span>
                    <span className="font-sans text-xs text-gray-700 font-semibold mt-0.5">{opt.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
