'use client'

export default function SectionCard({ id, title, description, icon: Icon, action, children, emptyState }) {
  return (
    <section id={id} className="bg-white border border-[#E8E2DA] rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_-10px_rgba(17,17,17,0.05)] space-y-6 scroll-mt-28 select-none">
      
      {/* Header */}
      <div className="flex items-start justify-between border-b border-[#E8E2DA]/60 pb-5">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="w-10 h-10 rounded-2xl bg-[#0E4FB3]/[0.08] flex items-center justify-center text-[#0E4FB3] shrink-0">
              <Icon className="w-5 h-5" />
            </div>
          )}
          <div>
            <h2 className="font-display text-[#111111] text-lg font-bold tracking-tight m-0">
              {title}
            </h2>
            {description && (
              <p className="font-sans text-xs text-[#6B6B6B] mt-1 m-0 leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </div>

        {action && (
          <div className="shrink-0">
            {action}
          </div>
        )}
      </div>

      {/* Main Body or Empty State */}
      {emptyState ? (
        <div className="py-12 border-2 border-dashed border-[#E8E2DA] rounded-2xl flex flex-col items-center justify-center text-center p-6 bg-[#F5F0EB]/30">
          {emptyState.icon && (
            <div className="w-12 h-12 rounded-2xl bg-gray-100 text-gray-400 flex items-center justify-center mb-3">
              <emptyState.icon className="w-6 h-6" />
            </div>
          )}
          <h4 className="font-sans font-bold text-sm text-[#111111] m-0">
            {emptyState.title}
          </h4>
          <p className="font-sans text-xs text-[#6B6B6B] mt-1 max-w-sm m-0">
            {emptyState.description}
          </p>
          {emptyState.action && (
            <div className="mt-4">
              {emptyState.action}
            </div>
          )}
        </div>
      ) : (
        children
      )}

    </section>
  )
}
