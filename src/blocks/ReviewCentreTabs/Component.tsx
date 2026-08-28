import React, { cache } from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type {
  ReviewCentreTabsBlock as ReviewCentreTabsBlockProps,
  ReviewStat,
} from '@/payload-types'

import { initialsOf, relativeAge } from '@/utilities/formatting'
import { toKebabCase } from '@/utilities/toKebabCase'
import { ProviderPanel } from './ProviderPanel'
import { RatingsBanner } from './RatingsBanner'
import type { ReviewCardProps } from './ReviewCard'
import type { TabDefinition } from './ReviewCentreTabsClient'
import { ReviewCentreTabsClient } from './ReviewCentreTabsClient'

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

  // One query per provider, matched on the normalised key the collection maintains.
  // A single pooled query let whichever provider had the newest reviews eat the shared
  // limit, so a quieter provider's panel came up short or empty. Matching on the key
  // rather than the display spelling also means re-casing a platform in Review Stats
  // does not orphan the reviews already saved against it — `like` cannot stand in here,
  // it compiles to an unanchored case-insensitive regex, so "Google" would also drag in
  // a review saved as "Google Business".
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
          where: { providerKey: { equals: platform.provider.trim().toLowerCase() } },
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

  // Two tabs can carry the same label, and toKebabCase would hand both the same id —
  // duplicate React keys, two elements answering to one DOM id, and a deep link that
  // could only ever reach the first of the pair.
  const taken = new Map<string, number>()
  const uniqueId = (label: string) => {
    const base = toKebabCase(label)
    const seen = taken.get(base) ?? 0
    taken.set(base, seen + 1)
    return seen ? `${base}-${seen + 1}` : base
  }

  const built: TabDefinition[] = defined.flatMap((tab) => {
    if (tab.panel === 'ratings') {
      if (!shown.length) return []
      return [
        {
          id: uniqueId(tab.label),
          label: tab.label,
          content: <RatingsBanner heading={tab.heading ?? 'How we are rated'} platforms={shown} />,
        },
      ]
    }

    const platform = providerOf(tab.provider)
    if (!platform) return []

    return [
      {
        id: uniqueId(tab.label),
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
