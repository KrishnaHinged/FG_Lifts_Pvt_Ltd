'use client'

import { Palette } from 'lucide-react'

export default function CabinAestheticsPanel({
  colorVariants = [],
  finishVariants = [],
  activeVariant = 0,
  setActiveVariant,
  activeFinish = 0,
  setActiveFinish
}) {
  const activeFinishes = finishVariants.filter(f => f.isActive)

  if (colorVariants.length === 0 && activeFinishes.length === 0) return null

  return (
    <div className="w-full bg-white border border-[#E8E2DA] rounded-3xl p-6 shadow-[0_8px_30px_-10px_rgba(17,17,17,0.05)] space-y-6 select-none">
      
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-[#E8E2DA]/60 pb-4">
        <div className="w-8 h-8 rounded-xl bg-[#0E4FB3]/10 flex items-center justify-center text-[#0E4FB3] flex-shrink-0">
          <Palette className="w-4 h-4" />
        </div>
        <div>
          <h3 className="font-display text-[#111111] text-base font-bold tracking-tight m-0">
            Personalize Cabin Aesthetics
          </h3>
          <p className="font-sans text-xs text-[#6B6B6B] mt-0.5 m-0 leading-normal">
            Select colors and finishes to preview live in 3D.
          </p>
        </div>
      </div>

      {/* 1. SELECT COLOR */}
      {colorVariants.length > 0 && (
        <div className="space-y-3">
          <span className="font-mono text-[10px] font-bold tracking-wider text-[#7A7A7A] uppercase block">
            1. SELECT COLOR: <span className="text-[#111111] font-sans font-bold">{colorVariants[activeVariant]?.label || 'Default'}</span>
          </span>
          <div className="flex flex-wrap gap-2.5">
            {colorVariants.map((v, i) => {
              const isSelected = activeVariant === i
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    if (setActiveVariant) setActiveVariant(i)
                    const newColor = colorVariants[i]
                    const selectedFinishName = activeFinishes[activeFinish]?.name
                    const hasFinishTex = (newColor?.finishTextures || []).some(ft => ft.finishName === selectedFinishName)
                    if (!hasFinishTex && activeFinishes.length > 0 && setActiveFinish) {
                      const firstAvailableIndex = activeFinishes.findIndex(f => 
                        (newColor?.finishTextures || []).some(ft => ft.finishName === f.name)
                      )
                      if (firstAvailableIndex !== -1) {
                        setActiveFinish(firstAvailableIndex)
                      }
                    }
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all duration-200 cursor-pointer text-xs font-semibold select-none ${
                    isSelected
                      ? 'bg-[#0B1B33] border-[#0B1B33] text-white shadow-sm scale-[1.02]'
                      : 'bg-[#F9F7F5] border-[#E8E2DA] text-[#333333] hover:border-[#0E4FB3]/40 hover:bg-white'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/10 inline-block flex-shrink-0"
                    style={{ backgroundColor: v.color || '#888' }}
                  />
                  {v.label}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* 2. SELECT FINISH */}
      {activeFinishes.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-[#E8E2DA]/60">
          <span className="font-mono text-[10px] font-bold tracking-wider text-[#7A7A7A] uppercase block">
            2. SELECT FINISH: <span className="text-[#111111] font-sans font-bold">{activeFinishes[activeFinish]?.name}</span>
          </span>
          <div className="grid grid-cols-2 gap-3">
            {activeFinishes.map((f, i) => {
              const isSelected = activeFinish === i
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    if (setActiveFinish) setActiveFinish(i)
                  }}
                  className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer select-none w-full text-center ${
                    isSelected
                      ? 'border-[#0E4FB3] bg-[#0E4FB3]/[0.04] text-[#0E4FB3] ring-1 ring-[#0E4FB3]'
                      : 'bg-[#F9F7F5] border-[#E8E2DA] text-[#333333] hover:border-[#0E4FB3]/40 hover:bg-white'
                  }`}
                >
                  <span className={`font-sans font-bold text-xs ${isSelected ? 'text-[#0E4FB3]' : 'text-[#111111]'}`}>
                    {f.name.replace(' Finish', '')}
                  </span>
                  {f.description && (
                    <span className="font-sans text-[10px] text-[#7A7A7A] mt-1 block leading-tight truncate max-w-full">
                      {f.description}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
