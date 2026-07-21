import transitionsTokens from '@/design-system/tokens/transitions'

export const transitions = {
  ...transitionsTokens,
  // CSS Transition strings
  allFast: 'transition-all duration-300 ease-out',
  allNormal: 'transition-all duration-500 ease-out',
  allSlow: 'transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1)',
  colorsFast: 'transition-colors duration-200 ease-out',
  transformNormal: 'transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1)'
}

export default transitions
