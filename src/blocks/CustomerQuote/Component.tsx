import React from 'react'

import type { CustomerQuoteBlock as CustomerQuoteBlockProps } from '@/payload-types'

import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { Media } from '@/components/Media'
import { Container } from '@/components/shared/Container/Container'
import { VideoModal } from '@/components/shared/VideoModal'
import { cn } from '@/utilities/ui'
import { customerQuoteStyles as s } from './CustomerQuote.styles'

export const CustomerQuoteBlock: React.FC<CustomerQuoteBlockProps> = ({
  quote,
  authorName,
  authorRole,
  image,
  videoUrl,
  sectionLayout,
}) => {
  const hasImage = Boolean(image && typeof image === 'object')

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container>
        <figure className={s.panel}>
          {image && typeof image === 'object' && (
            <div className={s.imageCol}>
              {videoUrl ? (
                <VideoModal
                  videoUrl={videoUrl}
                  title={`Case study video: ${authorName}`}
                  triggerLabel={`Play video: ${authorName}`}
                  className={s.posterButton}
                  playIconClassName={s.playIcon}
                >
                  <span className={s.posterMedia}>
                    <Media resource={image} fill imgClassName={s.image} />
                  </span>
                </VideoModal>
              ) : (
                <div className={s.imageWrap}>
                  <Media resource={image} fill imgClassName={s.image} />
                </div>
              )}
            </div>
          )}
          <div className={cn(s.textCol, !hasImage && s.textColSolo)}>
            <div className={cn(s.quoteWrap, !hasImage && s.quoteWrapSolo)}>
              <Text as="h2" textStyle="span" text={quote} className={s.quote} />
            </div>
            <figcaption>
              <Text as="p" textStyle="span" text={authorName} className={s.authorName} />
              <Text textStyle="span" text={authorRole} className={s.authorRole} />
            </figcaption>
          </div>
        </figure>
      </Container>
    </SectionWrapper>
  )
}
