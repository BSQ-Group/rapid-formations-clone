import React from 'react'

import type { PromoTier3Block as PromoTier3BlockProps } from '@/payload-types'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { getLinkHref, type LinkData } from '@/utilities/links'
import { Check } from 'lucide-react'
import { promoTier3Styles as s } from './PromoTier3.styles'

type Props = PromoTier3BlockProps

export const PromoTier3Block: React.FC<Props> = ({
  eyebrow,
  title,
  description,
  pills,
  price,
  priceCaption,
  backgroundImage,
  cta,
  sectionLayout,
}) => {
  const bgUrl =
    backgroundImage && typeof backgroundImage === 'object' ? backgroundImage.url : null
  const bgAlt =
    backgroundImage && typeof backgroundImage === 'object'
      ? backgroundImage.alt || ''
      : ''

  const ctaHref = cta ? getLinkHref(cta as LinkData) : null

  return (
    <SectionWrapper {...sectionLayout}>
      <div className={s.inner}>
        <div className={s.card}>
          {bgUrl && <img src={bgUrl} alt={bgAlt} className={s.bgImage} aria-hidden="true" />}
          <div className={s.overlayGreen} aria-hidden="true" />
          <div className={s.overlayBlue} aria-hidden="true" />
          <div className={s.overlayWhite} aria-hidden="true" />
          <div className={s.content}>
            <div className={s.textCol}>
              <div className={s.titleBlock}>
                {eyebrow && (
                  <Text textStyle="body-xs" text={eyebrow} className={s.eyebrow} />
                )}
                <Text as="h2" textStyle="headline-3xl" text={title} className={s.title} />
                <Text as="p" textStyle="body-sm" text={description} className={s.description} />
              </div>
              {pills && pills.length > 0 && (
                <ul className={s.pills}>
                  {pills.map((pill) => (
                    <li key={pill.id ?? pill.label} className={s.pill}>
                      <Check className={s.pillIcon} strokeWidth={2.5} />
                      <Text textStyle="body-xs" text={pill.label} className={s.pillLabel} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className={s.rightCol}>
              <div className={s.priceRow}>
                <Text as="span" textStyle="headline-3xl" text={price} className={s.price} />
                {priceCaption && (
                  <Text
                    textStyle="body-sm"
                    text={priceCaption}
                    className={s.priceCaption}
                  />
                )}
              </div>
              {ctaHref && ctaHref !== '#' && cta?.label && (
                <Link
                  href={ctaHref}
                  className={s.ctaLink}
                  {...(cta.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <Button variant="primary" size="lg" className={s.cta}>
                    {cta.label}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
