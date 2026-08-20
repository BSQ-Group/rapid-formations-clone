import React from 'react'

import RichText from '@/components/RichText'
import { comparePackageTableStyles as s } from './ComparePackageTable.styles'
import { DesktopGrid } from './DesktopGrid'
import { MobileCarousel } from './MobileCarousel'
import type { TableData } from './types'

export const ComparePackageTableView: React.FC<{
  data: TableData
  cardHeight?: string | null
}> = ({ data, cardHeight }) => (
  <>
    <DesktopGrid data={data} />
    {data.footnote && (
      <div className={s.footnote}>
        <RichText
          data={data.footnote}
          enableGutter={false}
          enableProse={false}
          className={s.footnoteBody}
        />
      </div>
    )}
    <MobileCarousel data={data} cardHeight={cardHeight} />
  </>
)
