import React from 'react'

import type { GlossaryBlock as GlossaryBlockProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import { GlossaryTabs } from './GlossaryTabs'
import { glossaryStyles as s } from './Glossary.styles'

export const GlossaryBlock: React.FC<GlossaryBlockProps> = ({ groups, sectionLayout }) => {
  const ranges = (groups ?? []).filter((group) => (group.terms ?? []).length > 0)

  if (!ranges.length) return null

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container>
        <GlossaryTabs groups={ranges} />
      </Container>
    </SectionWrapper>
  )
}
