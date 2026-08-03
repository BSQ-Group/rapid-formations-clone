import React from 'react'
import Link from 'next/link'

import type { RegisterCtaPanelBlock as RegisterCtaPanelBlockProps } from '@/payload-types'

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
      <div className={s.container}>
        <Text as="h2" textStyle="span" text={heading} className={s.heading} />
        <p className={s.description}>
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
        </p>
        {cta?.label && (
          <div className={s.ctaRow}>
            <Link
              href={ctaHref}
              target={cta.newTab ? '_blank' : undefined}
              rel={cta.newTab ? 'noopener noreferrer' : undefined}
              className={s.ctaButton}
            >
              {cta.label}
            </Link>
          </div>
        )}
      </div>
    </SectionWrapper>
  )
}
