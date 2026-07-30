import React from 'react'
import Link from 'next/link'

import type { RegisteredOfficeAddressBlock as RegisteredOfficeAddressBlockProps } from '@/payload-types'

import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { Media } from '@/components/Media'
import { Button } from '@/components/ui/button'
import { getLinkHref, type LinkData } from '@/utilities/links'
import { registeredOfficeAddressStyles as s } from './RegisteredOfficeAddress.styles'

export const RegisteredOfficeAddressBlock: React.FC<RegisteredOfficeAddressBlockProps> = ({
  heading,
  image,
  address,
  price,
  priceSuffix,
  cta,
  sectionLayout,
}) => {
  const ctaHref = getLinkHref(cta as LinkData | undefined)

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <div className={s.header}>
        <Text as="h2" textStyle="span" text={heading} className={s.heading} />
      </div>

      <div className={s.card}>
        <div className={s.imageWrap}>
          {image && typeof image === 'object' && (
            <Media resource={image} fill imgClassName={s.image} />
          )}
        </div>

        <div className={s.textCol}>
          <div className={s.addressRow}>
            <Text
              as="div"
              textStyle="span"
              text={address}
              className={s.address}
            />
            <div className={s.pricingMobile} aria-hidden="true">
              <Text textStyle="span" text={price} className={s.priceMobile} />
              <Text textStyle="span" text={priceSuffix} className={s.priceSuffix} />
            </div>
          </div>

          <div className={s.ctaGroup}>
            {cta?.label && (
              <Link
                href={ctaHref}
                target={cta.newTab ? '_blank' : undefined}
                rel={cta.newTab ? 'noopener noreferrer' : undefined}
                className={s.ctaButton}
              >
                <Button variant="primary" size="lg" className="w-full md:w-auto">
                  {cta.label}
                </Button>
              </Link>
            )}
            <div className={s.pricingInline}>
              <Text textStyle="span" text={price} className={s.priceInline} />
              <Text textStyle="span" text={priceSuffix} className={s.priceSuffix} />
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
