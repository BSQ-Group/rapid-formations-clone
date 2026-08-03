import React from 'react'
import Link from 'next/link'

import type { PackageGridBlock as PackageGridBlockProps } from '@/payload-types'

import Text from '@/components/shared/Text'
import { cn } from '@/utilities/ui'
import { getLinkHref, type LinkData } from '@/utilities/links'
import { Container } from '@/components/shared/Container/Container'
import { InfoTooltip } from '@/components/shared/InfoTooltip'
import { packageGridStyles as s } from './PackageGrid.styles'
import { InfoDisc } from './InfoDisc'

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
          {packages.map((pkg, index) => {
            const nameHref = href(pkg.nameLink)
            const buyHref = href(pkg.buyLink)
            const readMoreHref = href(pkg.readMoreLink)
            const nameClassName = cn(s.packageName, pkg.badgeText && s.packageNameBadgeGutter)

            return (
              <div key={pkg.id ?? index} className={s.card}>
                {pkg.badgeText && (
                  <div className={s.badgeClip} aria-hidden>
                    <Text textStyle="span" text={pkg.badgeText} className={s.badge} />
                  </div>
                )}
                <div className={s.cardHeader}>
                  {nameHref ? (
                    <h3 className={nameClassName}>
                      <Text
                        textStyle="span"
                        text={pkg.name}
                        href={nameHref}
                        className={s.packageNameLink}
                      />
                    </h3>
                  ) : (
                    <Text as="h3" textStyle="span" text={pkg.name} className={nameClassName} />
                  )}
                  <Text textStyle="span" text={pkg.price} className={s.price} />
                  {pkg.priceNote && (
                    <Text textStyle="span" text={pkg.priceNote} className={s.priceNote} />
                  )}
                </div>
                <Text as="p" textStyle="span" text={pkg.description} className={s.description} />
                {buyHref && pkg.buyLink?.label && (
                  <div className={s.buyGroup}>
                    <Link href={buyHref} className={s.buyButton}>
                      {pkg.buyLink.label}
                    </Link>
                  </div>
                )}
                {pkg.highlights && pkg.highlights.length > 0 && (
                  <div className={s.highlights}>
                    {pkg.highlightsTitle && (
                      <Text
                        as="h4"
                        textStyle="span"
                        text={pkg.highlightsTitle}
                        className={s.highlightsTitle}
                      />
                    )}
                    <ul className={s.highlightsList}>
                      {pkg.highlights.map((item, i) => (
                        <li key={item.id ?? i} className={s.highlightItem}>
                          {item.tooltip ? (
                            <InfoTooltip
                              title={item.tooltipTitle}
                              text={item.tooltip}
                              icon={<InfoDisc className={s.highlightIcon} />}
                              triggerClassName={s.highlightTrigger}
                            />
                          ) : (
                            <InfoDisc className={s.highlightIcon} />
                          )}
                          <Text textStyle="span" text={item.text} className={s.highlightText} />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {readMoreHref && pkg.readMoreLink?.label && (
                  <Link href={readMoreHref} className={s.readMoreButton}>
                    {pkg.readMoreLink.label}
                  </Link>
                )}
              </div>
            )
          })}
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
