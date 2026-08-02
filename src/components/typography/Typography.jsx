'use client'

import React from 'react'
import { motion } from 'framer-motion'

export function Typography({
  children,
  as: Component = 'p',
  size = 'base', // xs | sm | base | md | lg | xl | xxl | xxxl
  weight = 'normal', // light | normal | medium | semibold | bold | extrabold
  color = 'default', // default | muted | cream | primary | error
  align = 'left', // left | center | right | justify
  font = 'sans', // sans | display | mono
  truncate = false,
  className = '',
  animate,
  initial,
  transition,
  variants,
  whileHover,
  whileTap,
  whileInView,
  viewport,
  ...props
}) {
  const sizeClasses = {
    xs: 'text-[11px] leading-[1.2] tracking-[0.1em]',
    sm: 'text-[13px] leading-[1.4]',
    base: 'text-[15px] leading-[1.7]',
    md: 'text-[18px] leading-[1.5]',
    lg: 'text-[24px] leading-[1.4]',
    xl: 'text-[36px] leading-[1.3] tracking-[-0.02em]',
    xxl: 'text-[52px] leading-[1.2] tracking-[-0.03em]',
    xxxl: 'text-[clamp(48px,8vw,96px)] leading-[0.95]'
  }

  const weightClasses = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold'
  }

  const colorClasses = {
    default: 'text-[#111111]',
    muted: 'text-[#7A7A7A]',
    cream: 'text-[#F5F0EB]',
    primary: 'text-[#0E4FB3]',
    error: 'text-[#D72638]'
  }

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify'
  }

  const fontClasses = {
    sans: 'font-sans',
    display: 'font-display',
    mono: 'font-mono'
  }

  const combinedClasses = [
    sizeClasses[size] || '',
    weightClasses[weight] || '',
    colorClasses[color] || '',
    alignClasses[align] || '',
    fontClasses[font] || '',
    truncate ? 'truncate' : '',
    className
  ].filter(Boolean).join(' ')

  const hasMotionProps = 
    animate !== undefined ||
    initial !== undefined ||
    transition !== undefined ||
    variants !== undefined ||
    whileHover !== undefined ||
    whileTap !== undefined ||
    whileInView !== undefined

  if (hasMotionProps) {
    const MotionComponent = motion[Component] || motion.p
    const motionAnimate = animate === true ? undefined : animate

    return (
      <MotionComponent
        className={combinedClasses}
        initial={initial}
        animate={motionAnimate}
        transition={transition}
        variants={variants}
        whileHover={whileHover}
        whileTap={whileTap}
        whileInView={whileInView}
        viewport={viewport}
        {...props}
      >
        {children}
      </MotionComponent>
    )
  }

  return (
    <Component className={combinedClasses} {...props}>
      {children}
    </Component>
  )
}

export default Typography

