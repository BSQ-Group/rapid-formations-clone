'use client'

import React, { useState } from 'react'

import { RatingStars } from '@/components/shared/RatingStars'
import Text from '@/components/shared/Text'
import { reviewCentreTabsStyles as s } from './ReviewCentreTabs.styles'

const EXCERPT_WORDS = 20

export type ReviewCardProps = {
  id: string
  authorName: string
  initials: string
  score: number
  age: string
  body: string
  tone?: React.ComponentProps<typeof RatingStars>['tone']
  provider: string
  readMoreLabel?: string
  readLessLabel?: string
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  id,
  authorName,
  initials,
  score,
  age,
  body,
  tone,
  provider,
  readMoreLabel = '... Read More',
  readLessLabel = 'Read Less',
}) => {
  const [expanded, setExpanded] = useState(false)
  const words = body.split(' ')
  const truncates = words.length > EXCERPT_WORDS

  return (
    <div className={s.card}>
      <div className={s.avatar}>
        <Text textStyle="span" className={s.avatarText}>
          {initials}
        </Text>
      </div>
      <div>
        <Text as="p" textStyle="span" className={s.cardName}>
          {authorName}
        </Text>
        <div className={s.cardMeta}>
          <RatingStars
            score={score}
            provider={provider}
            size="xs"
            tone={tone}
            className={s.cardStars}
          />
          <Text as="span" textStyle="span" text={age} className={s.cardDate} />
        </div>
        {/* Children, not `text` — that path runs the copy through sanitizeHtml and
            dangerouslySetInnerHTML, which is not where reviewer-authored text belongs. */}
        <Text as="p" textStyle="span" id={`review-body-${id}`} className={s.cardBody}>
          {expanded || !truncates ? body : words.slice(0, EXCERPT_WORDS).join(' ')}
        </Text>
        {truncates && (
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-controls={`review-body-${id}`}
            className={s.cardToggle}
          >
            {expanded ? readLessLabel : readMoreLabel}
          </button>
        )}
      </div>
    </div>
  )
}
