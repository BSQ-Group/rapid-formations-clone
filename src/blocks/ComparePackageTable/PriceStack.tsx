import React from 'react'

import { comparePackageTableStyles as s } from './ComparePackageTable.styles'
import type { TablePackage } from './types'

export const PriceStack: React.FC<{ pkg: TablePackage; className?: string }> = ({
  pkg,
  className,
}) => (
  <div className={className}>
    <span>{pkg.price}</span>
    {pkg.priceNote && <span className={s.priceNote}>{pkg.priceNote}</span>}
  </div>
)
