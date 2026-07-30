import React from 'react'

import type { NoteBlock as NoteBlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { noteStyles as s } from './Note.styles'

type HeadingLevel = 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export const NoteBlock: React.FC<NoteBlockProps> = ({ heading, headingLevel, body, sectionLayout }) => {
  const tag = (headingLevel ?? 'h2') as HeadingLevel

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <div className={s.container}>
        {heading && (
          <Text as={tag} textStyle="headline-4xl" text={heading} className={s.heading} />
        )}
        {body && <RichText data={body} enableGutter={false} className={s.body} />}
      </div>
    </SectionWrapper>
  )
}
