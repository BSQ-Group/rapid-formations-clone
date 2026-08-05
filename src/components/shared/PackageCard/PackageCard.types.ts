import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import type { TextProps } from '@/components/shared/Text/Text.types'
import type { LinkData } from '@/utilities/links'
import type { Page, Post } from '@/payload-types'
import type { BadgeVariant } from '@/components/shared/Badge'

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

export interface PackageCardStyles {
  card: string
  cardLight: string
  cardDark: string

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

  priceBlock?: string

  orderButton: string
  orderButtonInner: string

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

  findOutMore?: string
  findOutMoreLink?: string
}

export interface PackageCardTextStyles {
  title: PackageCardTextStyle
  description: PackageCardTextStyle
  price: PackageCardTextStyle
  priceSuffix: PackageCardTextStyle
  prefix: PackageCardTextStyle
  benefit: PackageCardTextStyle
}

export interface PackageCardProps {
  name: string
  description?: string | null
  price: string
  priceSuffix?: string | null
  orderLink?: LinkData | null
  prefixText?: string | null
  benefits: PackageCardBenefit[]

  isHighlighted?: boolean | null
  badgeText?: string | null
  badgeVariant?: BadgeVariant
  showFindOutMoreLink?: boolean | null
  findOutMoreLink?: CMSLinkData | null

  titleAs?: 'h2' | 'h3'

  styles: PackageCardStyles
  textStyles: PackageCardTextStyles

  className?: string
}
