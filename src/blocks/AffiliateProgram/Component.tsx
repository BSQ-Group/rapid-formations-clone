import React from 'react'
import { faChevronRight } from '@fortawesome/pro-solid-svg-icons/faChevronRight'

import type { AffiliateProgramBlock as AffiliateProgramBlockProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { CtaLink } from '@/components/shared/CtaLink/CtaLink'
import { FaIcon } from '@/components/shared/FaIcon'
import RichText from '@/components/RichText'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import { getLinkHref, type LinkData } from '@/utilities/links'
import { affiliateProgramStyles as s } from './AffiliateProgram.styles'

export const AffiliateProgramBlockComponent: React.FC<AffiliateProgramBlockProps> = ({
  content,
  cta,
  sectionLayout,
}) => {
  if (!content) return null

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container>
        <div className={s.panel}>
          <RichText
            data={content}
            enableGutter={false}
            enableProse={false}
            className={s.content}
            listItemIcon={<FaIcon icon={faChevronRight} className={s.bullet} />}
          />
          {cta?.label && (
            <CtaLink
              href={getLinkHref(cta as LinkData)}
              label={cta.label}
              newTab={cta.newTab}
              rel="nofollow noreferrer noopener"
              tone="success"
              size="lg"
              className={s.cta}
            />
          )}
        </div>
      </Container>
    </SectionWrapper>
  )
}
