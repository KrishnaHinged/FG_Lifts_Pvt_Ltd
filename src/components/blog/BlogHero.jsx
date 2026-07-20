'use client'

export default function BlogHero() {
  return (
    <section className="relative h-[60vh] w-full bg-[#111111] overflow-hidden flex items-center justify-center text-center">
      {/* Noise overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />

      {/* Centered Text */}
      <div className="relative z-10 px-6 max-w-5xl flex flex-col items-center">
        {/* Mono Label */}
        <span className="block font-mono text-[11px] tracking-[0.25em] text-[#9A9A9A] uppercase mb-8">
          The FG Lift Journal
        </span>

        {/* Headline */}
        <h1 className="m-0 font-display text-7xl lg:text-9xl text-[#F5F0EB] leading-[0.95] tracking-tighter">
          Insights
        </h1>

        {/* Sub-label */}
        <span className="block font-mono text-[11px] text-[#9A9A9A] tracking-[0.12em] uppercase mt-8">
          Industry expertise &middot; Engineering guides &middot; Project stories
        </span>
      </div>

      {/* Bottom gradient bleed over 100px */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[100px] z-15 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, #F5F0EB)'
        }}
      />
    </section>
  )
}
