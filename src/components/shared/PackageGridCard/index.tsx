import React from 'react'
import Link from 'next/link'
import { faCircleInfo } from '@fortawesome/pro-solid-svg-icons/faCircleInfo'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import Text from '@/components/shared/Text'
import { FaIcon } from '@/components/shared/FaIcon'
import { InfoTooltip } from '@/components/shared/InfoTooltip'
import { OrderLink } from '@/components/shared/OrderLink'
import { cn } from '@/utilities/ui'
import { packageGridCardStyles as s } from './PackageGridCard.styles'

export interface PackageGridCardHighlight {
  id?: string | null
  text: string
  tooltipContent?: DefaultTypedEditorState | null
  tooltip?: string | null
  tooltipTitle?: string | null
}

export interface PackageGridCardProps {
  name: string
  nameHref?: string | null
  price: string
  priceNote?: string | null
  description?: string | null
  badgeText?: string | null
  highlightsTitle?: string | null
  highlights?: PackageGridCardHighlight[] | null
  buyHref?: string | null
  buyLabel?: string | null
  /** Lets Buy Now skip the name-check step once a name has been checked. */
  buyCheckoutPath?: string | null
  readMoreHref?: string | null
  readMoreLabel?: string | null
  className?: string
}

export const PackageGridCard: React.FC<PackageGridCardProps> = ({
  name,
  nameHref,
  price,
  priceNote,
  description,
  badgeText,
  highlightsTitle,
  highlights,
  buyHref,
  buyLabel,
  buyCheckoutPath,
  readMoreHref,
  readMoreLabel,
  className,
}) => {
  const nameClassName = cn(s.name, badgeText && s.nameBadgeGutter)

  return (
    <div className={cn(s.card, className)}>
      {badgeText && (
        <div className={s.badgeClip} aria-hidden>
          <Text textStyle="span" text={badgeText} className={s.badge} />
        </div>
      )}
      <div className={s.header}>
        {nameHref ? (
          <Text as="h3" textStyle="span" className={nameClassName}>
            <Text textStyle="span" text={name} href={nameHref} className={s.nameLink} />
          </Text>
        ) : (
          <Text as="h3" textStyle="span" text={name} className={nameClassName} />
        )}
        <Text textStyle="span" text={price} className={s.price} />
        {priceNote && <Text textStyle="span" text={priceNote} className={s.priceNote} />}
      </div>
      {description && <Text as="p" textStyle="span" text={description} className={s.description} />}
      {buyHref && buyLabel && (
        <div className={s.buyGroup}>
          <OrderLink href={buyHref} checkoutPath={buyCheckoutPath} className={s.buyButton}>
            {buyLabel}
          </OrderLink>
        </div>
      )}
      {highlights && highlights.length > 0 && (
        <div className={s.highlights}>
          {highlightsTitle && (
            <Text as="h4" textStyle="span" text={highlightsTitle} className={s.highlightsTitle} />
          )}
          <ul className={s.highlightsList}>
            {highlights.map((item, i) => (
              <li key={item.id ?? i} className={s.highlightItem}>
                {item.tooltipContent || item.tooltip ? (
                  <InfoTooltip
                    title={item.tooltipTitle}
                    content={item.tooltipContent}
                    text={item.tooltipContent ? null : item.tooltip}
                    icon={<FaIcon icon={faCircleInfo} className={s.highlightIcon} />}
                    triggerClassName={s.highlightTrigger}
                  />
                ) : (
                  <FaIcon icon={faCircleInfo} className={s.highlightIcon} />
                )}
                <Text textStyle="span" text={item.text} className={s.highlightText} />
              </li>
            ))}
          </ul>
        </div>
      )}
      {readMoreHref && readMoreLabel && (
        <Link href={readMoreHref} className={s.readMoreButton}>
          {readMoreLabel}
        </Link>
      )}
    </div>
  )
}
