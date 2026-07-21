import typographyTokens from '@/design-system/tokens/typography'

export const typography = {
  ...typographyTokens,
  // Semantic classes/styles for text
  roles: {
    hero: `font-display text-[clamp(48px,8vw,96px)] font-light leading-[0.95] tracking-normal`,
    display: `font-display text-4xl sm:text-5xl lg:text-7xl font-light leading-tight tracking-tight`,
    h1: `font-display text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight tracking-tight`,
    h2: `font-display text-2xl sm:text-3xl lg:text-4xl font-medium leading-snug tracking-tight`,
    h3: `font-sans text-xl sm:text-2xl font-bold leading-normal`,
    h4: `font-mono text-sm uppercase tracking-[0.2em] font-medium`,
    body: `font-sans text-sm sm:text-base text-fg-body leading-relaxed`,
    caption: `font-sans text-xs text-fg-muted leading-normal`,
    label: `font-mono text-[10px] sm:text-xs uppercase tracking-widest font-semibold`,
    badge: `font-mono text-[9px] sm:text-[10px] uppercase tracking-wider font-bold`
  }
}

export default typography
