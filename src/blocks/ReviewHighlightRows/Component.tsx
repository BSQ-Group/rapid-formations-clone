import React from 'react'

import type { ReviewHighlightRowsBlock as ReviewHighlightRowsBlockProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { Media } from '@/components/Media'
import { RatingStars } from '@/components/shared/RatingStars'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { initialsOf } from '@/utilities/formatting'
import { cn } from '@/utilities/ui'
import { reviewHighlightRowsStyles as s } from './ReviewHighlightRows.styles'

export const ReviewHighlightRowsBlockComponent: React.FC<ReviewHighlightRowsBlockProps> = ({
  rows,
  startsTinted,
  sectionLayout,
}) => {
  const bands = rows ?? []

  if (!bands.length) return null

  return (
    <SectionWrapper
      as="div"
      background={sectionLayout?.background ?? 'light'}
      paddingTop={sectionLayout?.paddingTop ?? 'none'}
      paddingBottom={sectionLayout?.paddingBottom ?? 'none'}
    >
      {bands.map((row, index) => {
        const { quote } = row
        const tinted = (index + (startsTinted ? 1 : 0)) % 2 === 1
        return (
          <section
            key={row.id ?? index}
            className={cn(s.section, tinted ? s.background.tinted : s.background.plain)}
          >
            <Container className={s.wrapperPad}>
              <div className={cn(s.row, !row.image && s.rowTextOnly)}>
                {row.image && (
                  <div
                    className={cn(
                      s.imageColumn,
                      row.imagePosition !== 'left' && s.imageColumnRight,
                    )}
                  >
                    <Media
                      resource={row.image}
                      htmlElement={null}
                      pictureClassName={s.imagePicture}
                      imgClassName={s.image}
                      size="(min-width: 768px) 400px, 100vw"
                    />
                  </div>
                )}
                <div className={s.content}>
                  <Text as="h2" textStyle="span" text={row.title} className={s.title} />
                  <Text as="p" textStyle="span" text={row.body} className={s.body} />
                  {quote && (
                    <div
                      className={s.quote}
                      style={{
                        backgroundColor: quote.backgroundColour,
                        borderColor: quote.borderColour,
                      }}
                    >
                      <div className={s.avatar} style={{ backgroundColor: quote.accentColour }}>
                        <Text
                          textStyle="span"
                          text={initialsOf(quote.authorName)}
                          className={s.avatarText}
                        />
                      </div>
                      <div>
                        <div className={s.quoteStarsRow}>
                          <RatingStars score={quote.rating ?? 5} size="sm" />
                        </div>
                        <Text as="p" textStyle="span" text={quote.text} className={s.quoteText} />
                        <div className={s.user} style={{ color: quote.accentColour }}>
                          <Text textStyle="span" text={quote.authorName} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Container>
          </section>
        )
      })}
    </SectionWrapper>
  )
}
