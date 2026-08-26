'use client'

import React from 'react'
import Image from 'next/image'

import type { LandingHeroBlock as LandingHeroBlockProps } from '@/payload-types'
import { faCircleCheck } from '@fortawesome/pro-duotone-svg-icons/faCircleCheck'
import { FaIcon } from '@/components/shared/FaIcon'
import Text from '@/components/shared/Text'
import { CMSLink } from '@/components/Link'
import { NameCheck } from '@/components/shared/NameCheck'
import { nameCheckStyles as ncs } from '@/components/shared/NameCheck/NameCheck.styles'
import { landingHeroStyles as s } from './LandingHero.styles'

type Badge = { src: string; alt: string; width: number; height: number }

type Props = Pick<
  LandingHeroBlockProps,
  'eyebrow' | 'heading' | 'benefits' | 'searchPlaceholder' | 'pricingLink' | 'packagesLink'
> & { badge?: Badge | null }

export function LandingHeroContent({
  eyebrow,
  heading,
  benefits,
  searchPlaceholder,
  pricingLink,
  packagesLink,
  badge,
}: Props) {
  const idleSlot = (
    <div className={s.headlineBlock}>
      {badge && (
        <Image
          src={badge.src}
          alt={badge.alt}
          width={badge.width}
          height={badge.height}
          className={s.mobileBadge}
          loading="eager"
          unoptimized
        />
      )}
      {eyebrow && <Text text={eyebrow} textStyle="body-sm" className={s.eyebrow} />}
      {heading && <Text text={heading} as="h1" textStyle="span" className={s.heading} />}
      {benefits && benefits.length > 0 && (
        <div className={s.benefitsWrap}>
          <ul className={s.benefitsList}>
            {benefits.map((item) => (
              <li key={item.id} className={s.benefitItem}>
                <FaIcon
                  icon={faCircleCheck}
                  className={s.benefitIcon}
                  secondaryClassName="opacity-100 text-[var(--icon-success)]"
                />
                <Text text={item.text} textStyle="span" className={s.benefitText} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )

  const footerSlot = pricingLink ? (
    <div className={s.pricingLinkWrap}>
      <CMSLink {...pricingLink} appearance="inline" className={s.pricingLink} />
    </div>
  ) : null

  const availableCta = packagesLink ? (
    <CMSLink {...packagesLink} appearance="inline" className={ncs.cta} />
  ) : null

  return (
    <NameCheck
      variant="hero"
      placeholder={searchPlaceholder}
      idleSlot={idleSlot}
      footerSlot={footerSlot}
      availableCta={availableCta}
    />
  )
}
