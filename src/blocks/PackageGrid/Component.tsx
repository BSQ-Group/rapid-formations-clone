import React from 'react'
import Link from 'next/link'

import type { PackageGridBlock as PackageGridBlockProps } from '@/payload-types'

import Text from '@/components/shared/Text'
import { getLinkHref, type LinkData } from '@/utilities/links'
import { Container } from '@/components/shared/Container/Container'
import { PackageGridCard } from '@/components/shared/PackageGridCard'
import { packageGridStyles as s } from './PackageGrid.styles'

function href(link: unknown): string | null {
  if (!link) return null
  const resolved = getLinkHref(link as LinkData)
  return resolved && resolved !== '#' ? resolved : null
}

export const PackageGridBlock: React.FC<PackageGridBlockProps> = ({
  heading,
  subheading,
  packages,
  compareLink,
  contactNote,
  footerNote,
}) => {
  if (!packages?.length) return null

  const compareHref = href(compareLink)

  return (
    <section id="package-grid" className={s.section}>
      <Container>
        <div className={s.header}>
          <Text as="h2" textStyle="span" text={heading} className={s.heading} />
          {subheading && (
            <Text as="p" textStyle="span" text={subheading} className={s.subheading} />
          )}
        </div>
        <div className={s.grid}>
          {packages.map((pkg, index) => (
            <PackageGridCard
              key={pkg.id ?? index}
              className={s.card}
              name={pkg.name}
              nameHref={href(pkg.nameLink)}
              price={pkg.price}
              priceNote={pkg.priceNote}
              description={pkg.description}
              badgeText={pkg.badgeText}
              highlightsTitle={pkg.highlightsTitle}
              highlights={pkg.highlights}
              buyHref={href(pkg.buyLink)}
              buyLabel={pkg.buyLink?.label}
              readMoreHref={href(pkg.readMoreLink)}
              readMoreLabel={pkg.readMoreLink?.label}
            />
          ))}
        </div>
        <div className={s.footer}>
          {compareHref && compareLink?.label && (
            <Link href={compareHref} className={s.compareButton}>
              {compareLink.label}
            </Link>
          )}
          {contactNote && (
            <Text as="p" textStyle="span" text={contactNote} className={s.contactNote} />
          )}
          {footerNote && (
            <Text as="p" textStyle="span" text={footerNote} className={s.footerNote} />
          )}
        </div>
      </Container>
    </section>
  )
}
