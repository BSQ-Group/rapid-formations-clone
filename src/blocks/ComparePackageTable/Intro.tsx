import React from 'react'

import RichText from '@/components/RichText'
import Text from '@/components/shared/Text'
import { cn } from '@/utilities/ui'
import { comparePackageTableStyles as s } from './ComparePackageTable.styles'
import type { TableData } from './types'

export const Intro: React.FC<{ data: TableData }> = ({ data }) => (
  <div className={cn(s.column, s.intro, s.columnStart)}>
    <Text as="h3" textStyle="span" text={data.heading} className={s.introHeading} />
    {data.sameDayHeading && (
      <div className={s.sameDay}>
        <Text as="h4" textStyle="span" text={data.sameDayHeading} className={s.sameDayHeading} />
        {data.sameDayBody && (
          <RichText
            data={data.sameDayBody}
            enableGutter={false}
            enableProse={false}
            className={s.sameDayBody}
          />
        )}
      </div>
    )}
  </div>
)
