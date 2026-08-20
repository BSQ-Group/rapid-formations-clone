import React from 'react'

import RichText from '@/components/RichText'
import Text from '@/components/shared/Text'
import { cn } from '@/utilities/ui'
import { BuyNowLink } from './BuyNowLink'
import { comparePackageTableStyles as s } from './ComparePackageTable.styles'
import { PriceStack } from './PriceStack'
import type { TableData } from './types'

export const WideIntroColumn: React.FC<{ data: TableData; withActions: boolean }> = ({
  data,
  withActions,
}) => {
  const pkg = data.packages[0]
  const heading = <Text as="h3" textStyle="span" text={data.heading} className={s.packageName} />

  return (
    <div className={cn(s.column, s.package, s.columnStart)}>
      {withActions && pkg ? (
        <div className={s.details}>
          {heading}
          <div className={s.actions}>
            <PriceStack pkg={pkg} className={s.actionsPrices} />
            <div className={s.buttons}>
              <BuyNowLink pkg={pkg} />
            </div>
          </div>
        </div>
      ) : (
        heading
      )}
      {data.content && (
        <RichText
          data={data.content}
          enableGutter={false}
          enableProse={false}
          className={s.introBody}
        />
      )}
    </div>
  )
}
