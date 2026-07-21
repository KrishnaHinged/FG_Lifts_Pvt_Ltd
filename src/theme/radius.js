import radiusTokens from '@/design-system/tokens/radius'

export const radius = {
  ...radiusTokens,
  // Component semantic border-radius configurations
  components: {
    card: 'rounded-[32px] md:rounded-[40px]',
    button: 'rounded-full',
    input: 'rounded-xl md:rounded-2xl',
    badge: 'rounded-full',
    dialog: 'rounded-[32px]',
    avatar: 'rounded-full'
  }
}

export default radius
