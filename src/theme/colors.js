import colorsTokens from '@/design-system/tokens/colors'

export const colors = {
  ...colorsTokens,
  // Semantic overlays & extensions
  background: {
    primary: colorsTokens.bg.cream,
    secondary: colorsTokens.bg.creamAlt,
    dark: colorsTokens.bg.dark,
    darkAlt: colorsTokens.bg.dark2,
    white: colorsTokens.bg.white,
    neutral: colorsTokens.bg.neutralLight
  },
  text: {
    ...colorsTokens.text,
    primary: colorsTokens.text.dark,
    secondary: colorsTokens.text.body,
    muted: colorsTokens.text.muted,
    inverse: colorsTokens.text.cream,
    inverseMuted: colorsTokens.text.creamMuted
  },
  border: {
    ...colorsTokens.border,
    primary: colorsTokens.border.light,
    dark: colorsTokens.border.dark
  },
  brand: {
    ...colorsTokens.brand,
    primary: colorsTokens.brand.blue,
    secondary: colorsTokens.brand.blueLight,
    danger: colorsTokens.brand.red,
    accent: colorsTokens.brand.orange
  }
}

export default colors
