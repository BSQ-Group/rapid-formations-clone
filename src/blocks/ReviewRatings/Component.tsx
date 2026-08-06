import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { ReviewRatingsBlock as ReviewRatingsBlockProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { CtaLink } from '@/components/shared/CtaLink'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { getLinkHref, type LinkData } from '@/utilities/links'
import { ReviewRatingsTrack } from './ReviewRatingsTrack'
import { reviewRatingsStyles as s } from './ReviewRatings.styles'

export const ReviewRatingsBlock: React.FC<ReviewRatingsBlockProps> = async ({
  heading,
  subheading,
  cta,
  sectionLayout,
}) => {
  const payload = await getPayload({ config: configPromise })
  const { platforms } = await payload.findGlobal({ slug: 'reviewStats' })

  const shown = (platforms ?? []).filter((platform) => platform.show !== false)

  if (!shown.length) return null

  const ctaHref = getLinkHref(cta as LinkData | undefined)

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container>
        <div className={s.header}>
          <Text as="h2" textStyle="span" text={heading} className={s.heading} />
          {subheading && (
            <Text as="p" textStyle="span" text={subheading} className={s.subheading} />
          )}
        </div>
        <ReviewRatingsTrack platforms={shown} />
        {cta?.label && (
          <div className={s.ctaWrap}>
            <CtaLink
              href={ctaHref}
              label={cta.label}
              newTab={cta.newTab}
              size="lg"
              tone="cyan"
              className={s.cta}
            />
          </div>
        )}
      </Container>
    </SectionWrapper>
  )
}
