import type { PackageCardStyles, PackageCardTextStyles } from '@/components/shared/PackageCard'

export const formationPackagesStyles = {
  // Section
  section: 'container mx-auto max-w-[1200px] wide:max-w-[1440px] pl-4 md:pl-5 wide:px-0',
  header: 'text-center max-w-[1440px] mx-auto mb-14 px-4',
  title: 'text-[var(--text-strong)] mb-3',
  subtitle: 'text-[var(--text-subtle)] whitespace-pre-line',

  // Tabs (visible on mobile/tablet, hidden on desktop)
  tabs: 'flex gap-4 justify-center mb-8 xl:hidden',
  tab: 'text-sm font-semibold text-[var(--text-muted)] pb-1 border-b-2 border-transparent transition-colors',
  tabActive: 'text-[var(--text-strong)] border-[var(--border-focus)]',

  // Cards scroll container (horizontal scroll on mobile/tablet, grid on desktop).
  // At xl: CSS Grid parent with gap-x only (no row gap — spacing is handled per-section).
  // Each card uses xl:row-span-4 + xl:[grid-template-rows:subgrid] so the 4 card
  // sections (header, priceBlock, benefits, readMore) share row heights across siblings,
  // keeping prices aligned regardless of description length.
  cardsScroll:
    'flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth px-4 lg:px-0 lg:-mr-10 xl:mr-0 xl:grid xl:grid-cols-3 xl:gap-x-6 xl:gap-y-0 xl:overflow-visible xl:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&>*]:w-[304px] [&>*]:min-w-[304px] [&>*]:snap-start md:[&>*]:w-[384px] md:[&>*]:min-w-[384px] xl:[&>*]:w-auto xl:[&>*]:min-w-0 xl:[&>*]:snap-center',

  // Footer — always centered (single CTA button per new Figma design)
  footer: 'flex flex-col items-center justify-center text-center gap-6 mt-14',
  footerCtaOnly: '',
  footerContent: 'flex flex-col gap-3',
  footerTitle: 'text-[var(--text-strong)]',
  footerDescription:
    'text-sm text-[var(--text-muted)] [&_strong]:font-semibold [&_b]:font-semibold',
} as const

/** PackageCard visuals for the FormationPackages 3-up carousel. */
export const formationPackagesCardStyles: PackageCardStyles = {
  // At xl: switch card from flex-col to a 4-row subgrid so all 4 sections (header,
  // priceBlock, benefits, readMore) align with their counterparts in sibling cards.
  // row-span-4 tells the parent grid this card occupies 4 implicit row tracks;
  // [grid-template-rows:subgrid] maps those 4 tracks onto the card's own children.
  card: 'rounded-[32px] p-7 flex flex-col xl:grid xl:row-span-4 xl:[grid-template-rows:subgrid]',
  cardLight: 'bg-[var(--surface-primary)] border border-[var(--border-subtle)]',
  cardDark: 'bg-[var(--surface-accent-light)] border border-[var(--border-subtle)]',

  // Row 1 of the subgrid — no flex-1, auto height = tallest header across all 3 cards
  header: 'flex flex-col gap-3',
  titleRow: 'flex items-start justify-between gap-3',
  title: 'font-bold',
  titleLight: 'text-[var(--text-strong)]',
  titleDark: 'text-[var(--text-strong)]',

  // Badge: dark/black pill per new Figma design (variant="dark" passed from Component.tsx)
  badge: '',

  description: 'min-h-[60px]',
  descriptionLight: 'text-[var(--text-subtle)]',
  descriptionDark: 'text-[var(--text-subtle)]',

  // Row 2 — price row + order button grouped together (Figma price-block)
  priceBlock: 'flex flex-col gap-4 mt-8',

  priceRow: 'flex flex-col gap-1',
  price: '',
  priceLight: 'text-[var(--text-strong)]',
  priceDark: 'text-[var(--text-strong)]',
  priceSuffix: '',
  priceSuffixLight: 'text-[var(--text-muted)]',
  priceSuffixDark: 'text-[var(--text-muted)]',

  orderButton: '',
  orderButtonInner: 'w-full',

  // Divider removed from new design — empty string disables it
  divider: '',

  // Row 3 — mt-7 (28px) matches Figma's gap between price-block and features-block
  benefitsContainer: 'flex flex-col gap-4 mt-7',
  prefixText: 'font-medium',
  prefixTextLight: 'text-[var(--text-strong)]',
  prefixTextDark: 'text-[var(--text-strong)]',

  benefitsList: 'flex flex-col',
  benefitItem: 'flex items-center gap-2 py-1',
  benefitIcon: 'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
  benefitIconLight: 'bg-[var(--surface-accent-light)]',
  benefitIconDark: 'bg-[var(--surface-accent-dark)]',
  benefitIconColor: 'text-[var(--icon-accent)]',
  benefitIconColorDark: 'text-[var(--icon-light)]',
  benefitText: 'flex-1',
  benefitTextLight: 'text-[var(--text-subtle)]',
  benefitTextDark: 'text-[var(--text-subtle)]',

  // Row 4 — Read more link always at card bottom
  findOutMore: 'mt-auto text-center pt-6',
  findOutMoreLink: 'text-sm font-medium underline text-[var(--text-muted)]',
}

export const formationPackagesCardTextStyles: PackageCardTextStyles = {
  title: 'headline-3xl',
  description: 'body-base',
  // heading-600 = 60px extrabold in Figma → headline-5xl (text-5xl/font-extrabold at lg)
  price: 'headline-5xl',
  priceSuffix: 'body-base',
  prefix: 'body-base',
  benefit: 'body-base',
}
