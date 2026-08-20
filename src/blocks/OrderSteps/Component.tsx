import React from 'react'

import type { OrderStepsBlock as OrderStepsBlockProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { OrderSteps } from '@/components/shared/OrderSteps'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import { orderStepsBlockStyles as s } from './OrderSteps.styles'

export const OrderStepsBlock: React.FC<OrderStepsBlockProps> = ({ currentStep, sectionLayout }) => (
  <SectionWrapper {...sectionLayout} className={s.section}>
    <Container>
      <OrderSteps currentStep={currentStep ?? 1} />
    </Container>
  </SectionWrapper>
)
