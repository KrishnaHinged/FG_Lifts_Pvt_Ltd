'use client'

export default function TransitionScene() {
  return (
    <div className="transition-scene absolute inset-0 w-full h-full z-30 hidden flex-col pointer-events-none">
      {/* Top elevator door panel */}
      <div 
        className="transition-door-top h-1/2 w-full bg-gradient-to-r from-[#1C1D1F] via-[#2A2B2D] to-[#1C1D1F] border-b border-[#E8E2DA]/15 flex items-end justify-center relative transition-all duration-300"
      >
        {/* Brushed metal detail stripes */}
        <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#0E4FB3]/30" />
        <div className="absolute bottom-4 left-0 right-0 h-[2px] bg-[#E8E2DA]/5" />
        {/* Mechanical seam indicator */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-2 bg-[#0E4FB3]/80 rounded-t-md shadow-lg" />
      </div>

      {/* Bottom elevator door panel */}
      <div 
        className="transition-door-bottom h-1/2 w-full bg-gradient-to-r from-[#1C1D1F] via-[#2A2B2D] to-[#1C1D1F] border-t border-[#E8E2DA]/15 flex items-start justify-center relative transition-all duration-300"
      >
        {/* Brushed metal detail stripes */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-[#0E4FB3]/30" />
        <div className="absolute top-4 left-0 right-0 h-[2px] bg-[#E8E2DA]/5" />
        {/* Mechanical seam indicator */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-2 bg-[#0E4FB3]/80 rounded-b-md shadow-lg" />
      </div>
    </div>
  )
}
