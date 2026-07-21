/**
 * Component visual class definitions.
 * Provides central className blueprints for clean layout assembly.
 */

export const components = {
  button: {
    base: 'inline-flex items-center justify-center font-sans font-bold uppercase tracking-wider transition-all duration-300 select-none outline-none cursor-pointer',
    sizes: {
      sm: 'px-4 py-2 text-[10px]',
      md: 'px-6 py-3 text-[11px]',
      lg: 'px-8 py-4 text-[12px]'
    },
    variants: {
      primary: 'bg-[#0E4FB3] text-white hover:bg-[#0b3c8a] active:bg-[#082a63]',
      secondary: 'bg-[#EDE8E2] text-[#111111] hover:bg-[#E8E2DA] active:bg-[#d8cfc3]',
      outline: 'bg-transparent text-[#111111] border border-[#E8E2DA] hover:border-[#111111] hover:bg-neutral-50',
      text: 'bg-transparent text-[#111111] hover:underline px-0 py-0',
      danger: 'bg-[#D72638] text-white hover:bg-[#b81d2d] active:bg-[#941724]',
      ghost: 'bg-transparent text-[#111111]/70 hover:text-[#111111] hover:bg-[#EDE8E2]/50'
    },
    disabled: 'opacity-50 cursor-not-allowed pointer-events-none'
  },
  card: {
    base: 'bg-white rounded-[32px] border border-[#E8E2DA] shadow-sm transition-all duration-[350ms] ease-out',
    hover: 'hover:shadow-md hover:translate-y-[-4px]',
    innerPadding: 'p-6 sm:p-8 lg:p-10'
  },
  input: {
    base: 'w-full bg-white border border-[#E8E2DA] rounded-2xl px-5 py-4 font-sans text-sm text-[#111111] placeholder-[#7A7A7A] transition-all outline-none',
    focus: 'focus:border-[#111111] focus:ring-1 focus:ring-[#111111]',
    error: 'border-red-500 focus:border-red-500 focus:ring-red-500'
  },
  textarea: {
    base: 'w-full bg-white border border-[#E8E2DA] rounded-2xl px-5 py-4 font-sans text-sm text-[#111111] placeholder-[#7A7A7A] transition-all outline-none resize-none min-h-[120px]',
    focus: 'focus:border-[#111111] focus:ring-1 focus:ring-[#111111]',
    error: 'border-red-500 focus:border-red-500 focus:ring-red-500'
  },
  dropdown: {
    trigger: 'inline-flex items-center justify-between border border-[#E8E2DA] rounded-xl px-4 py-2 bg-white text-sm text-[#111111] font-medium outline-none cursor-pointer',
    menu: 'absolute left-0 mt-2 min-w-[200px] bg-white border border-[#E8E2DA] rounded-2xl shadow-lg p-2 z-50',
    item: 'w-full text-left px-4 py-2.5 rounded-xl font-sans text-sm text-[#111111]/80 hover:text-[#111111] hover:bg-[#EDE8E2]/50 transition-colors cursor-pointer'
  },
  badge: {
    base: 'inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full border',
    variants: {
      new: 'bg-[#E8F0FC] text-[#0E4FB3] border-[#0E4FB3]/20',
      bestseller: 'bg-amber-50 text-[#E8600A] border-[#E8600A]/20',
      view360: 'bg-emerald-50 text-[#10B981] border-[#10B981]/20',
      neutral: 'bg-[#EDE8E2] text-[#525252] border-[#E8E2DA]'
    }
  },
  modal: {
    backdrop: 'fixed inset-0 z-50 bg-[#111111]/60 backdrop-blur-sm',
    container: 'fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-hidden',
    content: 'relative w-full bg-white rounded-[32px] border border-[#E8E2DA] shadow-xl overflow-hidden flex flex-col max-h-[90vh]',
    header: 'flex items-center justify-between px-8 py-6 border-b border-[#E8E2DA]',
    title: 'font-sans text-xl font-bold text-[#111111]',
    closeButton: 'w-10 h-10 rounded-full bg-[#EDE8E2] hover:bg-[#E8E2DA] flex items-center justify-center text-[#111111] transition-colors outline-none cursor-pointer',
    body: 'flex-1 overflow-y-auto px-8 py-6'
  },
  drawer: {
    backdrop: 'fixed inset-0 z-[100] bg-[#111111]/40 backdrop-blur-sm',
    content: 'fixed top-0 bottom-0 right-0 w-full max-w-md bg-[#EDE8E2] shadow-2xl p-8 flex flex-col justify-between z-[101]'
  },
  table: {
    wrapper: 'w-full overflow-x-auto rounded-2xl border border-[#E8E2DA]',
    base: 'w-full border-collapse text-left font-sans',
    header: 'bg-[#EDE8E2]/50 border-b border-[#E8E2DA] font-mono text-[10px] uppercase tracking-widest text-[#7A7A7A] px-6 py-4 font-bold',
    row: 'border-b border-[#E8E2DA] hover:bg-neutral-50/50 transition-colors',
    cell: 'px-6 py-4 text-sm text-[#111111]/80'
  },
  breadcrumbs: {
    container: 'flex items-center gap-2 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#7A7A7A]',
    link: 'hover:text-[#111111] transition-colors',
    separator: 'text-[#EDE8E2] px-1'
  },
  pagination: {
    container: 'flex items-center justify-center gap-2 mt-10',
    button: 'inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border border-[#E8E2DA] text-sm text-[#111111] hover:bg-[#EDE8E2]/50 hover:border-[#111111] transition-colors cursor-pointer disabled:opacity-50 disabled:pointer-events-none'
  },
  toast: {
    base: 'pointer-events-auto flex items-start gap-3 p-4 rounded-2xl border shadow-lg backdrop-blur-md max-w-sm w-full transition-all',
    types: {
      success: 'border-emerald-200 bg-emerald-50/95 text-emerald-900',
      error: 'border-red-200 bg-red-50/95 text-red-900',
      warning: 'border-amber-200 bg-amber-50/95 text-amber-900',
      info: 'border-blue-200 bg-blue-50/95 text-blue-900'
    }
  }
}

export default components
