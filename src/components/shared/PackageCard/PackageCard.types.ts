import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import type { TextProps } from '@/components/shared/Text/Text.types'
import type { LinkData } from '@/utilities/links'
import type { Page, Post } from '@/payload-types'
import type { BadgeVariant } from '@/components/shared/Badge'

/** Link shape accepted by `<CMSLink>` — wider `reference.value` than [[LinkData]]. */
export type CMSLinkData = {
  type?: 'custom' | 'reference' | null
  url?: string | null
  newTab?: boolean | null
  label?: string | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
}

export type PackageCardTextStyle = NonNullable<TextProps['textStyle']>

export interface PackageCardBenefit {
  id?: string | null
  benefit: string
  infoText?: string | null
  tooltipText?: DefaultTypedEditorState | null
}

/** Class names per visual region. Each consuming block supplies its own values. */
export interface PackageCardStyles {
  card: string
  cardLight: string
  cardDark: string

  /**
   * Wraps the header (title-block) and price-block in a single row so the price + CTA
   * can sit to the right of the title on wider viewports (PackageCardHero layout).
   * Omit for the stacked/subgrid layout (FormationPackages carousel) — when undefined
   * the header and price-block render as direct card children, unchanged.
   */
  contentBlock?: string

  header: string
  titleRow: string
  title: string
  titleLight: string
  titleDark: string

  badge: string

  description: string
  descriptionLight: string
  descriptionDark: string

  priceRow: string
  price: string
  priceLight: string
  priceDark: string
  priceSuffix: string
  priceSuffixLight: string
  priceSuffixDark: string

  /** Groups the price row and the order button together (new Figma layout). Omit for legacy layout. */
  priceBlock?: string

  orderButton: string
  orderButtonInner: string

  /** Omit to hide the divider between the order button and the benefits list. */
  divider?: string
  dividerLight?: string
  dividerDark?: string

  benefitsContainer: string
  prefixText: string
  prefixTextLight: string
  prefixTextDark: string

  benefitsList: string
  benefitItem: string
  benefitIcon: string
  benefitIconLight: string
  benefitIconDark: string
  benefitIconColor: string
  benefitIconColorDark: string
  benefitText: string
  benefitTextLight: string
  benefitTextDark: string

  /** Find-out-more footer link. Omit to hide. */
  findOutMore?: string
  findOutMoreLink?: string
}

/** Text presets per region. Each block sets these from Figma per use case. */
export interface PackageCardTextStyles {
  title: PackageCardTextStyle
  description: PackageCardTextStyle
  price: PackageCardTextStyle
  priceSuffix: PackageCardTextStyle
  prefix: PackageCardTextStyle
  benefit: PackageCardTextStyle
}

export interface PackageCardProps {
  // Content
  name: string
  description?: string | null
  price: string
  priceSuffix?: string | null
  orderLink?: LinkData | null
  prefixText?: string | null
  benefits: PackageCardBenefit[]

  // Visual modifiers
  isHighlighted?: boolean | null
  badgeText?: string | null
  /** Badge colour variant — defaults to 'green'. */
  badgeVariant?: BadgeVariant
  showFindOutMoreLink?: boolean | null
  findOutMoreLink?: CMSLinkData | null

  // Semantic level — h2 for standalone cards, h3 when nested under a section h2
  titleAs?: 'h2' | 'h3'

  // Per-use-case visual config
  styles: PackageCardStyles
  textStyles: PackageCardTextStyles

  className?: string
}
