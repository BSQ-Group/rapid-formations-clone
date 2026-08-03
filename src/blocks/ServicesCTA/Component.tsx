import React from 'react'
import Link from 'next/link'
import type { ServicesCTABlock as ServicesCTABlockProps } from '@/payload-types'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { Media } from '@/components/Media'
import { Button } from '@/components/ui/button'
import { getLinkHref, type LinkData } from '@/utilities/links'
import { servicesCTAStyles as s } from './ServicesCTA.styles'

export const ServicesCTABlock: React.FC<ServicesCTABlockProps> = ({
  title,
  description,
  trustPillBoldPrefix,
  trustPillText,
  trustPillTextMobile,
  ctaLink,
  backgroundImage,
  sectionLayout,
}) => {
  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      {backgroundImage && typeof backgroundImage === 'object' && (
        <div className={s.background}>
          <Media resource={backgroundImage} fill imgClassName="object-cover object-left" />
        </div>
      )}
      <div className={s.content}>
        <div className={s.lockup}>
          {(trustPillBoldPrefix || trustPillText || trustPillTextMobile) && (
            <div className={s.pill}>
              <div className={s.pillBorder} />
              <div className={s.pillFill} />
              {(trustPillBoldPrefix || trustPillTextMobile) && (
                <span className={s.pillTextMobile}>
                  {trustPillBoldPrefix && (
                    <span className={s.pillBoldText}>{trustPillBoldPrefix} </span>
                  )}
                  {trustPillTextMobile}
                </span>
              )}
              {(trustPillBoldPrefix || trustPillText) && (
                <span className={s.pillTextDesktop}>
                  {trustPillBoldPrefix && (
                    <span className={s.pillBoldText}>{trustPillBoldPrefix} </span>
                  )}
                  {trustPillText}
                </span>
              )}
            </div>
          )}
          <div className={s.textGroup}>
            <Text as="h2" textStyle="headline-4xl" text={title} className={s.heading} />
            {description && (
              <Text as="p" textStyle="headline-2xl" text={description} className={s.description} />
            )}
          </div>
        </div>
        {ctaLink && (
          <Link href={getLinkHref(ctaLink as LinkData)}>
            <Button variant="primary" size="lg">
              {ctaLink.label}
            </Button>
          </Link>
        )}
      </div>
    </SectionWrapper>
  )
}
