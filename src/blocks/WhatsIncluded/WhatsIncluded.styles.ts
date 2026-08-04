export const whatsIncludedStyles = {
  section: 'w-full',
  inner: [
    'mx-auto max-w-[1024px]',
    'px-4 md:px-8 lg:px-10',
    'flex flex-col items-center',
    'lg:flex-row lg:items-stretch lg:justify-between',
    'gap-14 lg:gap-10',
  ].join(' '),

  textCol: 'flex min-w-0 flex-col gap-6 w-full md:w-[480px] lg:w-[484px] lg:shrink-0',
  heading: 'text-[var(--text-strong)] text-[36px] leading-[40px] md:text-4xl md:leading-[40px] lg:text-5xl',

  contentSection: 'flex flex-col gap-3 w-full',
  sectionTitle: 'font-medium text-[var(--text-strong)] lg:text-xl lg:leading-7',
  sectionContent: [
    'text-[var(--text-subtle)] [&>p]:text-md [&>p]:leading-6 [&>p:not(:last-child)]:mb-3',
    '[&_a]:text-[var(--text-link)] [&_a]:underline',
  ].join(' '),

  // Right column — package card (420px at tablet+ per Figma, full width on mobile)
  card: [
    'w-full md:w-[420px] lg:shrink-0',
    'rounded-xl bg-[var(--surface-tertiary)]',
    'p-5 md:p-10',
    'flex flex-col gap-4',
  ].join(' '),

  cardHeader: 'flex flex-col gap-4',
  cardHeaderText: 'flex flex-col gap-2',
  cardTitle: 'text-[var(--text-strong)]',

  priceRow: 'flex items-baseline gap-1',
  price: 'text-[var(--text-subtle)] whitespace-nowrap',
  priceSuffix: 'text-[var(--text-muted)]',

  orderButton: 'w-full',

  benefits: 'flex flex-col gap-3',
  divider: 'h-px w-full bg-[var(--border-muted)] border-0',
  benefitsLabel: 'font-medium text-[var(--text-muted)]',

  benefitsList: 'flex flex-col',
  benefitItem: 'flex items-center gap-2 py-1',
  benefitIconWrap:
    'shrink-0 w-8 h-8 rounded-full bg-[var(--surface-accent-light)] flex items-center justify-center',
  benefitIcon: 'text-[var(--icon-accent)]',
  benefitText: 'font-medium text-[var(--text-subtle)]',

  // ─── Stacked layout ───────────────────────────────────────────────────────
  stackedInner: [
    'mx-auto w-full xl:max-w-[792px]',
    'px-4 sm:px-8 lg:px-10 xl:px-0',
    'py-20 sm:py-28',
    'flex flex-col gap-10 sm:gap-14',
  ].join(' '),

  stackedTextRow: 'flex flex-col gap-6 sm:flex-row sm:gap-8 sm:items-start',
  stackedTitleCol: 'flex flex-col gap-3 sm:flex-1 min-w-0',

  stackedSubtitle: 'text-[var(--text-strong)]',
  stackedDescription: [
    'text-base leading-6 text-[var(--text-subtle)]',
    'sm:flex-1 min-w-0',
    '[&>p:not(:last-child)]:mb-3',
  ].join(' '),

  // Card: full-width, compact padding on mobile, larger from sm+
  stackedCard: [
    'w-full rounded-xl bg-[var(--surface-tertiary)]',
    'p-5 sm:p-10',
    'flex flex-col gap-4',
  ].join(' '),

  stackedCardHeader: 'flex flex-col gap-4 sm:flex-row sm:items-end',
  stackedCardHeaderText: 'flex flex-col gap-2 sm:flex-1 min-w-0',

  stackedOrderButtonWrapper: 'w-full sm:w-auto shrink-0',

  stackedBenefitsList: 'sm:columns-2 sm:gap-6',
  stackedBenefitItem: 'flex items-center gap-2 py-1 break-inside-avoid',
} as const
