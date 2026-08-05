import React from 'react'

import type { SectionLayoutValue } from '@/fields/sectionLayout'

import { Container } from '@/components/shared/Container/Container'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { cn } from '@/utilities/ui'
import { pageTitleStyles as s } from './PageTitle.styles'

export type PageTitleProps = {
  title?: string | null
  sectionLayout?: SectionLayoutValue | null
  className?: string
}

export const PageTitle: React.FC<PageTitleProps> = ({ title, sectionLayout, className }) => {
  const heading = title?.trim()

  if (!heading) return null

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container>
        <div className={s.wrapper}>
          <Text as="h1" textStyle="span" text={heading} className={cn(s.heading, className)} />
        </div>
      </Container>
    </SectionWrapper>
  )
}
