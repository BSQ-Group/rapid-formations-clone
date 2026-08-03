import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import type { LandingHeroBlock as LandingHeroBlockProps, Media as MediaType } from '@/payload-types'

import Text from '@/components/shared/Text'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { getLinkHref, type LinkData } from '@/utilities/links'
import { landingHeroStyles as s } from './LandingHero.styles'
import { LandingHeroContent } from './LandingHeroContent'
import { RatingStars } from './RatingStars'

const reviewLinkProviderNames: Record<string, string> = {
  Trustpilot: 'Trust Pilot',
}

export const LandingHeroBlock: React.FC<LandingHeroBlockProps> = ({
  eyebrow,
  heading,
  benefits,
  searchPlaceholder,
  pricingLink,
  packagesLink,
  backgroundImage,
  accreditations,
  reviewCards,
  bankCards,
  illustration,
  mobileBadge,
}) => {
  const asMedia = (value: unknown): MediaType | null =>
    value && typeof value === 'object' ? (value as MediaType) : null
  const illustrationVideo = asMedia(illustration?.video)
  const illustrationFallback = asMedia(illustration?.videoFallback)
  const illustrationPoster = asMedia(illustration?.poster)

  return (
    <section className={s.section}>
      {backgroundImage && typeof backgroundImage === 'object' && backgroundImage.url && (
        <div
          className={s.backgroundWrapper}
          style={{
            backgroundImage: `url("${getMediaUrl(backgroundImage.url, backgroundImage.updatedAt)}")`,
          }}
        />
      )}
      <div className={s.overlay} />
      {accreditations && accreditations.length > 0 && (
        <div className={s.accreditations}>
          {accreditations.map((accreditation, index) => {
            const logo = accreditation.logo
            if (!logo || typeof logo !== 'object' || !logo.url) return null

            const href = accreditation.link ? getLinkHref(accreditation.link as LinkData) : null
            const logoClassName =
              accreditation.size === 'lg' ? s.accreditationLogoLg : s.accreditationLogoSm

            const logoImage = (
              <Image
                src={getMediaUrl(logo.url)}
                alt={logo.alt || accreditation.label || ''}
                width={logo.width || 110}
                height={logo.height || 40}
                className={logoClassName}
                unoptimized
              />
            )

            return (
              <div key={accreditation.id ?? index} className={s.accreditationItem}>
                {accreditation.label && (
                  <Text
                    textStyle="body-sm"
                    text={accreditation.label}
                    className={s.accreditationLabel}
                  />
                )}
                {href && href !== '#' ? (
                  <Link
                    href={href}
                    {...(accreditation.link?.newTab
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    {logoImage}
                  </Link>
                ) : (
                  logoImage
                )}
              </div>
            )
          })}
        </div>
      )}
      <div className={s.namecheckSection}>
        <div className={s.container}>
          <div className={s.row}>
            <div className={s.colMain}>
              <LandingHeroContent
                eyebrow={eyebrow}
                heading={heading}
                benefits={benefits}
                searchPlaceholder={searchPlaceholder}
                pricingLink={pricingLink}
                packagesLink={packagesLink}
                badge={
                  mobileBadge && typeof mobileBadge === 'object' && mobileBadge.url
                    ? {
                        src: getMediaUrl(mobileBadge.url),
                        alt: mobileBadge.alt || '',
                        width: mobileBadge.width || 50,
                        height: mobileBadge.height || 84,
                      }
                    : null
                }
              />
            </div>
            <div className={s.colIllustration}>
              {illustrationVideo?.url && (
                <div className={s.illustration}>
                  <video
                    className={s.illustrationVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster={
                      illustrationPoster?.url ? getMediaUrl(illustrationPoster.url) : undefined
                    }
                    aria-label={illustrationVideo.alt || 'Company formation illustration'}
                  >
                    <source src={getMediaUrl(illustrationVideo.url)} type="video/webm" />
                    {illustrationFallback?.url && (
                      <source src={getMediaUrl(illustrationFallback.url)} />
                    )}
                  </video>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {reviewCards && reviewCards.length > 0 && (
        <div className={s.reviewsSection}>
          <div className={s.container}>
            <div className={s.row}>
              <div className={s.colReviews}>
                <div className={s.reviews}>
                  {reviewCards.map((card, index) => {
                    const logo = card.logo
                    const href = card.link ? getLinkHref(card.link as LinkData) : null

                    const cardBody = (
                      <>
                        <div className={s.reviewTop}>
                          {logo && typeof logo === 'object' && logo.url && (
                            <Image
                              src={getMediaUrl(logo.url)}
                              alt={`${card.provider} logo`}
                              width={(logo as MediaType).width || 120}
                              height={(logo as MediaType).height || 30}
                              className={s.reviewLogo}
                              loading="eager"
                              unoptimized
                            />
                          )}
                          <RatingStars
                            score={card.score}
                            maxScore={card.maxScore || '5.0'}
                            provider={card.provider}
                          />
                        </div>
                        <div className={s.reviewBottom}>
                          <Text
                            textStyle="span"
                            text={`${card.reviewCount} reviews`}
                            className={s.reviewCount}
                          />
                          <Text
                            textStyle="span"
                            text={`Rated ${card.score} out of  ${card.maxScore || '5.0'}`}
                            className={s.reviewScore}
                          />
                        </div>
                      </>
                    )

                    if (href && href !== '#') {
                      return (
                        <a
                          key={card.id ?? index}
                          href={href}
                          className={s.reviewCard}
                          aria-label={`Click here to see Rapid Formation reviews on ${reviewLinkProviderNames[card.provider] ?? card.provider}`}
                          {...(card.link?.newTab
                            ? { target: '_blank', rel: 'noopener noreferrer' }
                            : {})}
                        >
                          {cardBody}
                        </a>
                      )
                    }

                    return (
                      <div key={card.id ?? index} className={s.reviewCard}>
                        {cardBody}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {bankCards?.banks && bankCards.banks.length > 0 && (
        <div className={s.bankSection}>
          <div className={s.container}>
            <div className={s.row}>
              <div className={s.col}>
                {bankCards.heading && (
                  <Text
                    as="h2"
                    textStyle="span"
                    text={bankCards.heading}
                    className={s.bankHeading}
                  />
                )}
                <div className={s.bankGrid}>
                  {bankCards.banks.map((bank, index) => {
                    const logo = bank.logo
                    const pattern = bank.backgroundImage
                    const href = bank.link ? getLinkHref(bank.link as LinkData) : null

                    const style: React.CSSProperties = { backgroundColor: bank.brandColour }
                    if (pattern && typeof pattern === 'object' && pattern.url) {
                      style.backgroundImage = `url(${getMediaUrl(pattern.url)})`
                    }

                    const tile = (
                      <>
                        {logo && typeof logo === 'object' && logo.url && (
                          <div className={s.bankLogoTile}>
                            <Image
                              src={getMediaUrl(logo.url)}
                              alt={`${bank.name} logo`}
                              width={32}
                              height={32}
                              className={s.bankLogo}
                              unoptimized
                            />
                          </div>
                        )}
                        <Text textStyle="span" text={bank.name} className={s.bankName} />
                      </>
                    )

                    if (href && href !== '#') {
                      return (
                        <a
                          key={bank.id ?? index}
                          href={href}
                          className={s.bankCard}
                          style={style}
                          {...(bank.link?.newTab
                            ? { target: '_blank', rel: 'noopener noreferrer' }
                            : {})}
                        >
                          {tile}
                        </a>
                      )
                    }

                    return (
                      <div key={bank.id ?? index} className={s.bankCard} style={style}>
                        {tile}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
