import React from 'react'

import type { BuyService } from '@/payload-types'

import { getLinkHref, type LinkData } from '@/utilities/links'
import { BuyServiceCard } from './BuyServiceCard'

export type BuyServiceCardsProps = {
  services?: (number | string | BuyService)[] | null
  className?: string
  cardClassName?: string
}

export const BuyServiceCards: React.FC<BuyServiceCardsProps> = ({
  services,
  className,
  cardClassName,
}) => {
  const resolved = (services ?? []).filter(
    (service): service is BuyService => typeof service === 'object' && service !== null,
  )

  if (!resolved.length) return null

  const cards = resolved
    .map((service) => {
      const price = service.price
      if (!price) return null
      const cta = service.cta as LinkData | undefined
      return (
        <BuyServiceCard
          key={service.id}
          title={service.title}
          mobileTitle={service.mobileTitle}
          price={price}
          postText={service.postText}
          showVat={service.showVat}
          content={service.content}
          hideBodyOnMobile={service.hideBodyOnMobile}
          ctaLabel={cta?.label}
          ctaHref={getLinkHref(cta)}
          ctaNewTab={cta?.newTab}
          className={cardClassName}
        />
      )
    })
    .filter(Boolean)

  if (!cards.length) return null

  return <aside className={className}>{cards}</aside>
}

export default BuyServiceCards
