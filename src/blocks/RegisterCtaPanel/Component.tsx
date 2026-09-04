import React from 'react'
import Link from 'next/link'

import type { RegisterCtaPanelBlock as RegisterCtaPanelBlockProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { CtaLink } from '@/components/shared/CtaLink'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { getLinkHref, type LinkData } from '@/utilities/links'
import { registerCtaPanelStyles as s } from './RegisterCtaPanel.styles'

export const RegisterCtaPanelBlock: React.FC<RegisterCtaPanelBlockProps> = ({
  heading,
  description,
  descriptionSuffix,
  phone,
  cta,
  sectionLayout,
}) => {
  const phoneHref = getLinkHref(phone as LinkData | undefined)
  const ctaHref = getLinkHref(cta as LinkData | undefined)

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container>
        <Text as="h2" textStyle="span" text={heading} className={s.heading} />
        <Text as="h4" textStyle="span" className={s.description}>
          {description}
          {phone?.label && (
            <>
              {' '}
              <Link href={phoneHref} className={s.phoneLink}>
                {phone.label}
              </Link>
            </>
          )}
          {descriptionSuffix}
        </Text>
        {cta?.label && (
          <div className={s.ctaRow}>
            <CtaLink
              href={ctaHref}
              label={cta.label}
              newTab={cta.newTab}
              size="lg"
              tone="success"
            />
          </div>
        )}
      </Container>
    </SectionWrapper>
  )
}
