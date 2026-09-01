import React from 'react'

import type { RecommendedPackagesBlock as RecommendedPackagesBlockProps } from '@/payload-types'

import { getTierPriceMap } from '@/utilities/getPackagePrices'
import { getLinkHref, type LinkData } from '@/utilities/links'
import { RecommendedPackagesView } from './RecommendedPackagesView'

export const RecommendedPackagesBlock: React.FC<RecommendedPackagesBlockProps> = async ({
  heading,
  subheading,
  packages,
  sectionLayout,
}) => {
  const rows = packages ?? []

  if (!rows.length) return null

  const priceBySlug = await getTierPriceMap()

  const cards = rows.map((card) => ({
    card,
    href: getLinkHref(card.cta as LinkData | undefined),
    price: card.priceSlug ? priceBySlug.get(card.priceSlug) : undefined,
  }))

  return (
    <RecommendedPackagesView
      heading={heading}
      subheading={subheading}
      cards={cards}
      sectionLayout={sectionLayout}
    />
  )
}
