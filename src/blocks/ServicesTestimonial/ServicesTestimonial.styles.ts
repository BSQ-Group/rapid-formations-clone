export const servicesTestimonialStyles = {
  section: 'w-full',
  inner:
    'mx-auto max-w-[1200px] px-4 md:px-8 lg:px-10 flex flex-col md:flex-row items-center gap-14 md:gap-10 lg:gap-20',

  tpPanel:
    'order-2 md:order-1 w-full py-5 md:py-0 md:w-[340px] md:h-auto md:self-stretch lg:h-[340px] lg:self-auto lg:shrink-0 bg-[var(--surface-primary)] rounded-2xl overflow-hidden flex flex-col items-center justify-center',

  // Quote column
  quoteCol: 'order-1 md:order-2 w-full md:flex-1 flex flex-col gap-11 items-start',

  // Quote mark icon — inline SVG uses currentColor for the quote paths
  quoteMark: 'shrink-0 text-[var(--icon-accent)]',

  quoteAndMark: 'flex flex-col gap-4 w-full',

  // Quote text — no preset matches font-normal at 24px; use span escape hatch
  quoteText: 'font-normal text-[var(--text-strong)] text-xl leading-7 lg:text-2xl lg:leading-8',

  // Author footer
  footer: 'flex flex-col gap-3 w-full',
  authorName: 'font-semibold text-[var(--text-strong)]',
  authorRole: 'text-[var(--text-subtle)]',
} as const
