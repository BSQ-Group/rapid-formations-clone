export const testimonialBannerStyles = {
  section: 'w-full bg-[var(--surface-accent-light)]',

  inner:
    'w-full max-w-[1100px] mx-auto px-10 flex flex-col items-center md:flex-row md:items-center md:justify-center gap-8 lg:gap-12',

  tpPanel:
    'w-full md:w-[340px] md:shrink-0 flex flex-col items-center justify-center',

  tpWidget: 'flex items-center justify-center w-full',

  quoteCol:
    'w-full md:flex-1 md:min-w-0 md:max-w-[555px] flex flex-col items-start gap-11',

  quoteAndMark: 'flex flex-col items-start gap-4 w-full',

  quoteMark:
    'shrink-0 w-16 h-16 rounded-lg bg-[var(--reviews-trustpilot-green)] flex items-center justify-center text-white',

  quoteText: 'text-[var(--text-strong)]',

  footer: 'flex flex-col items-start w-full',

  authorName: 'font-semibold text-[var(--text-strong)] leading-7',

  authorRole: 'font-normal text-[var(--text-subtle)] wide:leading-6',
} as const
