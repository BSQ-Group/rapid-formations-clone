import React from 'react'
import { faStar } from '@fortawesome/pro-solid-svg-icons/faStar'

import type { ServicePriceBannerBlock as ServicePriceBannerBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Container } from '@/components/shared/Container/Container'
import { FaIcon } from '@/components/shared/FaIcon'
import { Media } from '@/components/Media'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { cn } from '@/utilities/ui'
import { servicePriceBannerStyles as s } from './ServicePriceBanner.styles'

export const ServicePriceBannerBlockComponent: React.FC<ServicePriceBannerBlockProps> = ({
  heading,
  subheading,
  price,
  priceSuffix,
  cta,
  image,
  quote,
  background,
  sectionLayout,
}) => {
  if (!heading) return null

  const tone = s.background[background ?? 'navy'] ?? s.background.navy

  return (
    <SectionWrapper {...sectionLayout} className={cn(s.section, tone)}>
      <Container className={s.columns}>
        <div className={s.left}>
          <Text as="h1" textStyle="span" text={heading} className={s.heading} />
          {subheading?.trim() && (
            <Text as="p" textStyle="span" text={subheading} className={s.subheading} />
          )}
          {price && (
            <p className={s.price}>
              {`£${price}`}
              {priceSuffix?.trim() && (
                <>
                  {'\u00a0'}
                  <small className={s.priceSuffix}>{priceSuffix}</small>
                </>
              )}
            </p>
          )}
          {cta && <CMSLink {...cta} appearance="success" size="promo" className={s.cta} />}
        </div>
        {image && (
          <div className={s.right}>
            <div className={s.imageFrame}>
              {quote?.trim() && (
                <div className={s.quote}>
                  <div className={s.stars}>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <FaIcon key={index} icon={faStar} className={s.star} />
                    ))}
                  </div>
                  <Text as="p" textStyle="span" text={quote} className={s.quoteText} />
                </div>
              )}
              <Media
                resource={image}
                priority
                htmlElement={null}
                pictureClassName={s.imagePicture}
                imgClassName={s.image}
                size="300px"
              />
            </div>
          </div>
        )}
      </Container>
    </SectionWrapper>
  )
}
