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

  const perProvider = reviewsPerProvider ?? 5

  // One query per provider, keyed on the platform's own spelling rather than the tab's
  // free text. A single pooled query let whichever provider had the newest reviews eat
  // the shared limit, so a quieter provider's panel came up short or empty, and its
  // `in` filter matched case-sensitively while every comparison around it did not.
  const platformsWanted = [
    ...new Map(
      defined
        .filter((tab) => tab.panel === 'provider')
        .map((tab) => providerOf(tab.provider))
        .filter((platform): platform is Platform => Boolean(platform))
        .map((platform) => [platform.provider, platform] as const),
    ).values(),
  ]

  const byProvider = new Map(
    await Promise.all(
      platformsWanted.map(async (platform) => {
        const { docs } = await payload.find({
          collection: 'reviews',
          where: { provider: { equals: platform.provider } },
          sort: ['-reviewDate', 'createdAt'],
          limit: perProvider,
          depth: 0,
        })
        return [platform.provider, docs] as const
      }),
    ),
  )

  const now = requestNow()
  const label = readAllLabel?.trim() || 'Read All Reviews'
  const tileLabel = readAllTileLabel?.trim() || 'Read all reviews'

  const cardsFor = (platform: Platform): ReviewCardProps[] =>
    (byProvider.get(platform.provider) ?? []).map((review) => ({
      id: String(review.id),
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
