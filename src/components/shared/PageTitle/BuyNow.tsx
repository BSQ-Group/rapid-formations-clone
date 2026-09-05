import React from 'react'

import { OrderLink } from '@/components/shared/OrderLink'

import type { PageTitleBlock } from '@/payload-types'

import Text from '@/components/shared/Text'
import { Button } from '@/components/ui/button'
import { getLinkHref, type LinkData } from '@/utilities/links'
import { getTierPriceMap } from '@/utilities/getPackagePrices'
import { getCheckoutPaths, nameCheckSlug } from '@/lib/nameCheck/checkoutPaths'
import { pageTitleStyles as s } from './PageTitle.styles'

type BuyNowValue = NonNullable<PageTitleBlock['buyNow']>

export type BuyNowButton = {
  label: string
  href: string
  newTab?: boolean | null
  variant: 'success' | 'secondary'
  /** Set only for a name-check href, so Buy Now can skip that step. */
  checkoutPath?: string | null
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
          {buttons.map(({ label, href, newTab, variant, checkoutPath }) => (
            <Button key={label} variant={variant} size="promo" asChild>
              <OrderLink
                href={href}
                checkoutPath={checkoutPath}
                target={newTab ? '_blank' : undefined}
                rel={newTab ? 'noopener noreferrer' : undefined}
              >
                {label}
              </OrderLink>
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

  // Only pay for the lookup when a button actually points at the name-check step.
  const slugs = buttons.map((b) => nameCheckSlug(b.href))
  const checkoutPaths = slugs.some(Boolean) ? await getCheckoutPaths() : {}
  const withCheckout = buttons.map((b, i) => ({ ...b, checkoutPath: checkoutPaths[slugs[i] ?? ''] }))

  const price =
    buyNow?.price || (packageSlug ? (await getTierPriceMap()).get(packageSlug) : undefined)

  return <BuyNowView price={price} priceSuffix={buyNow?.priceSuffix} buttons={withCheckout} />
}
