import React from 'react'

import type { SameDayIncorporationBlock as SameDayIncorporationBlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { Container } from '@/components/shared/Container/Container'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import { SameDayIncorporationCard } from './SameDayIncorporationCard'
import { sameDayIncorporationStyles as s } from './SameDayIncorporation.styles'

export const SameDayIncorporationBlockComponent: React.FC<SameDayIncorporationBlockProps> = ({
  heading,
  body,
  sectionLayout,
}) => (
  <SectionWrapper {...sectionLayout} className={s.section}>
    <Container>
      <SameDayIncorporationCard
        heading={heading}
        body={
          body && (
            <RichText data={body} enableGutter={false} enableProse={false} className={s.body} />
          )
        }
      />
    </Container>
  </SectionWrapper>
)
