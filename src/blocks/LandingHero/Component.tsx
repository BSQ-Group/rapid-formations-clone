import React from 'react'
import Image from 'next/image'

import type { LandingHeroBlock as LandingHeroBlockProps, Media as MediaType } from '@/payload-types'

import Text from '@/components/shared/Text'
import { GoogleStar } from '@/components/shared/SVG/GoogleStar'
import { Media } from '@/components/Media'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { landingHeroStyles as s } from './LandingHero.styles'
import { TrustpilotWidget } from '@/components/shared/TrustpilotWidget'
import { LandingHeroContent } from './LandingHeroContent'

const HERO_TRUSTPILOT_TOKEN = '910258f7-b8f9-4650-8b0f-2b7e1b9a5d9a'

export const LandingHeroBlock: React.FC<LandingHeroBlockProps> = ({
  eyebrow,
  heading,
  benefits,
  searchPlaceholder,
  pricingLink,
  packagesLink,
  backgroundImage,
  google,
}) => {
  return (
    <section className={s.section}>
      {/* Background Image — hidden on mobile. `priority` is intentionally
          omitted: the wrapper is `display: none` below md, so preloading
          would fetch a never-painted image on mobile. */}
      {backgroundImage && typeof backgroundImage === 'object' && (
        <div className={s.backgroundWrapper}>
          <Media
            resource={backgroundImage}
            fill
            pictureClassName="absolute inset-0"
            imgClassName={s.backgroundImg}
          />
        </div>
      )}

      {/* Content */}
      <div className={s.container}>
        <LandingHeroContent
          eyebrow={eyebrow}
          heading={heading}
          benefits={benefits}
          searchPlaceholder={searchPlaceholder}
          pricingLink={pricingLink}
          packagesLink={packagesLink}
        />

        {/* Reviews */}
        <div className={s.reviews}>
          {/* Trustpilot — live widget renders logo, stars, score, and review count */}
          <TrustpilotWidget
            template="mini"
            theme="dark"
            height="90px"
            width="100%"
            token={HERO_TRUSTPILOT_TOKEN}
            className={s.trustpilotContainer}
          />
          {/* Google */}
          {google && (
            <div className={s.googleContainer}>
              <div className={s.googleInner}>
                {google.logo && typeof google.logo === 'object' && (
                  <Image
                    src={getMediaUrl((google.logo as MediaType).url)}
                    alt="Google"
                    width={(google.logo as MediaType).width || 67}
                    height={(google.logo as MediaType).height || 22}
                    className={s.googleLogo}
                    unoptimized
                  />
                )}
                <div className={s.googleStars}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <GoogleStar key={i} className={s.googleStar} />
                  ))}
                </div>
              </div>
              <Text
                text={`Rated <strong>${google.rating || '4.9'}</strong> | <strong>${google.reviewCount || '462'}</strong> reviews`}
                textStyle="body-sm"
                className={s.googleText}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
