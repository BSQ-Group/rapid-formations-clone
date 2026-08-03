import React from 'react'
import Link from 'next/link'

import type { ServicesTextWithCardBlock as ServicesTextWithCardBlockProps } from '@/payload-types'

import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { Button } from '@/components/ui/button'
import { servicesTextWithCardStyles as s } from './ServicesTextWithCard.styles'

export const ServicesTextWithCardBlock: React.FC<ServicesTextWithCardBlockProps> = ({
  title,
  paragraphs,
  card,
  sectionLayout,
}) => {
  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <div className={s.textCol}>
        {title && (
          <Text text={title} as="h2" textStyle="headline-5xl" className={s.title} />
        )}
        {paragraphs && paragraphs.length > 0 && (
          <div className={s.paragraphs}>
            {paragraphs.map((p) => (
              <Text key={p.id} text={p.text} textStyle="body-base" className={s.paragraph} />
            ))}
          </div>
        )}
      </div>
      <div className={s.card}>
        <div className={s.cardDescription}>
          <div className={s.cardPriceGroup}>
            {card?.price && (
              <Text
                text={card.price}
                textStyle="headline-3xl"
                asChild
                className={s.cardPrice}
              >
                <span />
              </Text>
            )}
            {card?.subtitle && (
              <Text
                text={card.subtitle}
                textStyle="body-base"
                asChild
                className={s.cardSubtitle}
              >
                <span />
              </Text>
            )}
          </div>
          {card?.serviceLabel && (
            <Text
              text={card.serviceLabel}
              textStyle="body-lg"
              asChild
              className={s.cardServiceLabel}
            >
              <span />
            </Text>
          )}
        </div>
        {card?.cta && (() => {
          const ref = card.cta.reference
          const refValue = ref?.value
          let refHref: string | null | undefined
          if (card.cta.type === 'reference' && typeof refValue === 'object' && refValue !== null) {
            const fullPath = 'fullPath' in refValue ? refValue.fullPath : undefined
            const slug = 'slug' in refValue ? refValue.slug : undefined
            refHref =
              fullPath ||
              (slug ? `${ref?.relationTo === 'posts' ? '/posts' : ''}/${slug}` : undefined)
          }
          const href = card.cta.type === 'reference' ? refHref : card.cta.url
          if (!href) return null
          return (
            <Link
              href={href}
              className={s.cardCta}
              {...(card.cta.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <Button variant="primary" size="lg" className="w-full">
                {card.cta.label || 'Order now'}
              </Button>
            </Link>
          )
        })()}
      </div>
    </SectionWrapper>
  )
}
