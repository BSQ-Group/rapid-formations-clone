import React from 'react'

import type { TextContentBlock as TextContentBlockProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import RichText from '@/components/RichText'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import { cn } from '@/utilities/ui'
import { textContentStyles as s } from './TextContent.styles'

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
            s.body,
            variant === 'numbered' ? s.numbered : s.lists,
            variant === 'policy' && s.policy,
          )}
        />
      </Container>
    </SectionWrapper>
  )
}
