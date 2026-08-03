import type { PackageCardStyles, PackageCardTextStyles } from '@/components/shared/PackageCard'

export const packageCardHeroStyles = {
  section:
    'bg-[var(--surface-primary)] max-md:bg-[var(--surface-tertiary)] px-4 md:px-5 lg:px-10 py-12 lg:py-16',
  wrapper:
    'bg-[var(--surface-tertiary)] rounded-3xl p-0 md:p-6 w-full mx-auto md:max-w-[702px] xl:max-w-[792px] wide:max-w-[950px]',
} as const

export const packageCardHeroCardStyles: PackageCardStyles = {
  card: 'rounded-2xl md:rounded-xl p-6 md:p-7 flex flex-col gap-8 bg-[var(--surface-primary)]',
  cardLight: '',
  cardDark: '',

  contentBlock: 'flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-6',

  header: 'flex flex-col gap-4 md:flex-1 md:max-w-[550px]',
  titleRow: 'flex items-center gap-3',
  title: '',
  titleLight: 'text-[var(--text-strong)]',
  titleDark: 'text-[var(--text-strong)]',

  badge: '!text-[var(--badge-strong-text-inverse)] text-xs font-medium',

  description: '',
  descriptionLight: 'text-[var(--text-subtle)]',
  descriptionDark: 'text-[var(--text-subtle)]',

  priceBlock: 'flex flex-col gap-5 md:items-end md:shrink-0',
  priceRow: 'flex flex-col gap-1 md:items-end',
  price: '',
  priceLight: 'text-[var(--text-strong)]',
  priceDark: 'text-[var(--text-strong)]',
  priceSuffix: '',
  priceSuffixLight: 'text-[var(--text-muted)]',
  priceSuffixDark: 'text-[var(--text-muted)]',

  orderButton: 'w-full md:w-auto',
  orderButtonInner: 'w-full md:w-auto',

  divider: 'w-full border-0 border-t border-[var(--border-muted)] my-0',
  dividerLight: '',
  dividerDark: '',

  benefitsContainer: 'flex flex-col gap-3 flex-grow',
  prefixText: 'font-medium',
  prefixTextLight: 'text-[var(--text-strong)]',
  prefixTextDark: 'text-[var(--text-strong)]',

  benefitsList: 'flex flex-col',
  benefitItem: 'flex items-center gap-3 py-1',
  benefitIcon: 'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
  benefitIconLight: 'bg-[var(--surface-accent-light)]',
  benefitIconDark: 'bg-[var(--surface-accent-dark)]',
  benefitIconColor: 'text-[var(--icon-accent)]',
  benefitIconColorDark: 'text-[var(--icon-light)]',
  benefitText: 'flex-1 font-medium',
  benefitTextLight: 'text-[var(--text-subtle)]',
  benefitTextDark: 'text-[var(--text-subtle)]',

  findOutMore: undefined,
  findOutMoreLink: undefined,
}

export const packageCardHeroCardTextStyles: PackageCardTextStyles = {
  title: 'headline-4xl',
  description: 'body-base',
  price: 'headline-5xl',
  priceSuffix: 'body-base',
  prefix: 'body-base',
  benefit: 'body-base',
}
