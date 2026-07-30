import React from 'react'

import type { RegisteredOfficePurposeBlock as RegisteredOfficePurposeBlockProps } from '@/payload-types'

import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { LucideIcon } from '@/components/shared/LucideIcon/LucideIcon'
import { registeredOfficePurposeStyles as s } from './RegisteredOfficePurpose.styles'

const chunk = <T,>(arr: T[], size: number): T[][] => {
  const out: T[][] = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

export const RegisteredOfficePurposeBlock: React.FC<RegisteredOfficePurposeBlockProps> = ({
  title,
  items,
  sectionLayout,
}) => {
  const rows = chunk(items ?? [], 2)
  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      {title && (
        <div className={s.titleWrap}>
          <Text text={title} as="h2" textStyle="headline-5xl" className={s.title} />
        </div>
      )}
      <div className={s.grid}>
        {rows.map((row, ri) => (
          <div key={ri} className={s.row}>
            {row.map((item) => (
              <div key={item.id} className={s.item}>
                <div className={s.iconWrap}>
                  <LucideIcon name={item.icon || 'scale'} size={24} className={s.icon} />
                </div>
                <Text text={item.body} textStyle="body-sm" as="p" className={s.body} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
