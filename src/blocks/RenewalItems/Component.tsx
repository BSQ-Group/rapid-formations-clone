import React from 'react'

import type { RenewalItemsBlock as RenewalItemsBlockProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import { getLinkHref, type LinkData } from '@/utilities/links'
import { renewalItemsStyles as s } from './RenewalItems.styles'
import { RenewalItemsView, type RenewalItem } from './RenewalItemsView'

type RawItem = NonNullable<RenewalItemsBlockProps['items']>[number]

const toItem = (item: RawItem, index: number): RenewalItem[] => {
  const price = item.price
  const cta = item.cta as LinkData | undefined
  if (!price || !cta?.label) return []
  return [
    {
      id: item.id ?? `renewal-${index}`,
      title: item.title,
      price,
      body: item.body,
      ctaLabel: cta.label,
      ctaHref: getLinkHref(cta),
      ctaNewTab: cta.newTab,
    },
  ]
}

export const RenewalItemsBlockComponent: React.FC<RenewalItemsBlockProps> = ({
  items,
  sectionLayout,
}) => {
  const rows = (items ?? []).flatMap((item, index) => toItem(item, index))

  if (!rows.length) return null

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container>
        <RenewalItemsView items={rows} />
      </Container>
    </SectionWrapper>
  )
}
