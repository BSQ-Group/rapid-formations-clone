import React from 'react'
import { OrderLink } from '@/components/shared/OrderLink'

import { comparePackageTableStyles as s } from './ComparePackageTable.styles'
import type { TablePackage } from './types'

export const BuyNowLink: React.FC<{ pkg: TablePackage }> = ({ pkg }) => (
  <OrderLink
    href={pkg.buyHref}
    checkoutPath={pkg.checkoutPath}
    target={pkg.buyNewTab ? '_blank' : undefined}
    rel={pkg.buyNewTab ? 'noopener noreferrer' : undefined}
    aria-label={`Buy our ${pkg.name} package now.`}
    className={s.buyButton}
  >
    Buy Now
  </OrderLink>
)
