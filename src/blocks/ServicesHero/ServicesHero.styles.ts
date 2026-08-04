export const servicesHeroStyles = {
  section:
    'relative w-full flex flex-col items-center md:justify-center min-h-[703px] md:min-h-[827px] lg:min-h-[572px] overflow-x-clip',
  inner:
    'mx-auto max-w-[1200px] w-full px-4 md:px-10 pb-20 md:pb-0 ' +
    'flex flex-col lg:flex-row items-center gap-10 lg:gap-12',

  leftCol:
    'w-full lg:flex-1 flex flex-col gap-7 items-center lg:items-start text-center lg:text-left',
  heading: 'text-[var(--text-strong)]',
  description: 'text-[var(--text-subtle)]',
  priceRow: 'flex items-baseline gap-2 whitespace-nowrap',
  priceText: 'text-[var(--text-strong)]',
  priceSuffix: 'text-[var(--text-subtle)]',

  rightCol: 'w-full lg:flex-[0_0_560px]',
  imageArea: 'relative h-[299px] md:h-[451px] lg:h-[480px] w-full',

  mainImage:
    'absolute left-0 top-0 rounded-xl overflow-hidden ' +
    'w-[252px] h-[176px] ' +
    'md:left-6 md:top-0 md:w-[399px] md:h-[279px] md:rounded-2xl ' +
    'lg:left-[-24px] lg:top-7 lg:w-[420px] lg:h-[294px]',

  secondaryImage:
    'absolute overflow-hidden rounded-xl ' +
    'hidden ' +
    'md:block md:left-[177px] md:top-[269px] md:w-[270px] md:h-[182px] ' +
    'lg:left-[95px] lg:top-[309px] lg:w-[240px] lg:h-[162px]',

  addressCard:
    'absolute z-10 bg-white rounded-xl shadow-2xl ring-8 ring-white/20 ' +
    'flex flex-col gap-4 p-5 ' +
    'right-0 top-[138px] w-[249px] ' +
    'md:left-[338px] md:right-auto md:top-[142px] md:w-[326px] md:px-8 md:py-7 ' +
    'lg:left-[258px] lg:top-[160px] lg:w-[326px]',
  addressIconRow: 'flex gap-4 items-start',
  addressIconWrap:
    'shrink-0 bg-[var(--icon-background-accent)] p-3 rounded flex items-center justify-center',
  addressContent: 'flex flex-col gap-2 flex-1 min-w-0',
  addressCompanyName: 'font-semibold text-[var(--text-strong)] leading-tight md:text-lg',
  addressText:
    'font-medium text-[var(--text-strong)] leading-relaxed whitespace-pre-line md:text-sm',
  addressBadges: 'flex gap-1.5 items-center overflow-hidden',
  addressBadge:
    'bg-[var(--surface-tertiary)] text-[var(--text-subtle)] text-[11px] font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap',
} as const
