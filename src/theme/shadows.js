import shadowTokens from '@/design-system/tokens/shadow'

export const shadows = {
  ...shadowTokens,
  // Component semantic shadow maps
  components: {
    card: shadowTokens.card,
    modal: shadowTokens.floating,
    navigation: shadowTokens.navigation,
    dropdown: 'shadow-md',
    toast: shadowTokens.lg
  }
}

export default shadows
