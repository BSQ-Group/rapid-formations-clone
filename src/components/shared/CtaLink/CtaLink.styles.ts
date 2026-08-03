export const ctaLinkStyles = {
  base: 'inline-flex items-center justify-center rounded border text-center font-semibold text-[rgb(var(--white))] transition-colors duration-150 [overflow-wrap:anywhere]',

  tone: {
    cyan: 'border-[var(--surface-brand-cyan)] bg-[var(--surface-brand-cyan)] hover:border-[var(--surface-brand-cyan-hover)] hover:bg-[var(--surface-brand-cyan-hover)]',
    success:
      'border-[var(--surface-cta-success)] bg-[var(--surface-cta-success)] hover:border-[var(--surface-cta-success-hover)] hover:bg-[var(--surface-cta-success-hover)]',
  },

  size: {
    md: 'px-6 py-2 text-[17px] leading-[25.5px]',
    lg: 'px-8 py-3 text-[19px] leading-[28.5px]',
  },

  block: 'w-full',
} as const
