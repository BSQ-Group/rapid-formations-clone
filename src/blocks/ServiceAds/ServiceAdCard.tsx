import React from 'react'
import Link from 'next/link'

import type { ServiceAd } from '@/payload-types'

import Text from '@/components/shared/Text'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import { getLinkHref, type LinkData } from '@/utilities/links'
import { serviceAdsStyles as s, serviceAdVariants } from './ServiceAds.styles'

type Props = {
  ad: ServiceAd
  wide?: boolean
}

export const ServiceAdCard: React.FC<Props> = ({ ad, wide = false }) => {
  const variant = serviceAdVariants[ad.variant ?? 'default'] ?? serviceAdVariants.default
  const cta = ad.cta as LinkData | undefined
  const icon = typeof ad.icon === 'object' ? ad.icon : undefined
  const { price, prefix, suffix, postPrice } = ad.pricing ?? {}
  const amount = [prefix, price && `£${price}`, suffix].filter(Boolean).join(' ')

  return (
    <div className={cn(s.service, wide && s.serviceWide)}>
      <div className={cn(s.inner, variant)}>
        <div className={s.content}>
          <div className={s.left}>
            <Text as="h3" textStyle="span" text={ad.title} className={s.title} />
            <Text as="p" textStyle="span" text={ad.body} className={s.body} />
          </div>
          <div className={s.right}>
            {wide && (amount || postPrice) && (
              <span className={s.price}>
                {amount}
                {postPrice && <span className={s.postPrice}>{postPrice}</span>}
              </span>
            )}
            <Button variant="promo" size="promo" className={s.cta} asChild>
              <Link
                href={getLinkHref(cta)}
                target={cta?.newTab ? '_blank' : undefined}
                rel={cta?.newTab ? 'noopener noreferrer' : undefined}
              >
                {cta?.label ?? 'Learn More'}
              </Link>
            </Button>
          </div>
        </div>
        {icon?.url && (
          <span
            aria-hidden="true"
            className={s.icon}
            style={{ backgroundImage: `url(${icon.url})` }}
          />
        )}
      </div>
    </div>
  )
}
