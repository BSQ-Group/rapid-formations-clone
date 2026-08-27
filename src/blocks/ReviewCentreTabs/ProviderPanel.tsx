import React from 'react'

import type { ReviewStat } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { FaIcon } from '@/components/shared/FaIcon'
import { Media } from '@/components/Media'
import { RatingStars } from '@/components/shared/RatingStars'
import Text from '@/components/shared/Text'
import { faArrowRight } from '@fortawesome/pro-solid-svg-icons/faArrowRight'
import { faExternalLink } from '@fortawesome/pro-solid-svg-icons/faExternalLink'
import { ReviewCard, type ReviewCardProps } from './ReviewCard'
import { reviewCentreTabsStyles as s } from './ReviewCentreTabs.styles'

type Platform = NonNullable<ReviewStat['platforms']>[number]

export type ProviderPanelProps = {
  platform: Platform
  reviews: ReviewCardProps[]
  reviewsHeading?: string | null
  readAllLabel: string
  readAllTileLabel: string
}

export const ProviderPanel: React.FC<ProviderPanelProps> = ({
  platform,
  reviews,
  reviewsHeading,
  readAllLabel,
  readAllTileLabel,
}) => {
  const natural = typeof platform.logo === 'object' ? (platform.logo?.width ?? 0) : 0
  const logoWidth = natural > 0 ? Math.min(natural, s.logoMaxWidth) : s.logoMaxWidth

  return (
    <>
      <div className={s.banner}>
        <Container className={s.wrapperPad}>
          <Text
            as="h2"
            textStyle="span"
            text={`Our ${platform.provider} reviews`}
            className={s.bannerTitle}
          />
          <div className={s.bannerRow}>
            <Text
              as="span"
              textStyle="span"
              text={String(platform.score)}
              className={s.bannerScore}
            />
            <RatingStars
              score={platform.score}
              maxScore={platform.maxScore}
              provider={platform.provider}
              size="xl"
              tone="light"
              className={s.bannerStars}
            />
            <Text
              as="span"
              textStyle="span"
              text={`${platform.totalReviews} reviews`}
              className={s.bannerTotal}
            />
            <a href={platform.url} target="_blank" rel="noreferrer" className={s.bannerLink}>
              {readAllLabel}
              <FaIcon icon={faExternalLink} className={s.bannerLinkIcon} />
            </a>
          </div>
        </Container>
      </div>
      <div className={s.reviews}>
        <Container className={s.wrapperPad}>
          <div className={s.logoWrap}>
            <div className={s.logoFrame} style={{ width: logoWidth }}>
              <Media
                resource={platform.logo}
                htmlElement={null}
                imgClassName={s.logo}
                size={`${logoWidth}px`}
                alt={`${platform.provider} logo`}
              />
            </div>
          </div>
          {reviewsHeading?.trim() && (
            <Text as="p" textStyle="span" text={reviewsHeading} className={s.reviewsHeading} />
          )}
          <div className={s.grid}>
            {reviews.map((review) => (
              <div key={`${review.provider}-${review.authorName}-${review.age}`} className={s.cell}>
                <ReviewCard {...review} />
              </div>
            ))}
            <div className={s.cell}>
              <a href={platform.url} target="_blank" rel="noreferrer" className={s.readAll}>
                {readAllTileLabel}
                <FaIcon icon={faArrowRight} className={s.readAllIcon} />
              </a>
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}
