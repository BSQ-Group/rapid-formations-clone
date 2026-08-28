import React from 'react'

import type { ReviewHighlightRowsBlock as ReviewHighlightRowsBlockProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { Media } from '@/components/Media'
import { RatingStars } from '@/components/shared/RatingStars'
import Text from '@/components/shared/Text'
import { initialsOf } from '@/utilities/formatting'
import { cn } from '@/utilities/ui'
import { reviewHighlightRowsStyles as s } from './ReviewHighlightRows.styles'

export const ReviewHighlightRowsBlockComponent: React.FC<ReviewHighlightRowsBlockProps> = ({
  rows,
}) => {
  const bands = rows ?? []

  if (!bands.length) return null

  return (
    <>
      {bands.map((row, index) => {
        const { quote } = row
        return (
          <section
            key={row.id}
            className={cn(s.section, index % 2 === 0 ? s.background.plain : s.background.tinted)}
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
                      <RatingStars score={5} size="sm" className={s.quoteStars} />
                      <Text as="p" textStyle="span" text={quote.text} className={s.quoteText} />
                      <div className={s.user} style={{ color: quote.accentColour }}>
                        <Text textStyle="span" text={quote.authorName} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </section>
        )
      })}
    </>
  )
}
