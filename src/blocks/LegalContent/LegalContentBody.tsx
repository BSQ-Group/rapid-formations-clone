import React from 'react'

import type { LegalContentBlock as LegalContentBlockProps } from '@/payload-types'

import Text from '@/components/shared/Text'
import RichText from '@/components/RichText'
import { legalContentStyles as s } from './LegalContent.styles'

type Props = Pick<LegalContentBlockProps, 'pageTitle' | 'sections'>

const slugify = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export function LegalContentBody({ pageTitle, sections }: Props) {
  return (
    <div className={s.contentArea}>
      {pageTitle && (
        <Text as="h1" text={pageTitle} textStyle="headline-5xl" className={s.pageTitle} />
      )}
      {sections && sections.length > 0 && (
        <div className={s.sectionsList}>
          {sections.map((section) => (
            <div key={section.id} id={slugify(section.heading)} className={s.sectionItem}>
              <Text
                as="h2"
                text={section.heading}
                textStyle="headline-3xl"
                className={s.sectionHeading}
              />
              {section.intro && (
                <RichText data={section.intro} enableGutter={false} className={s.intro} />
              )}
              {section.subsections && section.subsections.length > 0 && (
                <div className={s.subsectionsList}>
                  {section.subsections.map((sub) => (
                    <div key={sub.id} id={slugify(sub.heading)} className={s.subsectionItem}>
                      <Text
                        as="h3"
                        text={sub.heading}
                        textStyle="headline-2xl"
                        className={s.subsectionHeading}
                      />
                      <RichText
                        data={sub.body}
                        enableGutter={false}
                        className={s.subsectionBody}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
