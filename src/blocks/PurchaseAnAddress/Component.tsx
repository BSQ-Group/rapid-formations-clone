import React from 'react'

import type { PurchaseAnAddressBlock as PurchaseAnAddressBlockProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { PurchaseAnAddressCard } from './PurchaseAnAddressCard'
import { purchaseAnAddressStyles as s } from './PurchaseAnAddress.styles'

export const PurchaseAnAddressBlock: React.FC<PurchaseAnAddressBlockProps> = ({
  heading,
  methods,
  sectionLayout,
}) => {
  const cards = methods ?? []

  if (!cards.length) return null

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container>
        <div className={s.headingWrap}>
          <Text as="h2" textStyle="span" text={heading} className={s.heading} />
        </div>
        <div className={s.grid}>
          {cards.map((method, index) => (
            <PurchaseAnAddressCard key={method.id ?? index} method={method} />
          ))}
        </div>
      </Container>
    </SectionWrapper>
  )
}
