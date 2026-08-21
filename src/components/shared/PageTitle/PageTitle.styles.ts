export const pageTitleStyles = {
  section: 'font-legacy-condensed w-full bg-[var(--surface-canvas)] pt-10 min-[1023px]:pt-5',

  wrapper:
    'flex w-full flex-col items-start justify-between mb-10 md:mt-6 md:mb-[45px] md:flex-row md:flex-wrap md:items-center',

  left: 'flex-auto basis-0',

  right:
    'flex w-full flex-col items-stretch text-[var(--text-on-light-strong)] md:ml-auto md:w-auto md:flex-row md:self-center min-[1023px]:items-center',

  heading: 'block text-[38px] font-semibold leading-[1.15] text-[var(--text-on-light-base)]',

  headingSub: 'leading-[1.235]',

  pricesWrap: 'mr-[6.4px] flex flex-col md:items-end',

  prices: 'flex flex-row',

  price: 'block w-full self-start text-[38px] font-semibold leading-[1.15] md:self-baseline',

  priceSuffix: 'block text-lg leading-[27px] text-[var(--text-on-light-muted)]',

  buttons:
    'mt-5 flex flex-col gap-2.5 [&_a]:w-full md:mt-0 md:mb-2 md:ml-2 md:flex-row md:flex-wrap md:[&_a]:min-h-[55px] md:[&_a]:w-auto min-[1023px]:mb-0',
} as const
