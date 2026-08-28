import React from 'react'

import type { Media as MediaType } from '@/payload-types'

import { Media } from '@/components/Media'
import { RatingStars } from '@/components/shared/RatingStars'
import type { RatingStarSize, RatingStarTone } from '@/components/shared/RatingStars'
import Text from '@/components/shared/Text'
import { oneDecimal } from '@/utilities/formatting'
import { cn } from '@/utilities/ui'
import { reviewStatCardStyles as s } from './ReviewStatCard.styles'

export type ReviewStatCardProps = {
  provider: string
  logo?: MediaType | string | number | null
  score: number
  maxScore?: number
  totalReviews: string
  url?: string | null
  tone?: RatingStarTone
  starSize?: RatingStarSize
  className?: string
}

export const ReviewStatCard: React.FC<ReviewStatCardProps> = ({
  provider,
  logo,
  score,
  maxScore = 5,
  totalReviews,
  url,
  tone = 'default',
  starSize = 'md',
  className,
}) => {
  const body = (
    <>
      {logo && (
        <span className={s.logoWrap}>
          <Media
            resource={logo}
            alt={`Logo for ${provider}.`}
            htmlElement={null}
            imgClassName={s.logo}
            width={200}
            height={68}
          />
        </span>
      )}
      <RatingStars
        score={score}
        maxScore={maxScore}
        provider={provider}
        size={starSize}
        tone={tone}
        className={s.stars}
      />
      <Text as="p" textStyle="span" className={s.rating}>
        Rated <strong className={s.ratingScore}>{oneDecimal(score)}</strong> out of{' '}
        {oneDecimal(maxScore)}
      </Text>
      <Text as="p" textStyle="span" text={`${totalReviews} reviews`} className={s.reviews} />
    </>
  )

  if (!url) return <div className={cn(s.card, className)}>{body}</div>

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={cn(s.card, className)}>
      {body}
    </a>
  )
}

export default ReviewStatCard
