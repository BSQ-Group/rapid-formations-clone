import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { RecommendedPackagesBlock as RecommendedPackagesBlockProps } from '@/payload-types'

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

  const payload = await getPayload({ config: configPromise })
  const { items } = await payload.findGlobal({ slug: 'prices' })
  const priceBySlug = new Map((items ?? []).map((item) => [item.slug, item.value]))

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
