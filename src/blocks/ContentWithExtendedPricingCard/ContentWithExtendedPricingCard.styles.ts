export const contentWithExtendedPricingCardStyles = {
  section:
    'flex flex-col items-center w-full px-4 md:px-8 lg:px-10',

  container:
    'flex flex-col gap-6 w-full md:gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-6 xl:max-w-[1200px] xl:gap-[126px] wide:max-w-[1440px] wide:gap-[268px]',

  contentCol:
    'flex flex-col gap-6 w-full md:flex-row md:gap-6 lg:flex-col lg:flex-1 lg:min-w-0 xl:flex-none xl:w-[690px] xl:gap-8 xl:shrink-0 wide:w-[708px]',

  contentSection: 'flex flex-col gap-6 w-full md:flex-1 md:min-w-0 lg:flex-none lg:w-full',
  sectionsWrapper:
    'flex flex-col gap-6 w-full md:flex-1 md:min-w-0 md:gap-8 lg:flex-none lg:w-full',
  sectionItem: 'flex flex-col gap-6 w-full',

  bigTitle: 'text-[var(--text-strong)] w-full',
  intro: 'text-[var(--text-muted)] w-full',

  sectionHeading: 'text-[var(--text-strong)] w-full',

  itemsList: 'flex flex-col gap-2 w-full',
  bulletItem: 'flex gap-3 items-start w-full',
  bulletDot: 'text-[var(--text-muted)] shrink-0 leading-6',
  bulletText: 'text-[var(--text-muted)] flex-1 min-w-0',

  card:
    'flex flex-col gap-8 w-full p-8 rounded-3xl border-2 border-[var(--border-subtle)] bg-[var(--surface-tertiary)] lg:w-[339px] lg:shrink-0 xl:w-[384px] wide:w-[464px]',

  priceDetails: 'flex flex-col gap-3 w-full md:flex-row md:items-start md:gap-3 lg:flex-col lg:gap-3',
  priceGroup: 'flex flex-col gap-3 w-full md:flex-1 md:min-w-0 lg:flex-none lg:w-full',
  price: 'text-[var(--text-strong)] !font-bold w-full',
  serviceLabel: 'font-semibold w-full text-[var(--text-subtle)] !leading-[28px]',
  ctaLink: 'w-full md:w-auto md:shrink-0 lg:w-full',

  detailsContainer: 'flex flex-col gap-10 w-full',

  feature: 'flex flex-col gap-1 w-full',
  featureTitle: 'text-[var(--text-strong)] font-semibold w-full',
  featureDescription: 'text-[var(--text-muted)] w-full',

  detailsAndCosts: 'flex flex-col gap-2 w-full',
  detailsTitle: 'text-[var(--text-strong)] font-semibold w-full',
  divider: 'w-full border-t border-[var(--border-subtle)] my-2',

  detailsList: 'flex flex-col gap-6 w-full',
  detailRow: 'flex flex-col gap-2 w-full',
  detailLabel: 'text-[var(--text-subtle)] font-medium w-full',
  detailValue: 'text-[var(--text-strong)] font-semibold w-full wide:!leading-[32px]',
} as const
