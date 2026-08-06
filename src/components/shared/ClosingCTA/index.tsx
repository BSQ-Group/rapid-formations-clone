import React from 'react'

import type { ClosingCTABlock as ClosingCTAProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { CtaLink } from '@/components/shared/CtaLink'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { getLinkHref, type LinkData } from '@/utilities/links'
import { closingCTAStyles as s } from './ClosingCTA.styles'

export const ClosingCTA: React.FC<ClosingCTAProps> = ({
  heading,
  description,
  cta,
  sectionLayout,
}) => {
  const ctaHref = getLinkHref(cta as LinkData | undefined)

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container>
        <div className={s.wrapper}>
          <Text as="h2" textStyle="span" text={heading} className={s.heading} />
          {description && (
            <Text as="p" textStyle="span" text={description} className={s.description} />
          )}
          {cta?.label && (
            <div className={s.ctaWrap}>
              <CtaLink
                href={ctaHref}
                label={cta.label}
                newTab={cta.newTab}
                size="md"
                tone="success"
              />
            </div>
          )}
        </div>
      </Container>
    </SectionWrapper>
  )
}
