import React from 'react'

import { cn } from '@/utilities/ui'
import { comparePackageTableStyles as s } from './ComparePackageTable.styles'
import { PackageRow } from './PackageRow'
import { ProductRow } from './ProductRow'
import { WideIntroColumn } from './WideIntroColumn'
import type { TableData } from './types'

const PRODUCT_SPAN: Partial<Record<number, string>> = {
  2: s.productTwo,
  3: s.productThree,
}

export const DesktopGrid: React.FC<{ data: TableData }> = ({ data }) => {
  const count = data.packages.length
  const rowClass = cn(s.product, PRODUCT_SPAN[count])

  return (
    <div className={s.grid}>
      {count <= 2 && (
        <div className={s.header}>
          <WideIntroColumn data={data} withActions={count === 1} />
        </div>
      )}
      <PackageRow data={data} variant="header" />
      <div className={s.products}>
        {data.products.map((product) => (
          <ProductRow
            key={product.id}
            product={product}
            packages={data.packages}
            className={rowClass}
          />
        ))}
      </div>
      <PackageRow data={data} variant="footer" />
    </div>
  )
}
