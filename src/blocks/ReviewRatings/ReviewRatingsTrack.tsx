import React from 'react'

import type { ReviewStat } from '@/payload-types'

import { ReviewStatCard } from '@/components/shared/ReviewStatCard'
import { SnapCarousel } from '@/components/shared/SnapCarousel/SnapCarousel'
import { reviewRatingsStyles as s } from './ReviewRatings.styles'

type Platform = NonNullable<ReviewStat['platforms']>[number]

export const ReviewRatingsTrack: React.FC<{ platforms: Platform[] }> = ({ platforms }) => (
  <div className={s.trackWrap}>
    <SnapCarousel label="Customer review ratings" className={s.track} slideClassName={s.slide}>
      {platforms.map((platform) => (
        <ReviewStatCard
          key={platform.id ?? platform.provider}
          provider={platform.provider}
          logo={platform.logo}
          score={platform.score}
          maxScore={platform.maxScore}
          totalReviews={platform.totalReviews}
          url={platform.url}
          tone={platform.starTone}
        />
      ))}
    </SnapCarousel>
  </div>
)
