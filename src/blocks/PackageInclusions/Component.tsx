import React from 'react'

import type { PackageInclusionsBlock as PackageInclusionsBlockProps } from '@/payload-types'

import { getTierPriceMap } from '@/utilities/getPackagePrices'
import { getLinkHref, type LinkData } from '@/utilities/links'
import { checkoutPathFor } from '@/lib/nameCheck/checkoutPaths'
import { PackageInclusionsView } from './PackageInclusionsView'

export const PackageInclusionsBlock: React.FC<PackageInclusionsBlockProps> = async ({
  heading,
  items,
  priceSlug,
  priceNote,
  cta,
  sectionLayout,
}) => {
  let price: string | undefined

  if (priceSlug) {
    const prices = await getTierPriceMap()
    price = prices.get(priceSlug)
  }

  const buyLink = cta as LinkData | undefined
  const ctaHref = getLinkHref(buyLink)

  return (
    <PackageInclusionsView
      heading={heading}
      items={items}
      price={price}
      priceNote={priceNote}
      ctaLabel={buyLink?.label}
      ctaHref={ctaHref}
      ctaCheckoutPath={await checkoutPathFor(ctaHref)}
      ctaNewTab={buyLink?.newTab}
      sectionLayout={sectionLayout}
    />
  )
}
