import React from 'react'
import Link from 'next/link'

import type { ContentWithPricingCardBlock as ContentWithPricingCardBlockProps } from '@/payload-types'

import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import { LucideIcon } from '@/components/shared/LucideIcon'
import Text from '@/components/shared/Text'
import { Button } from '@/components/ui/button'
import { getLinkHref, type LinkData } from '@/utilities/links'
import { contentWithPricingCardStyles as s } from './ContentWithPricingCard.styles'

export const ContentWithPricingCardBlock: React.FC<ContentWithPricingCardBlockProps> = ({
  sections,
  card,
  sectionLayout,
}) => {
  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <div className={s.contentCol}>
        {sections?.map((section) => (
          <div key={section.id} className={s.contentSection}>
            {section.heading && (
              <Text
                as="h2"
                textStyle="headline-4xl"
                text={section.heading}
                className={s.sectionHeading}
              />
            )}
            {section.bulletItems && section.bulletItems.length > 0 && (
              <ul className={s.bulletList}>
                {section.bulletItems.map((item) => (
                  <li key={item.id} className={s.bulletItem}>
                    <Text textStyle="body-lg" text="•" className={s.bulletDot} />
                    <Text textStyle="body-base" text={item.text} className={s.bulletText} />
                  </li>
                ))}
              </ul>
            )}
            {section.tickItems && section.tickItems.length > 0 && (
              <ul className={s.tickList}>
                {section.tickItems.map((item) => (
                  <li key={item.id} className={s.tickItem}>
                    <span className={s.tickCircle} aria-hidden="true">
                      <LucideIcon name="check" size={16} className={s.tickIcon} />
                    </span>
                    <Text textStyle="body-base" text={item.text} className={s.tickText} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      <div className={s.card}>
        <div className={s.cardPriceGroup}>
          {card?.price && (
            <Text
              textStyle="headline-3xl"
              text={card.price}
              className={s.cardPrice}
            />
          )}
          {card?.serviceLabel && (
            <Text
              textStyle="body-lg"
              text={card.serviceLabel}
              className={s.cardServiceLabel}
            />
          )}
        </div>
        {(() => {
          const ctaHref = card?.cta ? getLinkHref(card.cta as LinkData) : null
          if (!ctaHref || ctaHref === '#' || !card?.cta?.label) return null
          return (
            <Link
              href={ctaHref}
              className={s.cardCta}
              {...(card.cta.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <Button variant="primary" size="lg" className="w-full md:w-auto lg:w-full">
                {card.cta.label}
              </Button>
            </Link>
          )
        })()}
      </div>
    </SectionWrapper>
  )
}
