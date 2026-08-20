import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { Price, RenewalItemsBlock as RenewalItemsBlockProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import { getLinkHref, type LinkData } from '@/utilities/links'
import { renewalItemsStyles as s } from './RenewalItems.styles'
import { RenewalItemsView, type RenewalItem } from './RenewalItemsView'

type RawItem = NonNullable<RenewalItemsBlockProps['items']>[number]

const toItem = (item: RawItem, index: number, prices: Map<string, string>): RenewalItem[] => {
  const price = prices.get(item.priceSlug)
  const cta = item.cta as LinkData | undefined
  if (!price || !cta?.label) return []
  return [
    {
      id: item.id ?? `${item.priceSlug}-${index}`,
      title: item.title,
      price,
      body: item.body,
      ctaLabel: cta.label,
      ctaHref: getLinkHref(cta),
      ctaNewTab: cta.newTab,
    },
  ]
}

export const RenewalItemsBlockComponent: React.FC<RenewalItemsBlockProps> = async ({
  items,
  sectionLayout,
}) => {
  const payload = await getPayload({ config: configPromise })
  const { items: priceItems } = (await payload.findGlobal({ slug: 'prices' })) as Price
  const prices = new Map((priceItems ?? []).map((price) => [price.slug, price.value]))

  const rows = (items ?? []).flatMap((item, index) => toItem(item, index, prices))

  if (!rows.length) return null

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container>
        <RenewalItemsView items={rows} />
      </Container>
    </SectionWrapper>
  )
}
