export const snapCarouselStyles = {
  arrows: 'mt-4 flex items-center justify-center gap-4',

  arrow:
    'flex items-center justify-center text-[var(--text-on-light-strong)] opacity-80 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] disabled:pointer-events-none disabled:opacity-50',

  arrowIcon: 'h-10 w-auto',

  dots: 'mt-2.5 flex items-center justify-center',
  dot: 'm-2.5 size-2.5 shrink-0 rounded-full bg-[#333] opacity-25 transition-[background-color,opacity]',
  dotActive: 'bg-[var(--surface-brand-cyan)] opacity-100',
} as const
