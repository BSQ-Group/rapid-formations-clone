import React from 'react'

import { cn } from '@/utilities/ui'
import {
  ratingStarsStyles as s,
  type RatingStarSize,
  type RatingStarTone,
} from './RatingStars.styles'

export {
  RATING_STAR_SIZES,
  RATING_STAR_TONES,
  type RatingStarSize,
  type RatingStarTone,
} from './RatingStars.styles'

const Star = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 51 48" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path
      fill="currentColor"
      d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
    />
  </svg>
)

interface RatingStarsProps {
  score: string | number
  maxScore?: string | number
  provider?: string
  size?: RatingStarSize
  tone?: RatingStarTone
  className?: string
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  score,
  maxScore = 5,
  provider,
  size = 'md',
  tone = 'default',
  className,
}) => {
  const max = Math.max(1, Math.round(Number(maxScore) || 5))
  const value = Math.min(Math.max(Number(score) || 0, 0), max)
  const pct = (value / max) * 100

  const row = (colour: string) => (
    <div className={s.row} aria-hidden>
      {Array.from({ length: max }).map((_, i) => (
        <Star key={i} className={cn(s.star, s.size[size], colour)} />
      ))}
    </div>
  )

  return (
    <div
      className={cn(s.wrap, className)}
      role="img"
      aria-label={
        provider ? `Rated ${value} out of ${max} on ${provider}` : `Rated ${value} out of ${max}`
      }
    >
      {row(s.starEmpty)}
      <div className={s.fill} style={{ width: `${pct}%` }}>
        {row(s.tone[tone])}
      </div>
    </div>
  )
}

export default RatingStars
