import React from 'react'
import Link from 'next/link'

import type { RegisterOverseasBlock as RegisterOverseasBlockProps } from '@/payload-types'

import { Button } from '@/components/ui/button'
import { Media } from '@/components/Media'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { getLinkHref, type LinkData } from '@/utilities/links'
import { registerOverseasStyles as s } from './RegisterOverseas.styles'

export const RegisterOverseasBlock: React.FC<RegisterOverseasBlockProps> = ({
  heading,
  body,
  cta,
  image,
  sectionLayout,
}) => {
  // CTA wraps Button inside Link directly (mirrors PromoTier3) instead of going
  // through CMSLink → Slot, which drops the Button's base classes.
  const ctaHref = cta ? getLinkHref(cta as LinkData) : null

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <div className={s.card}>
        {/* Content: heading, body, CTA button */}
        <div className={s.content}>
          <div className={s.textGroup}>
            {heading && (
              <Text as="h2" textStyle="headline-4xl" text={heading} className={s.heading} />
            )}
            {body && (
              <Text as="p" textStyle="body-sm" text={body} className={s.body} />
            )}
          </div>

          {ctaHref && ctaHref !== '#' && cta?.label && (
            <Link
              href={ctaHref}
              {...(cta.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <Button variant="primary" size="lg">
                {cta.label}
              </Button>
            </Link>
          )}
        </div>

        {/* Image: below text on mobile/tablet, right column on desktop */}
        {image && (
          <div className={s.imageWrapper}>
            <Media resource={image} fill imgClassName={s.image} />
          </div>
        )}
      </div>
    </SectionWrapper>
  )
}
