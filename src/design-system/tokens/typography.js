export const typography = {
  fonts: {
    display: "var(--font-inter), system-ui, sans-serif",
    sans: "var(--font-inter), system-ui, sans-serif",
    mono: "var(--font-jetbrains), 'JetBrains Mono', monospace"
  },
  sizes: {
    xs: {
      fontSize: '11px',
      lineHeight: '1.2',
      letterSpacing: '0.1em'
    },
    sm: {
      fontSize: '13px',
      lineHeight: '1.4',
      letterSpacing: 'normal'
    },
    base: {
      fontSize: '15px',
      lineHeight: '1.7',
      letterSpacing: 'normal'
    },
    md: {
      fontSize: '18px',
      lineHeight: '1.5',
      letterSpacing: 'normal'
    },
    lg: {
      fontSize: '24px',
      lineHeight: '1.4',
      letterSpacing: 'normal'
    },
    xl: {
      fontSize: '36px',
      lineHeight: '1.3',
      letterSpacing: '-0.02em'
    },
    xxl: {
      fontSize: '52px',
      lineHeight: '1.2',
      letterSpacing: '-0.03em'
    },
    xxxl: {
      fontSize: 'clamp(48px, 8vw, 96px)',
      lineHeight: '0.95',
      letterSpacing: 'normal'
    }
  },
  weights: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800'
  }
}

export default typography
