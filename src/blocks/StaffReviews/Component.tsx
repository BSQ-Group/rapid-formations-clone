import React from 'react'

import type { StaffReviewsBlock as StaffReviewsBlockProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { staffReviewsStyles as s } from './StaffReviews.styles'

export const StaffReviewsBlockComponent: React.FC<StaffReviewsBlockProps> = ({
  title,
  quotes,
  sectionLayout,
}) => {
  const shown = (quotes ?? []).filter((entry) => entry.quote && entry.person)

  if (!shown.length) return null

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container>
        {title ? <Text as="h2" textStyle="span" text={title} className={s.title} /> : null}
        <div className={s.quotes}>
          {shown.map((entry) => (
            <blockquote key={entry.id} className={s.quote}>
              <Text as="p" textStyle="span" text={entry.quote} className={s.body} />
              <footer className={s.footer}>
                {entry.person}
                {entry.role ? <cite className={s.cite}>{entry.role}</cite> : null}
              </footer>
            </blockquote>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  )
}
