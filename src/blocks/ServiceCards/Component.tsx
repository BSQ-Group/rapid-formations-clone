import React from 'react'
import Link from 'next/link'

import type { ServiceCardsBlock as ServiceCardsBlockProps } from '@/payload-types'

import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { buttonVariants } from '@/components/ui/button'
import { LucideIcon } from '@/components/shared/LucideIcon/LucideIcon'
import { cn } from '@/utilities/ui'
import { serviceCardsStyles as s } from './ServiceCards.styles'

type Group = NonNullable<ServiceCardsBlockProps['groups']>[number]
type Card = NonNullable<Group['cards']>[number]
type OrderLink = NonNullable<Card['orderLink']>

function resolveLinkHref(link: OrderLink): string | null {
  if (link.type === 'reference' && link.reference) {
    const ref = link.reference
    const value = ref.value
    const slug = typeof value === 'object' && value !== null ? value.slug : null
    if (!slug) return null
    return ref.relationTo === 'pages' ? `/${slug}` : `/${ref.relationTo}/${slug}`
  }
  return link.url || null
}

type CardTitleTag = 'h3' | 'h4'

function ServiceCard({
  card,
  cardClass,
  priceColClass,
  priceClass,
  titleTag,
  isLegacy,
}: {
  card: Card
  cardClass: string
  priceColClass: string
  priceClass: string
  titleTag: CardTitleTag
  isLegacy: boolean
}) {
  const href = card.orderLink ? resolveLinkHref(card.orderLink) : null
  const label = card.orderLink?.label || 'Order'
  const newTabProps = card.orderLink?.newTab
    ? { rel: 'noopener noreferrer', target: '_blank' as const }
    : {}

  return (
    <div className={cardClass}>
      <div className={s.iconTile}>
        <LucideIcon name={card.icon || 'badge-check'} size={24} className={s.iconSvg} />
      </div>

      <div className={s.body}>
        <div className={s.textCol}>
          {/* Legacy path keeps the responsive headline-3xl / body-base
              presets so /confirmation-statement + /renewals (pre-data-
              migration) render unchanged. New groups path uses
              textStyle="span" + flat-per-viewport sizes so Figma's
              heading-300 / body-300 tokens match exactly. */}
          <Text
            text={card.title}
            as={titleTag}
            textStyle={isLegacy ? 'headline-3xl' : 'span'}
            className={isLegacy ? s.cardTitleLegacy : s.cardTitle}
          />
          <Text
            text={card.description}
            textStyle={isLegacy ? 'body-base' : 'span'}
            className={isLegacy ? s.descriptionLegacy : s.description}
          />
        </div>

        <div className={priceColClass}>
          <Text text={card.price} textStyle="span" className={priceClass} />
          {href && (
            <Link
              href={href}
              className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), s.orderBtn)}
              {...newTabProps}
            >
              {label}
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export const ServiceCardsBlock: React.FC<ServiceCardsBlockProps> = ({
  title,
  groups,
  cards,
  sectionLayout,
}) => {
  // Backwards compatibility: if `groups` is empty, render the legacy
  // top-level `cards` field as a single anonymous group with the
  // pre-CORE-3571 single-row layout preserved (so production doesn't
  // visually shift the moment this lands — the count-driven layout
  // applies only to content authored under the new Groups field).
  // Remove the fallback in a follow-up PR once all pages are migrated.
  const isLegacy = !(groups && groups.length > 0) && Array.isArray(cards) && cards.length > 0
  const resolvedGroups: Group[] = groups && groups.length > 0
    ? groups
    : isLegacy
      ? [{ id: 'legacy', cards } as Group]
      : []

  if (resolvedGroups.length === 0) return null

  // Legacy fallback path must render identically to pre-CORE-3571 prod —
  // keep the legacy section/title styles so /confirmation-statement and
  // /renewals (still on `cards[]` data) don't visually shift on merge.
  const sectionClass = isLegacy ? s.sectionLegacy : s.section
  const titleClass = isLegacy ? s.titleLegacy : s.title
  // Legacy keeps the auto-scaling headline-4xl preset (pre-CORE-3571
  // behaviour). The new groups path uses textStyle="span" + a fixed
  // 48px / 56px / 800 title at every viewport to match Figma's
  // heading-500 token, which doesn't scale down on smaller breakpoints.
  const titleStyle = isLegacy ? 'headline-4xl' : 'span'

  return (
    <SectionWrapper {...sectionLayout}>
      <div className={sectionClass}>
        {title && <Text text={title} as="h2" textStyle={titleStyle} className={titleClass} />}

        <div className={s.groupsList}>
          {resolvedGroups.map((group) => {
            const groupCards = group.cards ?? []
            if (groupCards.length === 0) return null
            // Count-driven layout: 1 card = full-width (treated like 2-up,
            // single flex-1 child takes the whole row); 2 cards = 2-up
            // side-by-side; 3+ cards = multi-up grid. Legacy fallback uses
            // the pre-CORE-3571 single-row layout (all cards flex-1).
            const isMultiUp = !isLegacy && groupCards.length >= 3
            const cardsListClass = isLegacy
              ? s.cardsListLegacy
              : isMultiUp
                ? s.cardsListMultiUp
                : s.cardsListTwoUp
            const cardClass = isMultiUp ? s.cardMultiUp : s.cardTwoUp
            // Multi-up cards are narrower than 2-up/legacy at lg+ — keep
            // price + button stacked at lg+ so the price text doesn't wrap.
            const priceColClass = isMultiUp ? s.priceColMultiUp : s.priceCol
            const priceClass = isMultiUp ? s.priceMultiUp : s.price
            const cardTitleTag: CardTitleTag = group.subtitle ? 'h4' : 'h3'

            return (
              <div key={group.id} className={s.group}>
                {group.subtitle && (
                  <Text
                    text={group.subtitle}
                    as="h3"
                    textStyle="headline-2xl"
                    className={s.groupSubtitle}
                  />
                )}

                <div className={cardsListClass}>
                  {groupCards.map((card) => (
                    <ServiceCard
                      key={card.id}
                      card={card}
                      cardClass={cardClass}
                      priceColClass={priceColClass}
                      priceClass={priceClass}
                      titleTag={cardTitleTag}
                      isLegacy={isLegacy}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </SectionWrapper>
  )
}
