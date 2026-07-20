'use client'

export default function ProductsCTA() {
  return (
    <section className="bg-[#111111] py-24 px-6 lg:px-24 select-none text-left">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT */}
          <div className="flex flex-col items-start">
            <span className="font-mono text-[11px] tracking-[0.2em] text-[#9A9A9A] uppercase mb-6">
              Can&apos;t Find What You Need?
            </span>
            <h3 className="m-0 font-display text-4xl lg:text-5xl text-[#F5F0EB] leading-tight font-normal">
              Custom Solutions <br />
              <span className="italic">Available</span>
            </h3>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col items-start">
            <p className="font-sans text-base text-[#9A9A9A] leading-relaxed max-w-sm m-0">
              Every FG Lift system can be customized to your exact specifications. Talk to our engineering team.
            </p>
            <div className="mt-8">
              <a
                href="/#contact"
                className="bg-[#F5F0EB] text-[#111111] hover:bg-white px-8 py-4 font-sans font-medium text-sm no-underline transition-colors duration-300 rounded-none cursor-pointer"
              >
                Get a Custom Quote &rarr;
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
