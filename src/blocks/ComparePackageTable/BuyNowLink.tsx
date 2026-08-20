import React from 'react'
import Link from 'next/link'

import { comparePackageTableStyles as s } from './ComparePackageTable.styles'
import type { TablePackage } from './types'

export const BuyNowLink: React.FC<{ pkg: TablePackage }> = ({ pkg }) => (
  <Link
    href={pkg.buyHref}
    target={pkg.buyNewTab ? '_blank' : undefined}
    rel={pkg.buyNewTab ? 'noopener noreferrer' : undefined}
    aria-label={`Buy our ${pkg.name} package now.`}
    className={s.buyButton}
  >
    Buy Now
  </Link>
)
