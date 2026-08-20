import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { PackageInclusionsBlock as PackageInclusionsBlockProps } from '@/payload-types'

import { getLinkHref, type LinkData } from '@/utilities/links'
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
    const payload = await getPayload({ config: configPromise })
    const { items: prices } = await payload.findGlobal({ slug: 'prices' })
    price = (prices ?? []).find((item) => item.slug === priceSlug)?.value
  }

  const buyLink = cta as LinkData | undefined

  return (
    <PackageInclusionsView
      heading={heading}
      items={items}
      price={price}
      priceNote={priceNote}
      ctaLabel={buyLink?.label}
      ctaHref={getLinkHref(buyLink)}
      ctaNewTab={buyLink?.newTab}
      sectionLayout={sectionLayout}
    />
  )
}
