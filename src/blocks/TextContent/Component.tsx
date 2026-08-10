import React from 'react'

import type { TextContentBlock as TextContentBlockProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import RichText from '@/components/RichText'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import { cn } from '@/utilities/ui'
import { policyTableStyles as t, textContentStyles as s } from './TextContent.styles'

type Variant = NonNullable<TextContentBlockProps['variant']>

const variantStyles: Record<Variant, readonly string[]> = {
  standard: [s.lists],
  policy: [s.lists, s.policy, t.table, t.headerCell, t.dataCell, t.rows, t.nestedList, t.scroll],
  numbered: [s.numbered],
}

export const TextContentBlock: React.FC<TextContentBlockProps> = ({
  body,
  variant,
  sectionLayout,
}) => {
  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container>
        <RichText
          data={body}
          enableGutter={false}
          enableProse={false}
          className={cn(s.body, variantStyles[variant ?? 'standard'])}
        />
      </Container>
    </SectionWrapper>
  )
}
