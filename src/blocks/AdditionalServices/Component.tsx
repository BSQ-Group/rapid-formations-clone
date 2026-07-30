import React from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import type { AdditionalServicesBlock as AdditionalServicesBlockProps, Page, Post } from '@/payload-types'

import { cn } from '@/utilities/ui'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { additionalServicesStyles as s } from './AdditionalServices.styles'

type CardLink = NonNullable<NonNullable<AdditionalServicesBlockProps['cards']>[number]['link']>

function getLinkHref(link: CardLink): string | null {
  if (link.type === 'reference' && link.reference) {
    const ref = link.reference
    if (typeof ref.value === 'object' && ref.value !== null) {
      const slug = (ref.value as Page | Post).slug
      if (!slug) return null
      return ref.relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
    }
    return null
  }
  return link.url || null
}

type Props = AdditionalServicesBlockProps

export const AdditionalServicesBlock: React.FC<Props> = ({ heading, cards, sectionLayout }) => {
  if (!cards?.length) return null

  return (
    <SectionWrapper {...sectionLayout}>
      <div className={s.section}>
      <div className={s.header}>
        <Text as="h2" textStyle="headline-5xl" text={heading} className={s.heading} />
      </div>

      <div className={s.grid}>
        {cards.map((card, index) => {
          const href = getLinkHref(card.link)
          const newTab = card.link.newTab

          return (
            <div key={card.id ?? index} className={s.card}>
              <div className={s.cardContent}>
                <Text as="h3" textStyle="headline-xl" text={card.title} className={s.cardTitle} />
                <Text textStyle="body-sm" text={card.description} className={s.cardDescription} />
              </div>

              <div className={s.cardFooter}>
                {href && (
                  <Link
                    href={href}
                    className={s.ctaLink}
                    aria-label={`${card.link.label || 'Learn more'} about ${card.title}`}
                    {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <span>{card.link.label || 'Learn more'}</span>
                    <ArrowUpRight size={20} className={cn(s.ctaIcon)} />
                  </Link>
                )}
              </div>
            </div>
          )
        })}
      </div>
      </div>
    </SectionWrapper>
  )
}
