import React from 'react'

import { getLinkHref, type LinkData } from '@/utilities/links'
import { BuyServiceCard, type BuyServiceCardProps } from './BuyServiceCard'

export type BuyServiceCardData = {
  id?: string | null
  title?: string | null
  mobileTitle?: string | null
  price?: string | null
  postText?: string | null
  showVat?: boolean | null
  content?: BuyServiceCardProps['content']
  hideBodyOnMobile?: boolean | null
  cta?: LinkData | null
}

export type BuyServiceCardsProps = {
  services?: BuyServiceCardData[] | null
  className?: string
  cardClassName?: string
}

export const BuyServiceCards: React.FC<BuyServiceCardsProps> = ({
  services,
  className,
  cardClassName,
}) => {
  const cards = (services ?? [])
    .map((service) => {
      const price = service.price
      if (!service.title || !price) return null
      const cta = (service.cta ?? undefined) as LinkData | undefined
      return (
        <BuyServiceCard
          key={service.id ?? service.title}
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
