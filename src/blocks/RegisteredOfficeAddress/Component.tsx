import React from 'react'
import Link from 'next/link'

import type { RegisteredOfficeAddressBlock as RegisteredOfficeAddressBlockProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { CtaLink } from '@/components/shared/CtaLink/CtaLink'
import { Media } from '@/components/Media'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { getLinkHref, type LinkData } from '@/utilities/links'
import { registeredOfficeAddressStyles as s } from './RegisteredOfficeAddress.styles'

export const RegisteredOfficeAddressBlock: React.FC<RegisteredOfficeAddressBlockProps> = ({
  heading,
  image,
  serviceTitle,
  description,
  price,
  priceSuffix,
  cta,
  sectionLayout,
}) => {
  const ctaHref = getLinkHref(cta as LinkData | undefined)
  const illustration = image && typeof image === 'object' ? image : null

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container>
        <Text as="h2" textStyle="span" text={heading} className={s.heading} />
        <div className={s.card}>
          {illustration && (
            <div className={s.imageWrap}>
              <Media resource={illustration} fill imgClassName={s.image} />
            </div>
          )}
          <Link href={ctaHref} className={s.cardLink}>
            <Text as="h3" textStyle="span" text={serviceTitle} className={s.serviceTitle} />
            <Text
              as="p"
              textStyle="span"
              text={`${price ?? ''}${priceSuffix ?? ''}`}
              className={s.price}
            />
          </Link>
          <Text as="p" textStyle="span" text={description} className={s.description} />
          {cta?.label && (
            <CtaLink href={ctaHref} label={cta.label} newTab={cta.newTab} className={s.ctaButton} />
          )}
        </div>
      </Container>
    </SectionWrapper>
  )
}
