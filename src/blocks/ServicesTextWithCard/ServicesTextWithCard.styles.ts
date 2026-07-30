export const servicesTextWithCardStyles = {
  section:
    'flex flex-col gap-10 w-full px-4 md:px-8 lg:flex-row lg:items-start lg:justify-center lg:gap-6 lg:px-10 wide:gap-[146px] wide:px-[180px]',

  textCol:
    'flex flex-col items-start gap-6 w-full lg:flex-1 lg:min-w-0 xl:flex-none xl:w-[792px] xl:shrink-0 wide:w-[830px]',

  title: 'text-[var(--text-strong)] w-full',

  paragraphs: 'flex flex-col gap-6 w-full',
  paragraph: 'text-[var(--text-muted)] w-full',

  card:
    'flex flex-col gap-3 w-full p-8 rounded-3xl border-2 border-[var(--border-subtle)] bg-[var(--surface-tertiary)] md:flex-row md:items-end md:gap-3 lg:flex-col lg:items-end lg:w-[339px] lg:shrink-0 xl:w-[384px] wide:w-[464px]',

  cardDescription: 'flex flex-col gap-3 w-full md:flex-1 md:min-w-0 lg:w-full',

  cardPriceGroup: 'flex flex-col gap-1 w-full',
  cardPrice: 'text-[var(--text-strong)] font-bold w-full',
  cardSubtitle: 'text-[var(--text-muted)] w-full',
  cardServiceLabel: 'font-semibold w-full text-[var(--text-subtle)]',

  cardCta: 'w-full md:w-auto md:shrink-0 lg:w-full',
} as const
