import React from 'react'
import type { ServicesHeroBlock as ServicesHeroBlockProps } from '@/payload-types'
import Text from '@/components/shared/Text'
import { LucideIcon } from '@/components/shared/LucideIcon'
import { Media } from '@/components/Media'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import { servicesHeroStyles as s } from './ServicesHero.styles'

export const ServicesHeroBlock: React.FC<ServicesHeroBlockProps> = ({
  title,
  description,
  priceText,
  priceSuffix,
  heroImage1,
  heroImage2,
  addressCard,
  sectionLayout,
}) => {
  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <div className={s.inner}>
        <div className={s.leftCol}>
          <Text as="h1" textStyle="headline-6xl" text={title} className={s.heading} />
          {description && (
            <Text textStyle="body-base" text={description} className={s.description} />
          )}
          {priceText && (
            <div className={s.priceRow}>
              <Text textStyle="headline-3xl" text={priceText} className={s.priceText} />
              {priceSuffix && (
                <Text textStyle="body-sm" text={priceSuffix} className={s.priceSuffix} />
              )}
            </div>
          )}
        </div>
        <div className={s.rightCol}>
          <div className={s.imageArea}>
            {heroImage1 && typeof heroImage1 === 'object' && (
              <div className={s.mainImage}>
                <Media resource={heroImage1} fill />
              </div>
            )}
            {heroImage2 && typeof heroImage2 === 'object' && (
              <div className={s.secondaryImage}>
                <Media resource={heroImage2} fill />
              </div>
            )}
            {addressCard?.companyName && (
              <div className={s.addressCard}>
                <div className={s.addressIconRow}>
                  <div className={s.addressIconWrap}>
                    <LucideIcon name="MapPin" size={20} className="text-[var(--icon-default)]" />
                  </div>
                  <div className={s.addressContent}>
                    <Text
                      textStyle="body-sm"
                      text={addressCard.companyName}
                      className={s.addressCompanyName}
                    />
                    {addressCard.address && (
                      <Text
                        textStyle="body-xs"
                        text={addressCard.address}
                        className={s.addressText}
                      />
                    )}
                  </div>
                </div>
                {addressCard.badges && addressCard.badges.length > 0 && (
                  <div className={s.addressBadges}>
                    {addressCard.badges.map((badge) => (
                      <span key={badge.id} className={s.addressBadge}>
                        {badge.label}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
