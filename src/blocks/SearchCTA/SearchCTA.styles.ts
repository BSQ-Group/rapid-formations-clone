export const searchCTAStyles = {
  // Outer section — override wrapper vertical padding to 0 on mobile so the card is full-bleed.
  section: 'w-full max-md:!py-0',
  inner: 'w-full',

  // Card — full-bleed at all breakpoints
  card: 'relative overflow-hidden',
  cardGradient:
    'absolute inset-0 bg-gradient-to-br from-[var(--qcf-green-50)] via-[var(--qcf-green-100)] to-[var(--qcf-green-200)] pointer-events-none',

  // Content inside card — 32px on mobile, 80px on md+
  content: 'relative flex flex-col items-center gap-8 p-8 md:p-20 text-center',

  // Trust pill — full-width rounded-xl on mobile, compact rounded-full on md+
  pill: 'relative flex items-center justify-center gap-2 px-4 py-2 overflow-hidden w-full rounded-xl md:rounded-full md:shrink-0 md:w-auto',
  pillBorder: 'absolute inset-0 border border-[var(--border-strong)] opacity-[0.18] pointer-events-none',
  pillFillLight: 'absolute inset-0 bg-white opacity-[0.12] pointer-events-none',
  pillFillDark: 'absolute inset-0 bg-white opacity-30 pointer-events-none',
  pillDot: 'hidden',
  pillTextLightMobile: 'relative text-sm font-medium text-white w-full text-center md:hidden',
  pillTextLightDesktop: 'relative text-sm font-medium text-white whitespace-nowrap hidden md:inline',
  pillTextDarkMobile: 'relative text-sm font-medium text-[var(--text-strong)] w-full text-center md:hidden',
  pillTextDarkDesktop: 'relative text-sm font-medium text-[var(--text-strong)] whitespace-nowrap hidden md:inline',

  textGroup: 'flex flex-col items-center gap-4 w-full',
  headingLight: 'text-white',
  headingDark: 'text-[var(--text-strong)]',
  subtitleLight: 'font-medium text-[var(--text-inverse-subtle)]',
  subtitleDark: 'font-medium text-[var(--text-subtle)]',

  // Input row — vertical stack on mobile, horizontal on md+
  inputWrap: 'flex flex-col md:flex-row items-center w-full md:w-[520px] bg-white rounded-xl gap-5 pt-5 px-2 pb-2 md:h-16 md:gap-0 md:pl-6 md:pr-2 md:py-2',
  inputField: 'flex-1 min-w-0 w-full text-base font-medium text-[var(--text-strong)] placeholder:text-[var(--text-muted)] bg-transparent outline-none border-0 text-center md:text-left',
  submitBtnDesktop: 'shrink-0 w-full md:w-auto',
  submitBtnMobile: 'hidden',

  footerNoteLight: 'font-medium text-[var(--text-inverse-subtle)]',
  footerNoteDark: 'font-medium text-[var(--text-muted)]',
} as const
