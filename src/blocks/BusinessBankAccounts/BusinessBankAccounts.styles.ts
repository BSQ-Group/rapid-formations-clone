export const businessBankAccountsStyles = {
  section: 'flex flex-col items-center gap-14 w-full px-4 md:px-0',
  heading: 'max-w-[800px] wide:max-w-[1054px] text-center text-[var(--text-strong)]',

  carouselGroup: 'flex flex-col items-center gap-7 w-full',

  // Full-bleed track — the strip overflows horizontally and clips at the section edges.
  // `overflow-x-clip` (not `-hidden`) clips only the X axis; `-hidden` would coerce
  // overflow-y to `auto` and crop the featured card's drop shadow at the footer edge.
  carouselWrapper: 'w-full overflow-x-clip',
  carousel: 'flex items-center justify-center gap-12 wide:gap-14',
  sideCards: 'flex items-center gap-8 wide:gap-10',
  sideCard: 'relative w-[180px] h-[113.333px] rounded-lg overflow-hidden shrink-0',
  cardImage: 'absolute inset-0 w-full h-full object-cover',

  featuredContainer: 'flex items-center justify-center w-[296.894px] h-[204.598px] shrink-0',
  featuredCard:
    'relative w-[280px] h-[176.296px] rounded-lg overflow-hidden rotate-[6deg] shadow-2xl wide:shadow-lg',
  featuredImage: 'absolute inset-0 w-full h-full object-cover',

  footer: 'flex flex-col gap-2 wide:gap-2.5 items-center',
  nav: 'flex gap-0 md:gap-12 wide:gap-14 items-center justify-center',
  navButton:
    'flex items-center justify-center w-[46px] h-[46px] rounded-full bg-[var(--surface-secondary)] shrink-0 cursor-pointer',
  navIcon: 'text-[var(--icon-default)]',
  logoContainer: 'h-14 w-[200px] flex items-center justify-center',
  logo: 'max-h-11 max-w-[160px] w-auto h-auto object-contain',
  subtext: 'text-[var(--text-subtle)] text-center whitespace-pre-line max-w-[230px] text-balance',
} as const
