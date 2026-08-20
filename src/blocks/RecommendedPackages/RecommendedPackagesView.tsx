import React from 'react'
import Link from 'next/link'
import { faChevronRight } from '@fortawesome/pro-regular-svg-icons/faChevronRight'

import type { RecommendedPackagesBlock } from '@/payload-types'

import RichText from '@/components/RichText'
import { Container } from '@/components/shared/Container/Container'
import { CtaLink } from '@/components/shared/CtaLink'
import { FaIcon } from '@/components/shared/FaIcon'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { cn } from '@/utilities/ui'
import { recommendedPackagesStyles as s } from './RecommendedPackages.styles'

export type RecommendedPackage = NonNullable<RecommendedPackagesBlock['packages']>[number]

export type RecommendedPackageCard = {
  card: RecommendedPackage
  href: string
  price?: string | null
  align?: 'start' | 'end'
}

export const RecommendedPackagesCard: React.FC<RecommendedPackageCard> = ({
  card,
  href,
  price,
  align,
}) => (
  <div className={cn(s.card, align === 'start' && s.cardStart, align === 'end' && s.cardEnd)}>
    <div className={s.cardHeader}>
      <Text textStyle="span" className={s.name} asChild>
        <h3>
          <Link href={href} className={s.nameLink}>
            {card.name}
          </Link>
        </h3>
      </Text>
      <div className={s.prices}>
        {price && <Text textStyle="span" text={`£${price}`} className={s.price} />}
        {card.priceNote && <Text textStyle="span" text={card.priceNote} className={s.priceNote} />}
      </div>
    </div>
    <div className={s.description}>
      {card.recommendedLabel && (
        <Text asChild textStyle="span" className={s.label}>
          <b>{card.recommendedLabel}</b>
        </Text>
      )}
      <RichText
        data={card.content}
        enableGutter={false}
        enableProse={false}
        className={s.content}
        listItemIcon={<FaIcon icon={faChevronRight} className={s.contentIcon} />}
      />
    </div>
    {card.cta?.label && (
      <CtaLink
        href={href}
        label={card.cta.label}
        newTab={card.cta.newTab}
        tone="success"
        size="md"
        block
        className={s.cta}
      />
    )}
    {card.ribbonText && (
      <div className={s.ribbon}>
        <Text textStyle="span" text={card.ribbonText} className={s.ribbonLabel} />
      </div>
    )}
  </div>
)

export type RecommendedPackagesViewProps = {
  heading?: string | null
  subheading?: string | null
  cards?: Omit<RecommendedPackageCard, 'align'>[]
  sectionLayout?: RecommendedPackagesBlock['sectionLayout']
}

export const RecommendedPackagesView: React.FC<RecommendedPackagesViewProps> = ({
  heading,
  subheading,
  cards = [],
  sectionLayout,
}) => {
  if (!cards.length) return null

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container>
        <div className={s.inner}>
          <div className={s.header}>
            <Text as="h2" textStyle="span" text={heading ?? undefined} className={s.heading} />
            {subheading && (
              <Text as="p" textStyle="span" text={subheading} className={s.subheading} />
            )}
          </div>
          <div className={s.grid}>
            {cards.map((entry, index) => (
              <RecommendedPackagesCard
                key={entry.card.id ?? index}
                {...entry}
                align={cards.length === 2 ? (index === 0 ? 'end' : 'start') : undefined}
              />
            ))}
          </div>
        </div>
      </Container>
    </SectionWrapper>
  )
}
