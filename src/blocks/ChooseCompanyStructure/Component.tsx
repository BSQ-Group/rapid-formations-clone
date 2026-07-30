import React from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import type { ChooseCompanyStructureBlock as ChooseCompanyStructureBlockProps } from '@/payload-types'

import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { Media } from '@/components/Media'
import { ScrollCarousel } from '@/components/shared/ScrollCarousel'
import { getLinkHref } from '@/utilities/links'
import { chooseCompanyStructureStyles as s } from './ChooseCompanyStructure.styles'

type Props = ChooseCompanyStructureBlockProps

export const ChooseCompanyStructureBlock: React.FC<Props> = ({
  heading,
  description,
  cards,
  sectionLayout,
}) => {
  if (!cards?.length) return null

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <div className={s.header}>
        {heading && <Text as="h2" textStyle="headline-5xl" text={heading} className={s.heading} />}
        {description && (
          <Text as="p" textStyle="body-base" text={description} className={s.description} />
        )}
      </div>
      <ScrollCarousel maxWidth="max-w-[1200px]" bleedRight arrowsClassName="hidden xl:flex">
        {cards.map((card, index) => {
          const href = getLinkHref(card.link)
          const hasImage = card.image && typeof card.image === 'object'
          return (
            <Link key={card.id ?? index} href={href} className={s.card}>
              {hasImage && (
                <div className={s.cardImageWrapper}>
                  <Media resource={card.image} alt={card.title} fill imgClassName={s.cardImage} />
                </div>
              )}
              <div className={s.cardText}>
                <div className={s.cardTitleRow}>
                  <Text textStyle="body-base" text={card.title} className={s.cardTitle} />
                  <ArrowUpRight className={s.cardArrow} size={24} />
                </div>
                {card.cardDescription && (
                  <Text
                    textStyle="body-sm"
                    text={card.cardDescription}
                    className={s.cardDescription}
                  />
                )}
              </div>
            </Link>
          )
        })}
      </ScrollCarousel>
    </SectionWrapper>
  )
}
