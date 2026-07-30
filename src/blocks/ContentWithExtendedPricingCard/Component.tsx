import React from 'react'
import Link from 'next/link'

import type { ContentWithExtendedPricingCardBlock as ContentWithExtendedPricingCardBlockProps } from '@/payload-types'

import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { Button } from '@/components/ui/button'
import { getLinkHref, type LinkData } from '@/utilities/links'
import { contentWithExtendedPricingCardStyles as s } from './ContentWithExtendedPricingCard.styles'

export const ContentWithExtendedPricingCardBlock: React.FC<
  ContentWithExtendedPricingCardBlockProps
> = ({ title, intro, sections, card, sectionLayout }) => {
  const ctaHref = card?.cta ? getLinkHref(card.cta as LinkData) : null
  const showCta = ctaHref && ctaHref !== '#' && card?.cta?.label
  const feature = card?.feature
  const showFeature = feature?.title || feature?.description
  const details = card?.details
  const showDetails = details && details.length > 0

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <div className={s.container}>
        {/* Left content column */}
        <div className={s.contentCol}>
          {/* Big title + intro */}
          <div className={s.contentSection}>
            {title && (
              <Text as="h2" textStyle="headline-5xl" text={title} className={s.bigTitle} />
            )}
            {intro && <Text as="p" textStyle="body-base" text={intro} className={s.intro} />}
          </div>

          {/* Content sections — a single tablet column that stacks every
              section vertically, so N sections don't split into N columns. */}
          {sections && sections.length > 0 && (
            <div className={s.sectionsWrapper}>
              {sections.map((section) => (
                <div key={section.id} className={s.sectionItem}>
                  {section.heading && (
                    <Text
                      as="h3"
                      textStyle="headline-4xl"
                      text={section.heading}
                      className={s.sectionHeading}
                    />
                  )}

                  {section.bulletItems && section.bulletItems.length > 0 && (
                    <ul className={s.itemsList}>
                      {section.bulletItems.map((item) => (
                        <li key={item.id} className={s.bulletItem}>
                          <Text textStyle="body-base" text="•" className={s.bulletDot} />
                          <Text textStyle="body-base" text={item.text} className={s.bulletText} />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right extended pricing card */}
        <div className={s.card}>
          {/* Price details */}
          <div className={s.priceDetails}>
            <div className={s.priceGroup}>
              {card?.price && (
                <Text textStyle="headline-3xl" text={card.price} className={s.price} />
              )}
              {card?.serviceLabel && (
                <Text textStyle="body-lg" text={card.serviceLabel} className={s.serviceLabel} />
              )}
            </div>

            {showCta && (
              <Link
                href={ctaHref}
                className={s.ctaLink}
                {...(card!.cta!.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <Button variant="primary" size="lg" className="w-full md:w-auto lg:w-full">
                  {card!.cta!.label}
                </Button>
              </Link>
            )}
          </div>

          {/* Details container (optional content) */}
          {(showFeature || showDetails) && (
            <div className={s.detailsContainer}>
              {/* Feature block */}
              {showFeature && (
                <div className={s.feature}>
                  {feature?.title && (
                    <Text
                      as="h4"
                      textStyle="headline-2xl"
                      text={feature.title}
                      className={s.featureTitle}
                    />
                  )}
                  {feature?.description && (
                    <Text
                      as="p"
                      textStyle="body-base"
                      text={feature.description}
                      className={s.featureDescription}
                    />
                  )}
                </div>
              )}

              {/* Details & Costs */}
              {showDetails && (
                <div className={s.detailsAndCosts}>
                  {card?.detailsTitle && (
                    <>
                      <Text
                        as="h4"
                        textStyle="headline-2xl"
                        text={card.detailsTitle}
                        className={s.detailsTitle}
                      />
                      <div className={s.divider} aria-hidden="true" />
                    </>
                  )}
                  <div className={s.detailsList}>
                    {details.map((detail) => (
                      <div key={detail.id} className={s.detailRow}>
                        <Text
                          as="p"
                          textStyle="body-base"
                          text={detail.label}
                          className={s.detailLabel}
                        />
                        <Text
                          textStyle="headline-xl"
                          text={detail.value}
                          className={s.detailValue}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  )
}
