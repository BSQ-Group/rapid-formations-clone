import React from 'react'
import Link from 'next/link'

import type { PromoTier2Block as PromoTier2BlockProps } from '@/payload-types'

import { Button } from '@/components/ui/button'
import { LucideIcon } from '@/components/shared/LucideIcon/LucideIcon'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { getLinkHref, type LinkData } from '@/utilities/links'
import { promoTier2Styles as s } from './PromoTier2.styles'

type Props = PromoTier2BlockProps

export const PromoTier2Block: React.FC<Props> = ({
  icon,
  title,
  pricePrefix,
  price,
  cta,
  sectionLayout,
}) => {
  const ctaHref = cta ? getLinkHref(cta as LinkData) : null

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <div className={s.inner}>
        <div className={s.left}>
          <span className={s.iconTile}>
            <LucideIcon name={icon || 'FileCheck2'} size={32} className={s.icon} />
          </span>
          <Text as="h2" textStyle="headline-2xl" text={title} className={s.title} />
        </div>

        <div className={s.right}>
          <div className={s.priceBlock}>
            {pricePrefix && (
              <Text textStyle="body-sm" text={pricePrefix} className={s.pricePrefix} />
            )}
            <Text as="span" textStyle="headline-2xl" text={price} className={s.price} />
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
    </SectionWrapper>
  )
}
