'use client'

import Image from 'next/image'

export default function ProjectCard({ project, onClick }) {
  if (!project) return null

  return (
    <div
      onClick={onClick}
      className="group relative w-full h-full overflow-hidden rounded-none cursor-pointer bg-[#111111] select-none"
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <Image
          src={project.coverImage || '/images/projects-collage.png'}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-[1.04]"
          style={{
            transition: 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)'
          }}
          sizes="(max-w-1024px) 100vw, 420px"
        />
      </div>

      {/* Subtle bottom shadow overlay (always visible) */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-500"
        style={{
          background: 'linear-gradient(to top, rgba(17, 17, 17, 0.7) 0%, transparent 45%)'
        }}
      />

      {/* Hover dark overlay build-up */}
      <div className="absolute inset-0 bg-[#111111]/25 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />

      {/* Content Block */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20 flex flex-col items-start text-left">
        <span className="font-mono text-[10px] text-[#F5F0EB]/60 tracking-[0.15em] uppercase">
          {project.clientType || 'Residential'}
        </span>
        <h3 className="m-0 font-display text-xl text-[#F5F0EB] leading-snug font-normal mt-1">
          {project.title}
        </h3>
        
        {/* Row for Location & Year Chip */}
        <div className="flex items-center justify-between w-full mt-1.5">
          <span className="font-mono text-[11px] text-[#F5F0EB]/50">
            {project.location}
          </span>
          <span className="font-mono text-[11px] text-[#F5F0EB]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
            {project.year}
          </span>
        </div>
      </div>

      {/* Bottom sliding rule indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#F5F0EB] translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out z-30" />
    </div>
  )
}
