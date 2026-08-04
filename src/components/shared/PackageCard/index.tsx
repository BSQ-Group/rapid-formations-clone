import React from 'react'
import Link from 'next/link'
import { Check } from 'lucide-react'

import { cn } from '@/utilities/ui'
import { Button } from '@/components/ui/button'
import { CMSLink } from '@/components/Link'
import Text from '@/components/shared/Text'
import { Badge } from '@/components/shared/Badge'
import { InfoTooltip } from '@/components/shared/InfoTooltip'
import { getLinkHref, type LinkData } from '@/utilities/links'

import type { PackageCardProps } from './PackageCard.types'

export function PackageCard({
  name,
  description,
  price,
  priceSuffix,
  orderLink,
  prefixText,
  benefits,
  isHighlighted,
  badgeText,
  badgeVariant = 'green',
  showFindOutMoreLink,
  findOutMoreLink,
  titleAs = 'h3',
  styles: s,
  textStyles: ts,
  className,
}: PackageCardProps) {
  const dark = Boolean(isHighlighted)

  const ContentWrap = s.contentBlock ? 'div' : React.Fragment
  const contentWrapProps = s.contentBlock ? { className: s.contentBlock } : {}

  const showDivider = Boolean(s.divider)
  const hasFindOutMoreRow = s.findOutMore !== undefined
  const showFindOutMoreContent =
    Boolean(s.findOutMore) && showFindOutMoreLink !== false && Boolean(findOutMoreLink?.label)

  return (
    <div className={cn(s.card, dark ? s.cardDark : s.cardLight, className)}>
      <ContentWrap {...contentWrapProps}>
        <div className={s.header}>
          <div className={s.titleRow}>
            <Text
              text={name}
              as={titleAs}
              textStyle={ts.title}
              className={cn(s.title, dark ? s.titleDark : s.titleLight)}
            />
            {dark && badgeText && (
              <Badge variant={badgeVariant} className={s.badge}>
                {badgeText}
              </Badge>
            )}
          </div>
          {description && (
            <Text
              text={description}
              textStyle={ts.description}
              className={cn(s.description, dark ? s.descriptionDark : s.descriptionLight)}
            />
          )}
        </div>
        <div className={s.priceBlock ?? ''}>
          <div className={s.priceRow}>
            <Text
              text={price}
              textStyle={ts.price}
              className={cn(s.price, dark ? s.priceDark : s.priceLight)}
            />
            {priceSuffix && (
              <Text
                text={priceSuffix}
                textStyle={ts.priceSuffix}
                className={cn(s.priceSuffix, dark ? s.priceSuffixDark : s.priceSuffixLight)}
              />
            )}
          </div>
          {orderLink && (
            <div className={s.orderButton}>
              <Link
                href={getLinkHref(orderLink as LinkData)}
                aria-label={`${orderLink.label} ${name} package`}
                className={s.orderButtonInner}
              >
                <Button variant="primary" size="lg" className={s.orderButtonInner}>
                  {orderLink.label}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </ContentWrap>
      {showDivider && <hr className={cn(s.divider, dark ? s.dividerDark : s.dividerLight)} />}
      <div className={s.benefitsContainer}>
        {prefixText && (
          <Text
            text={prefixText}
            textStyle={ts.prefix}
            className={cn(s.prefixText, dark ? s.prefixTextDark : s.prefixTextLight)}
          />
        )}
        <ul className={s.benefitsList}>
          {benefits?.map((item, i) => (
            <li key={item.id ?? i} className={s.benefitItem}>
              <span
                className={cn(
                  s.benefitIcon,
                  isHighlighted ? 'bg-[var(--surface-primary)]' : s.benefitIconLight,
                )}
              >
                <Check
                  size={16}
                  className={isHighlighted ? 'text-[var(--icon-accent)]' : s.benefitIconColor}
                />
              </span>
              <Text
                text={item.benefit}
                textStyle={ts.benefit}
                className={cn(s.benefitText, dark ? s.benefitTextDark : s.benefitTextLight)}
              />
              <InfoTooltip title={item.infoText} content={item.tooltipText} dark={dark} />
            </li>
          ))}
        </ul>
      </div>
      {hasFindOutMoreRow && (
        <div className={s.findOutMore ?? ''}>
          {showFindOutMoreContent && findOutMoreLink && (
            <CMSLink
              {...findOutMoreLink}
              appearance="inline"
              className={cn(
                s.findOutMoreLink,
              )}
            />
          )}
        </div>
      )}
    </div>
  )
}

export type {
  PackageCardProps,
  PackageCardStyles,
  PackageCardTextStyles,
  PackageCardBenefit,
} from './PackageCard.types'
