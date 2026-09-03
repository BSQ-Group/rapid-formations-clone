import React from 'react'
import Link from 'next/link'

import type { ChooseCompanyStructureBlock as ChooseCompanyStructureBlockProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { CtaLink } from '@/components/shared/CtaLink'
import { Media } from '@/components/Media'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import { SnapCarousel } from '@/components/shared/SnapCarousel/SnapCarousel'
import Text from '@/components/shared/Text'
import { getLinkHref, type LinkData } from '@/utilities/links'
import { chooseCompanyStructureStyles as s } from './ChooseCompanyStructure.styles'

type Props = ChooseCompanyStructureBlockProps

export const ChooseCompanyStructureBlock: React.FC<Props> = ({ heading, cards, sectionLayout }) => {
  if (!cards?.length) return null

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container>
        <Text as="h2" textStyle="span" text={heading} className={s.heading} />
        <SnapCarousel
          as="ul"
          label={heading ?? 'Company structures'}
          className={s.track}
          slideClassName={s.slide}
        >
          {cards.map((card, index) => {
            const href = getLinkHref(card.link as LinkData | undefined)
            return (
              <div key={card.id ?? index} className={s.card}>
                {card.image && typeof card.image === 'object' && (
                  <Link href={href} tabIndex={-1} aria-hidden className={s.imageWrap}>
                    <Media
                      resource={card.image}
                      alt={card.title}
                      imgClassName={s.image}
                      size="(min-width: 1025px) 33vw, (min-width: 768px) 80vw, 100vw"
                    />
                  </Link>
                )}
                <div className={s.copy}>
                  <Text as="h3" textStyle="span" className={s.title}>
                    <Link href={href} className={s.titleLink}>
                      {card.title}
                    </Link>
                  </Text>
                  <Text as="p" textStyle="span" text={card.body} className={s.body} />
                  {card.link?.label && (
                    <div className={s.ctaGroup}>
                      <CtaLink
                        href={href}
                        label={card.link.label}
                        newTab={card.link.newTab}
                        size="md"
                        tone="cyan"
                        block
                        className={s.cta}
                      />
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </SnapCarousel>
      </Container>
    </SectionWrapper>
  )
}
