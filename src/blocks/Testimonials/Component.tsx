import React from 'react'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import type { TestimonialsBlock as TestimonialsBlockProps } from '@/payload-types'
import { testimonialsStyles as s } from './Testimonials.styles'
import { TrustpilotCarousel } from './TrustpilotCarousel'

type Props = TestimonialsBlockProps

export const TestimonialsBlock: React.FC<Props> = ({ heading, description, sectionLayout }) => {
  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <div className={s.inner}>
        <div className={s.header}>
          {heading && (
            <Text as="h2" textStyle="headline-5xl" text={heading} className={s.heading} />
          )}
          {description && (
            <Text textStyle="body-sm" text={description} className={s.description} />
          )}
        </div>
        <TrustpilotCarousel />
      </div>
    </SectionWrapper>
  )
}
