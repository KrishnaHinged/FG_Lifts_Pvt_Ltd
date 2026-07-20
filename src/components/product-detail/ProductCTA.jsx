'use client'

export default function ProductCTA({ brochureUrl, productName }) {
  
  const handleScrollToContact = (e) => {
    e.preventDefault()
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.hash = 'contact'
    }
  }

  return (
    <div className="bg-white border border-[#E8E2DA]/80 rounded-[2rem] p-8 flex flex-col gap-6 w-full shadow-xs">
      <div>
        <h3 className="m-0 font-display text-2xl font-bold uppercase tracking-tight text-[#111111] leading-tight mb-2">
          Interested in this system?
        </h3>
        <p className="m-0 text-sm text-[#6B6B6B] leading-relaxed font-normal">
          Request detailed layout specifications, customize cabin configurations, or consult directly with our lift design engineers.
        </p>
      </div>

      <div className="flex flex-col gap-3 w-full">
        {/* Primary - Request a Quote */}
        <button
          onClick={handleScrollToContact}
          className="w-full bg-[#111111] hover:bg-[#0E4FB3] text-white py-4 px-6 rounded-xl font-sans font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer border-none transition-all duration-300 hover:scale-[1.01]"
        >
          <span>Request a Quote</span>
          <svg className="w-3.5 h-3.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>

        {/* Secondary - Download Brochure */}
        {brochureUrl && (
          <a
            href={brochureUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full border border-[#E8E2DA] bg-[#F5F0EB]/30 hover:bg-[#F5F0EB] text-[#111111] py-4 px-6 rounded-xl font-sans font-semibold text-xs tracking-wider uppercase text-center no-underline flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.01]"
          >
            <span>Download Brochure</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        )}

        {/* Whatsapp consult link */}
        <a
          href={`https://wa.me/919825000000?text=${encodeURIComponent(
            `Hi, I am interested in the ${productName || 'FG Lift system'}. Please share the technical brochure and spec options.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[9px] uppercase tracking-wider text-[#6B6B6B] hover:text-[#0E4FB3] text-center no-underline transition-colors duration-200 mt-2"
        >
          Consult Engineer via WhatsApp &rarr;
        </a>
      </div>
    </div>
  )
}
