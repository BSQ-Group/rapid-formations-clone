import React from 'react'

import type { CustomerQuoteBlock as CustomerQuoteBlockProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { Media } from '@/components/Media'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
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
  const poster = image && typeof image === 'object' ? image : null

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container>
        <figure className={cn(s.panel, !poster && s.panelSolo)}>
          <div className={cn(s.textCol, !poster && s.textColSolo)}>
            <Text as="h2" textStyle="span" text={quote} className={s.quote} />
            <figcaption>
              <Text as="p" textStyle="span" text={authorName} className={s.authorName} />
              <Text textStyle="span" text={authorRole} className={s.authorRole} />
            </figcaption>
          </div>
          {poster && (
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
                    <Media resource={poster} fill imgClassName={s.image} />
                  </span>
                </VideoModal>
              ) : (
                <div className={s.imageWrap}>
                  <Media resource={poster} fill imgClassName={s.image} />
                </div>
              )}
            </div>
          )}
        </figure>
      </Container>
    </SectionWrapper>
  )
}
