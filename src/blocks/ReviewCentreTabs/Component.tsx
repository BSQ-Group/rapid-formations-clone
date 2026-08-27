import React, { cache } from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type {
  ReviewCentreTabsBlock as ReviewCentreTabsBlockProps,
  ReviewStat,
} from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { ReviewRatingsTrack } from '@/blocks/ReviewRatings/ReviewRatingsTrack'
import Text from '@/components/shared/Text'
import { initialsOf, relativeAge } from '@/utilities/formatting'
import { toKebabCase } from '@/utilities/toKebabCase'
import { ProviderPanel } from './ProviderPanel'
import type { ReviewCardProps } from './ReviewCard'
import type { TabDefinition } from './ReviewCentreTabsClient'
import { ReviewCentreTabsClient } from './ReviewCentreTabsClient'
import { reviewCentreTabsStyles as s } from './ReviewCentreTabs.styles'

type Platform = NonNullable<ReviewStat['platforms']>[number]

const requestNow = cache(() => new Date().getTime())

export const ReviewCentreTabsBlockComponent: React.FC<ReviewCentreTabsBlockProps> = async ({
  tabs,
  reviewsHeading,
  reviewsPerProvider,
  readAllLabel,
  readAllTileLabel,
}) => {
  const defined = tabs ?? []

  if (!defined.length) return null

  const payload = await getPayload({ config: configPromise })
  const { platforms } = await payload.findGlobal({ slug: 'reviewStats' })
  const shown = (platforms ?? []).filter((platform) => platform.show !== false)

  const providerOf = (name?: string | null): Platform | undefined =>
    shown.find((platform) => platform.provider.toLowerCase() === (name ?? '').trim().toLowerCase())

  const wanted = defined
    .filter((tab) => tab.panel === 'provider')
    .map((tab) => (tab.provider ?? '').trim())
    .filter(Boolean)

  const perProvider = reviewsPerProvider ?? 5

  const reviews = wanted.length
    ? (
        await payload.find({
          collection: 'reviews',
          where: { provider: { in: wanted } },
          sort: ['-reviewDate', 'createdAt'],
          limit: wanted.length * perProvider,
          depth: 0,
        })
      ).docs
    : []

  const now = requestNow()
  const label = readAllLabel?.trim() || 'Read All Reviews'
  const tileLabel = readAllTileLabel?.trim() || 'Read all reviews'

  const cardsFor = (platform: Platform): ReviewCardProps[] =>
    reviews
      .filter((review) => review.provider.toLowerCase() === platform.provider.toLowerCase())
      .slice(0, perProvider)
      .map((review) => ({
        authorName: review.authorName,
        initials: initialsOf(review.authorName),
        score: review.score,
        age: relativeAge(review.reviewDate, now),
        body: review.body,
        provider: platform.provider,
      }))

  const built: TabDefinition[] = defined.flatMap((tab) => {
    const id = toKebabCase(tab.label)

    if (tab.panel === 'ratings') {
      if (!shown.length) return []
      return [
        {
          id,
          label: tab.label,
          content: (
            <Container>
              <Text
                as="h2"
                textStyle="span"
                text={tab.heading ?? 'How we are rated'}
                className={s.ratingsHeading}
              />
              <ReviewRatingsTrack platforms={shown} />
            </Container>
          ),
        },
      ]
    }

    const platform = providerOf(tab.provider)
    if (!platform) return []

    return [
      {
        id,
        label: tab.label,
        content: (
          <ProviderPanel
            platform={platform}
            reviews={cardsFor(platform)}
            reviewsHeading={reviewsHeading}
            readAllLabel={label}
            readAllTileLabel={tileLabel}
          />
        ),
      },
    ]
  })

  if (!built.length) return null

  return <ReviewCentreTabsClient tabs={built} />
}
