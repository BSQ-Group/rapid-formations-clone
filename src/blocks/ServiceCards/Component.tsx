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
  const isLegacy = !(groups && groups.length > 0) && Array.isArray(cards) && cards.length > 0
  const resolvedGroups: Group[] = groups && groups.length > 0
    ? groups
    : isLegacy
      ? [{ id: 'legacy', cards } as Group]
      : []

  if (resolvedGroups.length === 0) return null

  const sectionClass = isLegacy ? s.sectionLegacy : s.section
  const titleClass = isLegacy ? s.titleLegacy : s.title
  const titleStyle = isLegacy ? 'headline-4xl' : 'span'

  return (
    <SectionWrapper {...sectionLayout}>
      <div className={sectionClass}>
        {title && <Text text={title} as="h2" textStyle={titleStyle} className={titleClass} />}
        <div className={s.groupsList}>
          {resolvedGroups.map((group) => {
            const groupCards = group.cards ?? []
            if (groupCards.length === 0) return null
            const isMultiUp = !isLegacy && groupCards.length >= 3
            const cardsListClass = isLegacy
              ? s.cardsListLegacy
              : isMultiUp
                ? s.cardsListMultiUp
                : s.cardsListTwoUp
            const cardClass = isMultiUp ? s.cardMultiUp : s.cardTwoUp
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
