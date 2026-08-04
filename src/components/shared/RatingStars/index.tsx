import React from 'react'

import { cn } from '@/utilities/ui'
import { ratingStarsStyles as s } from './RatingStars.styles'

const Star = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 25 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path
      fill="currentColor"
      d="M12.14.27a.44.44 0 0 1 .76 0l2.74 8.18a.44.44 0 0 0 .38.27l8.62.08c.39 0 .55.49.24.72l-6.93 5.13a.44.44 0 0 0-.14.44l2.59 8.23c.12.37-.3.67-.61.44l-7.02-5.01a.44.44 0 0 0-.46 0l-7.03 5.01c-.31.22-.73-.07-.61-.44l2.59-8.23a.44.44 0 0 0-.14-.44L.16 9.52c-.31-.23-.15-.72.23-.72l8.63-.08a.44.44 0 0 0 .38-.27L12.14.27Z"
    />
  </svg>
)

interface RatingStarsProps {
  score: string | number
  maxScore?: string | number
  provider: string
  className?: string
  starClassName?: string
  filledClassName?: string
  emptyClassName?: string
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  score,
  maxScore = 5,
  provider,
  className,
  starClassName,
  filledClassName,
  emptyClassName,
}) => {
  const max = Math.max(1, Math.round(Number(maxScore) || 5))
  const value = Math.min(Math.max(Number(score) || 0, 0), max)
  const pct = (value / max) * 100

  const row = (colour: string) => (
    <div className={s.row} aria-hidden>
      {Array.from({ length: max }).map((_, i) => (
        <Star key={i} className={cn(s.star, starClassName, colour)} />
      ))}
    </div>
  )

  return (
    <div
      className={cn(s.wrap, className)}
      role="img"
      aria-label={`Rated ${value} out of ${max} on ${provider}`}
    >
      {row(cn(s.starEmpty, emptyClassName))}
      <div className={s.fill} style={{ width: `${pct}%` }}>
        {row(cn(s.starFilled, filledClassName))}
      </div>
    </div>
  )
}
