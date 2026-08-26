import React from 'react'

import type { ServiceContentBlock as ServiceContentBlockProps } from '@/payload-types'

import { BuyServiceCards } from '@/components/shared/BuyServiceCard'
import { Container } from '@/components/shared/Container/Container'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import { FormBlock } from '@/blocks/Form/Component'
import Text from '@/components/shared/Text'
import { cn } from '@/utilities/ui'
import { ServiceContentSection } from './ServiceContentSection'
import { serviceContentStyles as s } from './ServiceContent.styles'

export const ServiceContentBlock: React.FC<ServiceContentBlockProps> = ({
  columns,
  cardSpacing,
  rightColumnLeadGap,
  sections,
  formPanel,
  buyServices,
  sectionLayout,
}) => {
  const all = sections ?? []
  const hasCards = Boolean(buyServices?.length)
  const panelForm = typeof formPanel?.form === 'object' ? formPanel.form : undefined

  if (!all.length && !hasCards && !panelForm) return null

  const split = columns !== 'one'
  const left = split ? all.filter((item) => item.position !== 'right') : all
  const right = split ? all.filter((item) => item.position === 'right') : []

  const desktopCard = cardSpacing === 'compact' ? s.cardCompact : s.card

  const cards = (className: string, cardClassName: string) => (
    <BuyServiceCards services={buyServices} className={className} cardClassName={cardClassName} />
  )

  const panel = panelForm ? (
    <div className={s.formPanel}>
      {formPanel?.heading && (
        <Text as="h4" textStyle="span" text={formPanel.heading} className={s.formPanelHeading} />
      )}
      <FormBlock
        enableIntro={false}
        form={panelForm as React.ComponentProps<typeof FormBlock>['form']}
      />
    </div>
  ) : null

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
            {!split && panel}
          </div>
          {split && (right.length > 0 || hasCards || panel) && (
            <div
              className={cn(s.column, rightColumnLeadGap ? s.columnFlushStacked : s.columnFlush)}
            >
              {hasCards && cards(s.cardsAside, desktopCard)}
              {panel}
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
