import React from 'react'
import Link from 'next/link'

import type { PageTitleBlock } from '@/payload-types'

import Text from '@/components/shared/Text'
import { Button } from '@/components/ui/button'
import { getLinkHref, type LinkData } from '@/utilities/links'
import { getTierPriceMap } from '@/utilities/getPackagePrices'
import { pageTitleStyles as s } from './PageTitle.styles'

type BuyNowValue = NonNullable<PageTitleBlock['buyNow']>

export type BuyNowButton = {
  label: string
  href: string
  newTab?: boolean | null
  variant: 'success' | 'secondary'
}

export const BuyNowView: React.FC<{
  price?: string | null
  priceSuffix?: string | null
  buttons?: BuyNowButton[]
}> = ({ price, priceSuffix, buttons = [] }) => {
  if (!price && !buttons.length) return null

  return (
    <>
      {price && (
        <div className={s.pricesWrap}>
          <div className={s.prices}>
            <Text textStyle="span" text={`£${price}`} className={s.price} />
          </div>
          {priceSuffix && <Text textStyle="span" text={priceSuffix} className={s.priceSuffix} />}
        </div>
      )}
      {buttons.length > 0 && (
        <div className={s.buttons}>
          {buttons.map(({ label, href, newTab, variant }) => (
            <Button key={label} variant={variant} size="promo" asChild>
              <Link
                href={href}
                target={newTab ? '_blank' : undefined}
                rel={newTab ? 'noopener noreferrer' : undefined}
              >
                {label}
              </Link>
            </Button>
          ))}
        </div>
      )}
    </>
  )
}

const toButton = (link: LinkData | undefined, variant: BuyNowButton['variant']) =>
  link?.label
    ? { label: link.label, href: getLinkHref(link), newTab: link.newTab, variant }
    : undefined

export const BuyNow: React.FC<{
  buyNow?: BuyNowValue | null
  packageSlug?: string | null
}> = async ({ buyNow, packageSlug }) => {
  const buttons = [
    toButton(buyNow?.cta as LinkData | undefined, 'success'),
    toButton(buyNow?.secondaryCta as LinkData | undefined, 'secondary'),
  ].filter(Boolean) as BuyNowButton[]

  const price =
    buyNow?.price || (packageSlug ? (await getTierPriceMap()).get(packageSlug) : undefined)

  return <BuyNowView price={price} priceSuffix={buyNow?.priceSuffix} buttons={buttons} />
}
