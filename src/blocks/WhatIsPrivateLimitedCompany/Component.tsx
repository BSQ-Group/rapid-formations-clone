import React from 'react'

import type { WhatIsPrivateLimitedCompanyBlock as WhatIsPrivateLimitedCompanyBlockProps } from '@/payload-types'

import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { Media } from '@/components/Media'
import { whatIsPrivateLimitedCompanyStyles as s } from './WhatIsPrivateLimitedCompany.styles'

export const WhatIsPrivateLimitedCompanyBlock: React.FC<
  WhatIsPrivateLimitedCompanyBlockProps
> = ({ title, paragraphs, image, sectionLayout }) => {
  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <div className={s.container}>
        {image && typeof image === 'object' && (
          <div className={s.image}>
            <Media resource={image} fill imgClassName={s.imageEl} />
          </div>
        )}
        <div className={s.textCol}>
          {title && (
            <Text text={title} as="h2" textStyle="span" className={s.title} />
          )}
          {paragraphs && paragraphs.length > 0 && (
            <div className={s.paragraphs}>
              {paragraphs.map((p) => (
                <Text
                  key={p.id}
                  text={p.text}
                  textStyle="span"
                  asChild
                  className={s.paragraph}
                >
                  <p />
                </Text>
              ))}
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  )
}
