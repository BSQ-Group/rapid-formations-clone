import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import type { FourStepsBlock as FourStepsBlockProps } from '@/payload-types'

import { faChevronRight } from '@fortawesome/pro-solid-svg-icons/faChevronRight'

import Text from '@/components/shared/Text'
import { FaIcon } from '@/components/shared/FaIcon'
import { SnapCarousel } from '@/components/shared/SnapCarousel/SnapCarousel'
import { cn } from '@/utilities/ui'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { getLinkHref, type LinkData } from '@/utilities/links'
import { Container } from '@/components/shared/Container/Container'
import { fourStepsStyles as s } from './FourSteps.styles'

export const FourStepsBlock: React.FC<FourStepsBlockProps> = ({
  heading,
  subheading,
  steps,
  ctaLink,
}) => {
  if (!steps?.length) return null

  const ctaHref = ctaLink ? getLinkHref(ctaLink as LinkData) : null

  return (
    <section className={s.section}>
      <Container>
        {(heading || subheading) && (
          <div className={s.header}>
            {heading && <Text as="h2" textStyle="span" text={heading} className={s.heading} />}
            {subheading && (
              <Text as="p" textStyle="span" text={subheading} className={s.subheading} />
            )}
          </div>
        )}
        <SnapCarousel
          as="ol"
          label="Company formation steps"
          className={s.grid}
          slideClassName={cn(s.step, s.slide)}
          dotsClassName={s.dots}
        >
          {steps.map((step, index) => {
            const image = step.image
            const isLast = index === steps.length - 1

            return (
              <React.Fragment key={step.id ?? index}>
                <div className={s.imageWrapper}>
                  {image && typeof image === 'object' && image.url && (
                    <Image
                      src={getMediaUrl(image.url)}
                      alt={image.alt || step.title}
                      width={140}
                      height={140}
                      className={s.image}
                      unoptimized
                    />
                  )}
                </div>
                <div className={s.body}>
                  <Text textStyle="span" text={String(index + 1)} className={s.number} />
                  <Text as="h3" textStyle="span" text={step.title} className={s.title} />
                  <div className={s.content}>
                    <Text
                      as="p"
                      textStyle="span"
                      text={step.description}
                      className={s.description}
                    />
                  </div>
                </div>
                {!isLast && <FaIcon icon={faChevronRight} className={s.chevron} />}
              </React.Fragment>
            )
          })}
        </SnapCarousel>
        {ctaHref && ctaHref !== '#' && ctaLink?.label && (
          <div className={s.cta}>
            <Link href={ctaHref} className={s.ctaButton}>
              {ctaLink.label}
            </Link>
          </div>
        )}
      </Container>
    </section>
  )
}
