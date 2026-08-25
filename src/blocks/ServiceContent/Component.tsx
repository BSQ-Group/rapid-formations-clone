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
  cardSpacing,
  rightColumnLeadGap,
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

  const desktopCard = cardSpacing === 'compact' ? s.cardCompact : s.card

  const cards = (className: string, cardClassName: string) => (
    <BuyServiceCards services={buyServices} className={className} cardClassName={cardClassName} />
  )

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container>
        <div className={cn(s.root, split && s.split)}>
          {hasCards && cards(s.cardsLead, s.cardMobile)}
          <div className={cn(s.column, s.columnFlush, !split && hasCards && s.columnDesktopOnly)}>
            {left.map((item, index) => (
              <ServiceContentSection key={item.id ?? index} section={item} lead={index === 0} />
            ))}
            {hasCards && !split && cards(s.cardsTrail, desktopCard)}
          </div>
          {split && (right.length > 0 || hasCards) && (
            <div
              className={cn(s.column, rightColumnLeadGap ? s.columnFlushStacked : s.columnFlush)}
            >
              {hasCards && cards(s.cardsAside, desktopCard)}
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
