import React from 'react'

import type { SectionLayoutValue } from '@/fields/sectionLayout'

import { Container } from '@/components/shared/Container/Container'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { cn } from '@/utilities/ui'
import { pageTitleStyles as s } from './PageTitle.styles'

export type PageTitleProps = {
  title?: string | null
  isPageTitle?: boolean | null
  sectionLayout?: SectionLayoutValue | null
  className?: string
  aside?: React.ReactNode
}

export const PageTitle: React.FC<PageTitleProps> = ({
  title,
  isPageTitle,
  sectionLayout,
  className,
  aside,
}) => {
  const heading = title?.trim()

  if (!heading) return null

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container>
        <div className={s.wrapper}>
          <div className={s.left}>
            <Text
              as={isPageTitle === false ? 'h2' : 'h1'}
              textStyle="span"
              text={heading}
              className={cn(s.heading, isPageTitle === false && s.headingSub, className)}
            />
          </div>
          {aside && <div className={s.right}>{aside}</div>}
        </div>
      </Container>
    </SectionWrapper>
  )
}
