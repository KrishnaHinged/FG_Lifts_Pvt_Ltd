'use client'

export function FieldLabel({ children, required = false, badge = null, helper = null, htmlFor = undefined }) {
  return (
    <div className="flex items-center justify-between gap-2 mb-1.5 select-none">
      <label htmlFor={htmlFor} className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-[#6B6B6B] font-bold flex items-center gap-1.5">
        {children}
        {required && <span className="text-red-500 font-bold text-xs">*</span>}
        {badge && (
          <span className="font-mono text-[8px] uppercase tracking-wider text-[#0E4FB3] bg-[#0E4FB3]/10 px-2 py-0.5 rounded-full font-bold">
            {badge}
          </span>
        )}
      </label>

      {helper && (
        <span className="font-sans text-[10px] text-[#9A9A9A]">
          {helper}
        </span>
      )}
    </div>
  )
}

export function ToggleSwitch({ checked, onChange, label, sublabel, disabled = false }) {
  return (
    <label className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer select-none ${
      checked
        ? 'border-[#0E4FB3]/30 bg-[#0E4FB3]/[0.03]'
        : 'border-[#E8E2DA] bg-white hover:border-[#0E4FB3]/20'
    } ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
      <input
        type="checkbox"
        checked={Boolean(checked)}
        onChange={onChange}
        disabled={disabled}
        className="sr-only"
      />
      <div className="flex flex-col gap-0.5 pr-4">
        {label && <span className="font-sans text-xs font-bold text-[#111111]">{label}</span>}
        {sublabel && <span className="font-sans text-[10px] text-[#6B6B6B]">{sublabel}</span>}
      </div>

      <div className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
        checked ? 'bg-[#0E4FB3]' : 'bg-gray-200'
      }`}>
        <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          checked ? 'translate-x-4' : 'translate-x-0'
        }`} />
      </div>
    </label>
  )
}

export function CompletionBadge({ isComplete }) {
  if (isComplete) {
    return (
      <span className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-[9px] shrink-0">
        ✓
      </span>
    )
  }

  return (
    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
  )
}
