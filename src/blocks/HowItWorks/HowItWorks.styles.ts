export const howItWorksStyles = {
  section: 'w-full',

  inner: 'relative mx-auto max-w-[1200px] px-4 md:px-8 lg:px-10 flex flex-col gap-14 items-center',

  header: 'flex flex-col gap-3 items-center text-center w-full',
  heading: 'text-[var(--text-strong)]',
  description: 'text-[var(--text-subtle)] max-w-[600px] lg:max-w-none',

  mobileCol: 'w-full flex flex-col gap-4 md:hidden',

  tabletCarousel: 'hidden md:flex lg:hidden w-full flex-col items-center gap-6',

  carouselTrack:
    'w-full flex flex-row gap-4 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]',

  arrowsOuter: 'hidden md:flex lg:hidden absolute bottom-0 right-8 flex-row gap-4',

  desktopRow: 'hidden lg:flex lg:flex-row lg:gap-6 lg:justify-center w-full',

  card: 'relative overflow-hidden rounded-3xl bg-[var(--surface-primary)] w-full md:w-[304px] md:flex-shrink-0 md:snap-center lg:flex-1 lg:w-auto xl:flex-none xl:w-[320px]',

  cardImageWrap: 'relative w-full h-56 md:h-[340px] overflow-hidden',

  cardBody: 'flex flex-col gap-3 pt-6 pb-7 px-6',

  stepNumber: 'font-semibold text-[var(--text-strong)]',
  cardTextGroup: 'flex flex-col gap-2',
  cardTitle: 'font-semibold text-[var(--text-strong)]',
  cardBodyText: 'text-[var(--text-subtle)]',

  overlayBase:
    'bg-[var(--surface-primary)] rounded-xl shadow-[0_10px_15px_0_rgba(98,98,113,0.1),0_4px_6px_0_rgba(98,98,113,0.1)] flex flex-row gap-3 items-start p-3',

  overlay1Pos: 'absolute bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap',
  overlay2Pos: 'absolute top-[36%] -translate-y-1/2 left-1/2 -translate-x-1/2 whitespace-nowrap',

  inboxGroup: 'absolute bottom-6 left-4 right-4 flex flex-col gap-2',

  overlayIconWrap:
    'bg-[var(--icon-background-accent)] rounded w-12 h-12 shrink-0 flex items-center justify-center',

  overlayIcon: 'text-[var(--icon-default)]',

  overlayTextCol: 'flex flex-col gap-1.5 justify-center',

  overlayTitle: 'font-semibold text-sm leading-5 text-[var(--text-subtle)]',
  overlayMicroStrong: 'font-semibold text-[10px] leading-4 text-[var(--text-strong)]',
  overlaySubBold: 'font-semibold text-[10px] leading-4 text-[var(--text-subtle)]',
  overlaySub: 'text-[10px] mt-[-3px] leading-4 text-[var(--text-subtle)] whitespace-nowrap',

  progressTrack: 'w-full h-1 rounded-full bg-[var(--surface-canvas)]',
  progressFill: 'h-full w-3/4 rounded-full bg-[var(--surface-accent)]',

  inboxHeader: 'flex items-center justify-between',

  inboxLabel: 'font-semibold text-xs leading-4 text-white',

  newPill: 'bg-white/30 rounded-full px-2 py-0.5 flex items-center gap-1.5',
  newDot: 'w-1.5 h-1.5 rounded-full bg-[var(--surface-accent)] shrink-0',
  newText: 'text-xs font-medium text-white leading-4',

  ghostCard:
    'absolute bottom-4 left-7 right-7 h-16 rounded-xl bg-[var(--surface-primary)] opacity-60 shadow-[0_25px_50px_0_rgba(98,98,113,0.25)]',

  ctaRow: 'flex flex-row items-center gap-4',
  priceText: 'font-semibold text-[var(--text-subtle)]',
} as const
