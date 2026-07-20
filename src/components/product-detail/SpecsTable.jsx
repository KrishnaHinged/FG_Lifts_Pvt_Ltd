'use client'

export default function SpecsTable({ specifications = [] }) {
  if (!specifications || specifications.length === 0) return null

  return (
    <div className="w-full">
      <h3 className="m-0 font-display text-base font-bold uppercase tracking-wide text-[#111111] mb-5">
        Technical Specifications
      </h3>

      <div className="w-full border-t border-[#E8E2DA]">
        {specifications.map((spec) => (
          <div
            key={spec.key}
            className="grid grid-cols-1 sm:grid-cols-12 py-4 border-b border-[#E8E2DA] items-start gap-1 sm:gap-4 px-1"
          >
            {/* Spec Key */}
            <span className="sm:col-span-4 font-mono text-[9px] uppercase tracking-wider text-[#9A9A9A] font-semibold">
              {spec.key}
            </span>

            {/* Spec Value */}
            <span className="sm:col-span-8 font-sans text-[#111111] text-sm font-semibold">
              {spec.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
