import React from 'react'

import type { ReviewStat } from '@/payload-types'

import { SnapCarousel } from '@/components/shared/SnapCarousel/SnapCarousel'
import Text from '@/components/shared/Text'
import { oneDecimal } from '@/utilities/formatting'
import { reviewCentreTabsStyles as s } from './ReviewCentreTabs.styles'

type Platform = NonNullable<ReviewStat['platforms']>[number]

export type RatingsBannerProps = {
  heading: string
  platforms: Platform[]
}

/**
 * The overview tab: every platform's score laid across one cyan band, each pane
 * linking out to that platform's reviews. It is the same banner the provider tabs
 * open on, carrying the whole set rather than a single platform.
 */
export const RatingsBanner: React.FC<RatingsBannerProps> = ({ heading, platforms }) => (
  <div className={s.ratingsBanner}>
    <Text as="h3" textStyle="span" text={heading} className={s.ratingsHeading} />
    <div className={s.ratingsCarousel}>
      <SnapCarousel
        label={heading}
        className={s.ratingsTrack}
        slideClassName={s.ratingsSlide}
        arrowsClassName={s.ratingsArrows}
        arrows
        persistentArrows
        dots={false}
      >
        {platforms.map((platform) => (
          <a
            key={platform.id ?? platform.provider}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className={s.pane}
          >
            <Text as="span" textStyle="span" text={platform.provider} className={s.paneProvider} />
            <Text
              as="span"
              textStyle="span"
              text={oneDecimal(platform.score)}
              className={s.paneScore}
            />
            <Text
              as="span"
              textStyle="span"
              text={`out of ${oneDecimal(platform.maxScore)}`}
              className={s.paneMaxScore}
            />
            <Text
              as="span"
              textStyle="span"
              text={`${platform.totalReviews} reviews`}
              className={s.paneTotal}
            />
          </a>
        ))}
      </SnapCarousel>
    </div>
  </div>
)
