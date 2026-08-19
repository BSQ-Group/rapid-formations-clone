import React from 'react'
import Link from 'next/link'

import RichText from '@/components/RichText'
import Text from '@/components/shared/Text'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import { buyServiceCardStyles as s } from './BuyServiceCard.styles'

export type BuyServiceCardProps = {
  title: string
  mobileTitle?: string | null
  price: string
  postText?: string | null
  showVat?: boolean | null
  content?: Parameters<typeof RichText>[0]['data'] | null
  hideBodyOnMobile?: boolean | null
  ctaLabel?: string | null
  ctaHref: string
  ctaNewTab?: boolean | null
  className?: string
}

export const BuyServiceCard: React.FC<BuyServiceCardProps> = ({
  title,
  mobileTitle,
  price,
  postText,
  showVat,
  content,
  hideBodyOnMobile,
  ctaLabel,
  ctaHref,
  ctaNewTab,
  className,
}) => {
  const isFree = price.toLowerCase().includes('free')

  return (
    <div className={cn(s.card, className)}>
      <div className={s.header}>
        {mobileTitle ? (
          <>
            <Text
              as="h2"
              textStyle="span"
              text={mobileTitle}
              className={cn(s.title, s.titleMobile)}
            />
            <Text as="h2" textStyle="span" text={title} className={cn(s.title, s.titleDesktop)} />
          </>
        ) : (
          <Text as="h2" textStyle="span" text={title} className={s.title} />
        )}
        <span className={s.price}>
          {!isFree && '£'}
          {price}
          {showVat && (
            <>
              &nbsp;<small className={s.priceSmall}>+VAT</small>
            </>
          )}
          {postText && (
            <>
              &nbsp;<small className={s.priceSmall}>{postText}</small>
            </>
          )}
        </span>
      </div>
      {content && (
        <div className={cn(hideBodyOnMobile && s.bodyHiddenOnMobile)}>
          <RichText data={content} enableGutter={false} enableProse={false} className={s.body} />
        </div>
      )}
      <div className={s.footer}>
        <Button variant="success" size="promo" className={s.cta} asChild>
          <Link
            href={ctaHref}
            target={ctaNewTab ? '_blank' : undefined}
            rel={ctaNewTab ? 'noopener noreferrer' : undefined}
          >
            {ctaLabel ?? (isFree ? 'Free trial' : 'Buy Now')}
          </Link>
        </Button>
      </div>
    </div>
  )
}
