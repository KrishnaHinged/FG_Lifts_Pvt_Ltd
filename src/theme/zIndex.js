import zIndexTokens from '@/design-system/tokens/zIndex'

export const zIndex = {
  ...zIndexTokens,
  // Detailed layers map for visual stack consistency
  components: {
    navbar: zIndexTokens.sticky,
    drawer: zIndexTokens.overlay,
    modal: zIndexTokens.modal,
    toast: zIndexTokens.tooltip + 10,
    tooltip: zIndexTokens.tooltip,
    loading: 99999,
    cursor: 999999
  }
}

export default zIndex
