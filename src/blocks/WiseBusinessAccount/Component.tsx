import React from 'react'

import type { WiseBusinessAccountBlock as WiseBusinessAccountBlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { wiseBusinessAccountStyles as s } from './WiseBusinessAccount.styles'

export const WiseBusinessAccountBlock: React.FC<WiseBusinessAccountBlockProps> = ({
  title,
  body,
  sectionLayout,
}) => {
  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <div className={s.outerCard}>
        <div className={s.innerCard}>
          <div className={s.content}>
            <Text as="h2" text={title} textStyle="span" className={s.title} />
            {body && <RichText data={body} enableGutter={false} className={s.body} />}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
