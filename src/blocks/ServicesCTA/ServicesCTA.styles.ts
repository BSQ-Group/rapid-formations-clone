export const servicesCTAStyles = {
  section: 'relative w-full overflow-hidden',

  background: 'absolute inset-0 pointer-events-none',

  content:
    'relative flex flex-col items-center gap-8 max-md:py-4 mx-auto max-w-[1440px] px-4 md:px-20 xl:px-0 text-center',

  lockup: 'flex flex-col items-center gap-5 w-full',

  pill: 'relative inline-flex items-center gap-2 px-5 py-2 rounded-full max-md:w-[302px]',
  pillBorder:
    'absolute inset-0 rounded-full border-[1.4px] border-white opacity-50 pointer-events-none',
  pillFill: 'absolute inset-0 rounded-full bg-white opacity-40 pointer-events-none',
  pillTextMobile:
    'relative flex-1 text-center text-sm font-medium text-[var(--text-strong)] md:hidden',
  pillTextDesktop:
    'relative text-sm wide:text-base font-medium text-[var(--text-strong)] whitespace-nowrap hidden md:inline',
  pillBoldText: 'font-bold text-[var(--text-strong)]',

  textGroup: 'flex flex-col items-center gap-4 w-full text-[var(--text-subtle)]',
  heading: 'text-[var(--text-strong)] w-full font-bold',
  description: 'text-[var(--text-subtle)]',
} as const
