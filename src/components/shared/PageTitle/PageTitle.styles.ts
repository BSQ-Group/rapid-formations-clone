export const pageTitleStyles = {
  section: 'font-legacy-condensed w-full bg-[var(--surface-canvas)]',

  wrapper:
    'flex w-full flex-col items-start justify-between mb-10 md:mt-6 md:mb-[45px] md:flex-row md:flex-wrap md:items-center',

  left: 'flex-auto basis-0',

  right:
    'flex w-full flex-col items-stretch text-[var(--text-on-light-strong)] md:ml-auto md:w-auto md:flex-row md:self-center min-[1023px]:items-center',

  heading: 'block text-[38px] font-semibold leading-[1.15] text-[var(--text-on-light-base)]',
} as const
