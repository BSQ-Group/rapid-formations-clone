import React from 'react'

import type { ServiceContentBlock as ServiceContentBlockProps } from '@/payload-types'

import { BuyServiceCards } from '@/components/shared/BuyServiceCard'
import { Container } from '@/components/shared/Container/Container'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import { cn } from '@/utilities/ui'
import { ServiceContentSection } from './ServiceContentSection'
import { serviceContentStyles as s } from './ServiceContent.styles'

export const ServiceContentBlock: React.FC<ServiceContentBlockProps> = ({
  columns,
  sections,
  buyServices,
  sectionLayout,
}) => {
  const all = sections ?? []
  const hasCards = Boolean(buyServices?.length)

  if (!all.length && !hasCards) return null

  const split = columns !== 'one'
  const left = split ? all.filter((item) => item.position !== 'right') : all
  const right = split ? all.filter((item) => item.position === 'right') : []

  const cards = (className: string, cardClassName: string) => (
    <BuyServiceCards services={buyServices} className={className} cardClassName={cardClassName} />
  )

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container>
        <div className={cn(s.root, split && s.split)}>
          {hasCards && cards(s.cardsLead, s.cardMobile)}
          <div className={cn(s.column, !split && hasCards && s.columnDesktopOnly)}>
            {left.map((item, index) => (
              <ServiceContentSection key={item.id ?? index} section={item} />
            ))}
            {hasCards && !split && cards(s.cardsTrail, s.card)}
          </div>
          {split && (right.length > 0 || hasCards) && (
            <div className={s.column}>
              {hasCards && cards(s.cardsAside, s.card)}
              {right.map((item, index) => (
                <ServiceContentSection key={item.id ?? index} section={item} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </SectionWrapper>
  )
}
