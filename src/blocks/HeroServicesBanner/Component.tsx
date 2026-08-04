import React from 'react'
import Link from 'next/link'

import type { HeroServicesBannerBlock as HeroServicesBannerBlockProps } from '@/payload-types'

import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { Button } from '@/components/ui/button'
import { Media } from '@/components/Media'
import { LucideIcon } from '@/components/shared/LucideIcon'
import { TrustpilotWidget } from '@/components/shared/TrustpilotWidget/TrustpilotWidget'
import { getLinkHref } from '@/utilities/links'
import { heroServicesBannerStyles as s } from './HeroServicesBanner.styles'

const TWO_WIDGET_SLOT_CLASS = [s.twoWidgetSlot1, s.twoWidgetSlot2] as const
const THREE_WIDGET_SLOT_CLASS = [
  s.threeWidgetSlot1,
  s.threeWidgetSlot2,
  s.threeWidgetSlot3,
] as const

export const HeroServicesBannerBlock: React.FC<HeroServicesBannerBlockProps> = ({
  title,
  description,
  priceText,
  cta,
  showTrustpilot,
  image,
  widgets,
  sectionLayout,
}) => {
  const ctaHref = cta ? getLinkHref(cta) : null
  const ctaHasLink = ctaHref && ctaHref !== '#'
  const visibleWidgets = widgets?.slice(0, 3) ?? []
  const slotClasses = visibleWidgets.length === 3 ? THREE_WIDGET_SLOT_CLASS : TWO_WIDGET_SLOT_CLASS
  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <div className={s.inner}>
        <div className={s.textCol}>
          <div className={s.titleBlock}>
            {title && <Text as="h1" text={title} textStyle="headline-6xl" className={s.title} />}
            {description && (
              <Text text={description} textStyle="body-base" className={s.description} />
            )}
          </div>
          {priceText && <Text text={priceText} textStyle="headline-4xl" className={s.price} />}
          <div className={s.ctaRow}>
            {ctaHasLink && (
              <Link
                href={ctaHref}
                className={s.ctaButton}
                target={cta?.newTab ? '_blank' : undefined}
                rel={cta?.newTab ? 'noopener noreferrer' : undefined}
              >
                <Button variant="primary" size="lg" className="w-full md:w-auto">
                  {cta?.label || 'Order'}
                </Button>
              </Link>
            )}
            {showTrustpilot && (
              <TrustpilotWidget
                template="microTrustScore"
                height="20px"
                width="100%"
                token="b70065d2-8ddb-47c5-b8d6-ed3d2030a675"
                className={s.trustpilot}
              />
            )}
          </div>
        </div>
        <div className={s.visualCol}>
          <div className={s.imageFrame}>
            {image && typeof image === 'object' && (
              <Media resource={image} fill imgClassName={s.image} />
            )}
          </div>
          {visibleWidgets.map((widget, i) => {
            const slot = slotClasses[i]
            if (!slot) return null
            const progress = Math.max(0, Math.min(100, widget.progressPercent ?? 50))
            // Positioning + visibility live on the outer wrapper; the inner
            // widgetCard owns flex/border/background. Keeping the two on
            // separate elements means tailwind-merge can't collapse the slot's
            // `hidden md:block` (3-widget mobile case) into the card's `flex`.
            return (
              <div key={widget.id} className={slot}>
                <div className={s.widgetCard}>
                  <div className={s.widgetIconTile}>
                    <LucideIcon
                      name={widget.icon || 'BadgeCheck'}
                      size={24}
                      className={s.widgetIcon}
                    />
                  </div>
                  <div className={s.widgetTextCol}>
                    {widget.title && (
                      <Text text={widget.title} textStyle="span" asChild className={s.widgetTitle}>
                        <span />
                      </Text>
                    )}
                    {widget.subtitle && (
                      <Text
                        text={widget.subtitle}
                        textStyle="span"
                        asChild
                        className={s.widgetSubtitle}
                      >
                        <span />
                      </Text>
                    )}
                    {widget.showProgress && (
                      <div className={s.progressTrack}>
                        <div className={s.progressFill} style={{ width: `${progress}%` }} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </SectionWrapper>
  )
}

export default HeroServicesBannerBlock
