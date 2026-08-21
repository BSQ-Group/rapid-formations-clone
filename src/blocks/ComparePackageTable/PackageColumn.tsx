import React from 'react'
import Link from 'next/link'

import RichText from '@/components/RichText'
import Text from '@/components/shared/Text'
import { cn } from '@/utilities/ui'
import { BuyNowLink } from './BuyNowLink'
import { comparePackageTableStyles as s } from './ComparePackageTable.styles'
import { PriceStack } from './PriceStack'
import type { TablePackage } from './types'

export type PackageColumnProps = {
  pkg: TablePackage
  showWhosItFor?: boolean
  showReadMore?: boolean
  centered?: boolean
  linkName?: boolean
  tallPrices?: boolean
  fullWidthButtons?: boolean
}

export const PackageColumn: React.FC<PackageColumnProps> = ({
  pkg,
  showWhosItFor = false,
  showReadMore = false,
  centered = false,
  linkName = false,
  tallPrices = false,
  fullWidthButtons = false,
}) => (
  <div className={cn(s.column, s.package, centered ? s.columnCenter : s.columnStart)}>
    <Text as="h3" textStyle="span" className={s.packageName}>
      {linkName && pkg.readMoreHref ? (
        <Link href={pkg.readMoreHref} className={s.packageNameLink}>
          {pkg.name}
        </Link>
      ) : (
        pkg.name
      )}
    </Text>
    <PriceStack
      pkg={pkg}
      className={cn(s.prices, tallPrices && s.pricesMinHeight, centered && s.pricesCentered)}
    />
    {showWhosItFor && pkg.whosItFor && (
      <RichText
        data={pkg.whosItFor}
        enableGutter={false}
        enableProse={false}
        className={s.whosItFor}
      />
    )}
    <div className={cn(s.buttons, fullWidthButtons && s.buttonsFull)}>
      <BuyNowLink pkg={pkg} />
      {showReadMore && pkg.readMoreHref && (
        <Link
          href={pkg.readMoreHref}
          aria-label={`Read More about our ${pkg.name} package.`}
          className={s.readMoreButton}
        >
          {pkg.readMoreLabel || 'Read More'}
        </Link>
      )}
    </div>
    {pkg.ribbonText && (
      <div className={s.ribbon}>
        <Text textStyle="span" text={pkg.ribbonText} className={s.ribbonLabel} />
      </div>
    )}
  </div>
)
