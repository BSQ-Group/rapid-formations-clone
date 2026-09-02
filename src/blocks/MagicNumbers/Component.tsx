import React from 'react'

import type { MagicNumbersBlock as MagicNumbersBlockProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { FaIcon } from '@/components/shared/FaIcon'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { MAGIC_NUMBER_ICONS } from './icons'
import { magicNumbersStyles as s } from './MagicNumbers.styles'

const px = (value?: number | null) => (typeof value === 'number' ? `${value}px` : undefined)

export const MagicNumbersBlock: React.FC<MagicNumbersBlockProps> = ({
  heading,
  subheading,
  numbers,
  sectionLayout,
}) => {
  const items = numbers ?? []

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container className={s.wrapperPad}>
        <Text as="h2" textStyle="span" text={heading} className={s.heading} />
        {subheading && <Text as="p" textStyle="span" text={subheading} className={s.subheading} />}
        <div className={s.items}>
          {items.map((item, index) => (
            <div
              key={item.id ?? index}
              className={s.item}
              style={{
                left: px(item.placement?.left),
                top: px(item.placement?.top),
                bottom: px(item.placement?.bottom),
              }}
            >
              <span className={s.icon} style={{ backgroundColor: item.colour }}>
                {MAGIC_NUMBER_ICONS[item.icon] && (
                  <FaIcon icon={MAGIC_NUMBER_ICONS[item.icon].icon} className={s.glyph} />
                )}
              </span>
              <div className={s.content}>
                <Text as="h3" textStyle="span" text={item.heading} className={s.itemHeading} />
                {item.body && (
                  <Text as="p" textStyle="span" text={item.body} className={s.itemBody} />
                )}
              </div>
            </div>
          ))}
          <div className={s.dividers}>
            {items.map((item, index) => (
              <div
                key={`connector-${item.id ?? index}`}
                className={s.divider}
                style={{ backgroundColor: item.colour, width: `${item.connector?.width ?? 0}%` }}
              >
                <span
                  className={s.dividerLine}
                  style={{
                    backgroundColor: item.colour,
                    top: px(item.connector?.top),
                    height: px(item.connector?.height),
                    left: item.connector?.side === 'right' ? undefined : px(item.connector?.inset),
                    right: item.connector?.side === 'right' ? px(item.connector?.inset) : undefined,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </SectionWrapper>
  )
}
