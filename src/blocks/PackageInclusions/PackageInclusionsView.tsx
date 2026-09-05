import React from 'react'

import { OrderLink } from '@/components/shared/OrderLink'
import { faBadgeCheck } from '@fortawesome/pro-solid-svg-icons/faBadgeCheck'
import { faCashRegister } from '@fortawesome/pro-solid-svg-icons/faCashRegister'
import { faDesktop } from '@fortawesome/pro-solid-svg-icons/faDesktop'
import { faEnvelope } from '@fortawesome/pro-solid-svg-icons/faEnvelope'
import { faFileArchive } from '@fortawesome/pro-solid-svg-icons/faFileArchive'
import { faFileEdit } from '@fortawesome/pro-solid-svg-icons/faFileEdit'
import { faGlobeEurope } from '@fortawesome/pro-solid-svg-icons/faGlobeEurope'
import { faLifeRing } from '@fortawesome/pro-solid-svg-icons/faLifeRing'
import { faMoneyCheckEdit } from '@fortawesome/pro-solid-svg-icons/faMoneyCheckEdit'
import { faPhoneRotary } from '@fortawesome/pro-solid-svg-icons/faPhoneRotary'
import { faScreenUsers } from '@fortawesome/pro-solid-svg-icons/faScreenUsers'
import { faTools } from '@fortawesome/pro-solid-svg-icons/faTools'
import { faUniversity } from '@fortawesome/pro-solid-svg-icons/faUniversity'
import { faUsers } from '@fortawesome/pro-solid-svg-icons/faUsers'

import type { PackageInclusionsBlock } from '@/payload-types'

import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/shared/Container/Container'
import { FaIcon } from '@/components/shared/FaIcon'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { packageInclusionsStyles as s } from './PackageInclusions.styles'

export type PackageInclusionsItem = NonNullable<PackageInclusionsBlock['items']>[number]

const icons = {
  badgeCheck: faBadgeCheck,
  cashRegister: faCashRegister,
  desktop: faDesktop,
  envelope: faEnvelope,
  fileArchive: faFileArchive,
  fileEdit: faFileEdit,
  globeEurope: faGlobeEurope,
  lifeRing: faLifeRing,
  moneyCheckEdit: faMoneyCheckEdit,
  phoneRotary: faPhoneRotary,
  screenUsers: faScreenUsers,
  tools: faTools,
  university: faUniversity,
  users: faUsers,
} as const

export const PackageInclusionsItemRow: React.FC<{ item: PackageInclusionsItem }> = ({ item }) => (
  <li className={s.item}>
    <FaIcon icon={icons[item.icon] ?? faBadgeCheck} className={s.icon} />
    <div>
      <Text as="h3" textStyle="span" text={item.title} className={s.title} />
      <RichText
        data={item.content}
        enableGutter={false}
        enableProse={false}
        className={s.content}
      />
    </div>
  </li>
)

export type PackageInclusionsViewProps = {
  heading?: string | null
  items?: PackageInclusionsItem[] | null
  price?: string | null
  priceNote?: string | null
  ctaLabel?: string | null
  ctaHref?: string
  ctaCheckoutPath?: string | null
  ctaNewTab?: boolean | null
  sectionLayout?: PackageInclusionsBlock['sectionLayout']
}

export const PackageInclusionsView: React.FC<PackageInclusionsViewProps> = ({
  heading,
  items,
  price,
  priceNote,
  ctaLabel,
  ctaHref,
  ctaCheckoutPath,
  ctaNewTab,
  sectionLayout,
}) => {
  const included = items ?? []

  if (!included.length) return null

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container>
        <div className={s.grid}>
          <div>
            <Text as="h2" textStyle="span" text={heading ?? undefined} className={s.heading} />
            <ul className={s.list}>
              {included.map((item, index) => (
                <PackageInclusionsItemRow key={item.id ?? index} item={item} />
              ))}
            </ul>
          </div>
          {(price || ctaLabel) && (
            <div className={s.buy}>
              {price && (
                <div className={s.pricesWrap}>
                  <Text textStyle="span" text={`£${price}`} className={s.price} />
                  {priceNote && <Text textStyle="span" text={priceNote} className={s.priceNote} />}
                </div>
              )}
              {ctaLabel && ctaHref && (
                <div className={s.buttons}>
                  <Button variant="success" size="promo" asChild>
                    <OrderLink
                      href={ctaHref}
                      checkoutPath={ctaCheckoutPath}
                      target={ctaNewTab ? '_blank' : undefined}
                      rel={ctaNewTab ? 'noopener noreferrer' : undefined}
                    >
                      {ctaLabel}
                    </OrderLink>
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
    </SectionWrapper>
  )
}
