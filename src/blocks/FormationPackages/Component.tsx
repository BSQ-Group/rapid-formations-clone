import React from 'react'
import Link from 'next/link'

import type {
  FormationPackagesBlock as FormationPackagesBlockProps,
  ComparePackagesBlock as ComparePackagesBlockProps,
} from '@/payload-types'

import { cn } from '@/utilities/ui'
import { Button } from '@/components/ui/button'
import RichText from '@/components/RichText'
import Text from '@/components/shared/Text'
import { PackageCard } from '@/components/shared/PackageCard'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import { PackageCardsCarousel } from './PackageCardsCarousel'
import { CombinedPlansCarousel } from '@/blocks/ComparePackages/CombinedPlansCarousel'
import { normalizeSections } from '@/blocks/ComparePackages/normalize'
import { getLinkHref, type LinkData } from '@/utilities/links'
import {
  formationPackagesStyles as s,
  formationPackagesCardStyles,
  formationPackagesCardTextStyles,
} from './FormationPackages.styles'

type Props = FormationPackagesBlockProps & {
  combineWith?: ComparePackagesBlockProps
}

export const FormationPackagesBlock: React.FC<Props> = ({
  title,
  subtitle,
  packages,
  footerTitle,
  footerDescription,
  footerLink,
  sectionLayout,
  combineWith,
}) => {
  const packageNames = packages?.map((pkg) => pkg.name) ?? []

  const cardStyles =
    sectionLayout?.background === 'light'
      ? {
          ...formationPackagesCardStyles,
          cardLight: 'bg-[var(--surface-tertiary)] border border-[var(--border-subtle)]',
          benefitIconLight: 'bg-[var(--surface-primary)]',
        }
      : formationPackagesCardStyles

  const cards = (packages ?? []).map((pkg) => ({
    name: pkg.name,
    card: {
      name: pkg.name,
      description: pkg.description,
      price: pkg.price,
      priceSuffix: pkg.priceSuffix,
      orderLink: pkg.orderLink as LinkData,
      prefixText: pkg.prefixText,
      benefits: pkg.benefits ?? [],
      isHighlighted: pkg.isHighlighted,
      badgeText: pkg.badgeText,
      badgeVariant: 'dark' as const,
      showFindOutMoreLink: pkg.showFindOutMoreLink,
      findOutMoreLink: pkg.findOutMoreLink,
    },
  }))

  const combinedSections =
    combineWith?.sections?.length ? normalizeSections(combineWith.sections) : null
  const combined = Boolean(combinedSections && cards.length >= 3)
  const combinedCards = combined ? cards.slice(0, 3) : cards

  return (
    <SectionWrapper {...sectionLayout}>
      <div className={s.section}>
      <div className={s.header}>
        {title && <Text text={title} as="h2" textStyle="headline-5xl" className={s.title} />}
        {subtitle && <Text text={subtitle} textStyle="body-base" className={s.subtitle} />}
      </div>
      {combined && combinedSections && (
        <div className="lg:hidden">
          <CombinedPlansCarousel plans={combinedCards} sections={combinedSections} cardStyles={cardStyles} />
        </div>
      )}
      <PackageCardsCarousel packageNames={packageNames} combined={combined}>
        {cards.map((c) => (
          <PackageCard
            key={c.name}
            {...c.card}
            titleAs="h3"
            styles={cardStyles}
            textStyles={formationPackagesCardTextStyles}
          />
        ))}
      </PackageCardsCarousel>
      {(() => {
        const hasFooterTitle = Boolean(footerTitle)
        const hasFooterDescription = Boolean(footerDescription)
        const hasFooterLink = Boolean(footerLink?.label)
        const hasFooterText = hasFooterTitle || hasFooterDescription
        if (!hasFooterText && !hasFooterLink) return null

        return (
          <div className={cn(s.footer, !hasFooterText && s.footerCtaOnly)}>
            {hasFooterText && (
              <div className={s.footerContent}>
                {hasFooterTitle && (
                  <Text
                    text={footerTitle as string}
                    as="h3"
                    textStyle="headline-2xl"
                    className={s.footerTitle}
                  />
                )}
                {hasFooterDescription && footerDescription && (
                  <RichText
                    data={footerDescription}
                    enableGutter={false}
                    enableProse={false}
                    className={s.footerDescription}
                  />
                )}
              </div>
            )}
            {hasFooterLink && footerLink && (
              <Link href={getLinkHref(footerLink as LinkData)}>
                <Button variant="primary" size="lg">
                  {footerLink.label}
                </Button>
              </Link>
            )}
          </div>
        )
      })()}
      </div>
    </SectionWrapper>
  )
}
