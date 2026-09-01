import React from 'react'

import type { FaqTopicBlock as FaqTopicBlockProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import { FaqTopicCards } from './FaqTopicCards'
import { faqTopicStyles as s } from './FaqTopic.styles'

export const FaqTopicBlock: React.FC<FaqTopicBlockProps> = ({ topics, sectionLayout }) => {
  if (!topics?.length) return null

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container>
        <FaqTopicCards topics={topics} />
      </Container>
    </SectionWrapper>
  )
}
