import React from 'react'

import { cn } from '@/utilities/ui'
import { comparePackageTableStyles as s } from './ComparePackageTable.styles'
import { Intro } from './Intro'
import { PackageColumn, type PackageColumnProps } from './PackageColumn'
import type { TableData } from './types'

const ROW_SPAN: Record<'header' | 'footer', Partial<Record<number, string>>> = {
  header: { 2: s.headerTwo, 3: s.headerThree },
  footer: { 2: s.footerTwo, 3: s.footerThree },
}

export const linksPackageName = (count: number) => count === 3

const COLUMN_PROPS: Partial<Record<number, Partial<PackageColumnProps>>> = {
  2: { centered: true },
  3: { showReadMore: true, tallPrices: true, fullWidthButtons: true },
}

export const PackageRow: React.FC<{ data: TableData; variant: 'header' | 'footer' }> = ({
  data,
  variant,
}) => {
  const count = data.packages.length
  if (count !== 2 && count !== 3) return null

  const isFooter = variant === 'footer'
  const showIntro = count === 3 && !isFooter

  return (
    <div className={cn(isFooter ? s.footer : s.header, ROW_SPAN[variant][count])}>
      {showIntro ? <Intro data={data} /> : <div className={s.column} />}
      {data.packages.map((pkg) => (
        <PackageColumn
          key={pkg.id}
          pkg={pkg}
          showWhosItFor={showIntro}
          {...COLUMN_PROPS[count]}
          linkName={linksPackageName(count)}
        />
      ))}
    </div>
  )
}
