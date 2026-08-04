import React from 'react'
import { Check } from 'lucide-react'

import type { ServiceTextBlock as ServiceTextBlockProps } from '@/payload-types'

import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { serviceTextStyles as s } from './ServiceText.styles'

export const ServiceTextBlock: React.FC<ServiceTextBlockProps> = ({
  title,
  description,
  listTitle,
  items,
  sectionLayout,
}) => {
  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <div className={s.container}>
        <div className={s.copyCol}>
          {title && (
            <Text as="h2" textStyle="headline-5xl" text={title} className={s.title} />
          )}
          {description && (
            <Text as="p" textStyle="body-base" text={description} className={s.description} />
          )}
        </div>
        <div className={s.listCol}>
          {listTitle && (
            <Text as="h3" textStyle="headline-3xl" text={listTitle} className={s.listTitle} />
          )}
          {items && items.length > 0 && (
            <div className={s.itemsWrap}>
              {[
                items.slice(0, Math.ceil(items.length / 2)),
                items.slice(Math.ceil(items.length / 2)),
              ].map(
                (column, colIdx) =>
                  column.length > 0 && (
                    <ul key={colIdx} className={s.itemsColumn}>
                      {column.map((item, index) => (
                        <li key={item.id ?? index} className={s.itemRow}>
                          <span className={s.iconBubble} aria-hidden="true">
                            <Check size={16} strokeWidth={2.5} className={s.iconCheck} />
                          </span>
                          <Text
                            textStyle="body-base"
                            text={item.text}
                            className={s.itemText}
                          />
                        </li>
                      ))}
                    </ul>
                  ),
              )}
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  )
}
