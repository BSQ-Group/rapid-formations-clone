import React from 'react'

import type { BuyServiceBlock as BuyServiceBlockProps } from '@/payload-types'

import { BuyServiceCards } from '@/components/shared/BuyServiceCard'
import { Container } from '@/components/shared/Container/Container'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import { buyServiceStyles as s } from './BuyService.styles'

export const BuyServiceBlock: React.FC<BuyServiceBlockProps> = ({ services, sectionLayout }) => {
  if (!services?.length) return null

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container>
        <BuyServiceCards services={services} className={s.list} />
      </Container>
    </SectionWrapper>
  )
}
