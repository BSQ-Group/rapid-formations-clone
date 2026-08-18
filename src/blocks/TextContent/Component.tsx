import React from 'react'

import type { TextContentBlock as TextContentBlockProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import RichText from '@/components/RichText'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import { cn } from '@/utilities/ui'
import { richTextShell, textContentStyles as s, variantStyles } from './TextContent.styles'

type Variant = NonNullable<TextContentBlockProps['variant']>

const variants: Record<Variant, Record<string, string>> = variantStyles

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
          className={cn(
            Object.values(richTextShell),
            Object.values(variants[variant ?? 'standard'] ?? variants.standard),
          )}
        />
      </Container>
    </SectionWrapper>
  )
}
