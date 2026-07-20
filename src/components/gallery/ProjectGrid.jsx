'use client'

import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'

export default function ProjectGrid({ projects = [], onCardClick }) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
    }
  }

  const getCardLayout = (i) => {
    const mod = i % 5
    if (mod === 0) {
      return {
        classes: 'lg:col-span-1 lg:row-span-2 h-[320px] md:h-[320px] lg:h-[600px]',
        isTall: true,
      }
    }
    if (mod === 1) {
      return {
        classes: 'lg:col-span-1 lg:row-span-1 h-[320px] md:h-[420px] lg:h-[290px]',
        isTall: false,
      }
    }
    if (mod === 2) {
      return {
        classes: 'lg:col-span-1 lg:row-span-1 h-[320px] md:h-[320px] lg:h-[290px]',
        isTall: false,
      }
    }
    if (mod === 3) {
      return {
        classes: 'lg:col-span-2 lg:row-span-1 h-[320px] md:h-[420px] lg:h-[290px]',
        isTall: false,
      }
    }
    return {
      classes: 'lg:col-span-1 lg:row-span-1 h-[320px] md:h-[320px] lg:h-[290px]',
      isTall: false,
    }
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto w-full"
    >
      {projects.map((project, i) => {
        const layout = getCardLayout(i)
        return (
          <motion.div
            key={project.slug || project._id}
            variants={itemVariants}
            className={`${layout.classes} w-full`}
          >
            <ProjectCard 
              project={project} 
              onClick={() => onCardClick(project)} 
              isTall={layout.isTall}
            />
          </motion.div>
        )
      })}
    </motion.div>
  )
}
