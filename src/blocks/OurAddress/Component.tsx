import React from 'react'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { Media as MediaType, OurAddressBlock as OurAddressBlockProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { Media } from '@/components/Media'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { Button } from '@/components/ui/button'
import { getLinkHref, type LinkData } from '@/utilities/links'
import { ourAddressStyles as s } from './OurAddress.styles'

const imageSizes = {
  compact: '(min-width: 1023px) 400px, (min-width: 768px) 375px, 100vw',
  feature: '(min-width: 1023px) 600px, (min-width: 768px) 450px, 100vw',
} as const

export type OurAddressSectionProps = {
  variant?: OurAddressBlockProps['variant']
  heading: string
  label?: string | null
  image: MediaType | string | number
  address: string
  price: string
  postText?: string | null
  ctaLabel?: string | null
  ctaHref?: string
  ctaNewTab?: boolean | null
  sectionLayout?: OurAddressBlockProps['sectionLayout']
}

export const OurAddressSection: React.FC<OurAddressSectionProps> = ({
  variant,
  heading,
  label,
  image,
  address,
  price,
  postText,
  ctaLabel,
  ctaHref,
  ctaNewTab,
  sectionLayout,
}) => {
  const isFeature = variant === 'feature'
  const v = isFeature ? s.feature : s.compact
  const photo = typeof image === 'object' ? image : undefined
  const aspect = photo?.width && photo?.height ? `${photo.width} / ${photo.height}` : '3251 / 2486'

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container>
        <div className={s.headingWrap}>
          <Text as="h2" textStyle="span" text={heading} className={s.heading} />
        </div>
        <div className={v.wrap}>
          <div className={v.card} style={{ '--photo-aspect': aspect } as React.CSSProperties}>
            <Media
              resource={image}
              htmlElement="div"
              className={v.imageWrap}
              imgClassName={v.image}
              size={imageSizes[isFeature ? 'feature' : 'compact']}
              fill
            />
            <div className={v.content}>
              <div>
                {isFeature && label && (
                  <Text as="h3" textStyle="span" text={label} className={s.feature.label} />
                )}
                <Text as="p" textStyle="span" text={address} className={v.address} />
              </div>
              <div className={v.footer}>
                <span className={v.price}>
                  {'£'}
                  {price}
                  {postText && (
                    <>
                      &nbsp;<small className={v.priceSmall}>{postText}</small>
                    </>
                  )}
                </span>
                {ctaLabel && (
                  <Button variant="success" size="promo" className={v.cta} asChild>
                    <Link
                      href={ctaHref ?? '#'}
                      target={ctaNewTab ? '_blank' : undefined}
                      rel={ctaNewTab ? 'noopener noreferrer' : undefined}
                    >
                      {ctaLabel}
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  )
}

export const OurAddressBlock: React.FC<OurAddressBlockProps> = async ({
  variant,
  heading,
  label,
  image,
  address,
  priceSlug,
  postText,
  cta,
  sectionLayout,
}) => {
  if (!image) return null

  const payload = await getPayload({ config: configPromise })
  const { items } = await payload.findGlobal({ slug: 'prices' })
  const price = (items ?? []).find((item) => item.slug === priceSlug)?.value

  if (!price) return null

  const link = cta as LinkData | undefined

  return (
    <OurAddressSection
      variant={variant}
      heading={heading}
      label={label}
      image={image}
      address={address}
      price={price}
      postText={postText}
      ctaLabel={link?.label}
      ctaHref={getLinkHref(link)}
      ctaNewTab={link?.newTab}
      sectionLayout={sectionLayout}
    />
  )
}
