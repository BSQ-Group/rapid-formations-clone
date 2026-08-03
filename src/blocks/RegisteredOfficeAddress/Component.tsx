import React from 'react'
import Link from 'next/link'

import type { RegisteredOfficeAddressBlock as RegisteredOfficeAddressBlockProps } from '@/payload-types'

import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { Media } from '@/components/Media'
import { getLinkHref, type LinkData } from '@/utilities/links'
import { Container } from '@/components/shared/Container/Container'
import { registeredOfficeAddressStyles as s } from './RegisteredOfficeAddress.styles'

const BAND_ASPECT = 585 / 281

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
  const illustrationAspect =
    illustration?.width &&
    illustration.height &&
    illustration.width / illustration.height < BAND_ASPECT
      ? { aspectRatio: `${illustration.width} / ${illustration.height}` }
      : undefined

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container>
        <Text as="h2" textStyle="span" text={heading} className={s.heading} />
        <div className={s.card}>
          <Link href={ctaHref} className={s.cardLink}>
            {illustration && (
              <div className={s.imageWrap} style={illustrationAspect}>
                <Media resource={illustration} fill imgClassName={s.image} />
              </div>
            )}
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
            <Link
              href={ctaHref}
              target={cta.newTab ? '_blank' : undefined}
              rel={cta.newTab ? 'noopener noreferrer' : undefined}
              className={s.ctaButton}
            >
              {cta.label}
            </Link>
          )}
        </div>
      </Container>
    </SectionWrapper>
  )
}
