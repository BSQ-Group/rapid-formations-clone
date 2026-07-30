export const contentWithPricingCardStyles = {
  section:
    'flex flex-col gap-6 w-full px-4 md:px-8 md:gap-8 lg:flex-row lg:items-start lg:justify-center lg:gap-6 lg:px-10 xl:gap-[126px] wide:gap-[268px] wide:px-[180px]',

  contentCol: 'flex flex-col gap-6 w-full md:flex-row md:gap-6 lg:flex-col lg:flex-1 lg:min-w-0 lg:gap-8 xl:flex-none xl:w-[690px] xl:gap-8 xl:shrink-0 wide:flex-1 wide:w-auto',

  contentSection: 'flex flex-col gap-6 w-full md:flex-1 md:min-w-0 lg:flex-none lg:w-full',

  sectionHeading: 'text-[var(--text-strong)] font-bold w-full wide:leading-[56px]',

  bulletList: 'flex flex-col gap-2 w-full lg:pl-2',
  tickList: 'flex flex-col gap-4 w-full',

  bulletItem: 'flex gap-3 items-start w-full',
  bulletDot: 'text-[var(--text-strong)] font-semibold shrink-0 leading-6',
  bulletText: 'text-[var(--text-muted)] flex-1 min-w-0',

  tickItem: 'flex gap-2 items-center w-full py-1',
  tickCircle:
    'bg-[var(--surface-accent-light)] flex items-center justify-center rounded-full shrink-0 size-8 p-2',
  tickIcon: 'text-[var(--icon-accent)]',
  tickText: 'text-[var(--text-subtle)] flex-1 min-w-0 pt-1',

  card:
    'flex flex-col gap-3 w-full p-8 rounded-3xl border-2 border-[var(--border-subtle)] bg-[var(--surface-tertiary)] md:flex-row md:items-end md:gap-3 lg:flex-col lg:gap-3 lg:w-[339px] lg:shrink-0 xl:w-[384px] wide:w-[464px]',

  cardPriceGroup: 'flex flex-col gap-3 w-full md:flex-1 md:min-w-0 lg:flex-none lg:w-full',
  cardPrice: 'text-[var(--text-strong)] font-bold w-full',
  cardServiceLabel: 'font-semibold w-full text-[var(--text-subtle)]',

  cardCta: 'w-full md:w-auto md:shrink-0 lg:w-full',
} as const
