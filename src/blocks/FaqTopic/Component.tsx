import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { FaqTopicBlock as FaqTopicBlockProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import { FaqTopicCards } from './FaqTopicCards'
import { faqTopicStyles as s } from './FaqTopic.styles'

export const FaqTopicBlock: React.FC<FaqTopicBlockProps> = async ({ sectionLayout }) => {
  const payload = await getPayload({ config: configPromise })
  const { topics } = await payload.findGlobal({ slug: 'faqTopics' })

  if (!topics?.length) return null

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container>
        <FaqTopicCards topics={topics} />
      </Container>
    </SectionWrapper>
  )
}
