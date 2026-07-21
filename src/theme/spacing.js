import spacingTokens from '@/design-system/tokens/spacing'

export const spacing = {
  ...spacingTokens,
  // Semantic layout spacing properties
  layout: {
    section: 'py-[120px] lg:py-[180px] px-6 lg:px-12',
    sectionCompact: 'py-20 lg:py-28 px-6 lg:px-8',
    container: 'w-full max-w-[1440px] mx-auto',
    containerCompact: 'w-full max-w-[1200px] mx-auto',
    cardPadding: 'p-6 sm:p-8 lg:p-10',
    gridGap: 'gap-6 lg:gap-10',
    stackGap: 'space-y-4 lg:space-y-6'
  }
}

export default spacing
