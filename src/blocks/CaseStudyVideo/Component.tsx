import React from 'react'

import type { CaseStudyVideoBlock as CaseStudyVideoBlockProps } from '@/payload-types'

import { AutoplayVideo } from '@/components/shared/AutoplayVideo'
import { Container } from '@/components/shared/Container/Container'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { caseStudyVideoStyles as s } from './CaseStudyVideo.styles'

export const CaseStudyVideoBlock: React.FC<CaseStudyVideoBlockProps> = ({
  heading,
  subheading,
  posterImage,
  videoUrl,
  captionsUrl,
  autoplayInView,
  sectionLayout,
}) => {
  const poster =
    posterImage && typeof posterImage === 'object' && posterImage.url
      ? getMediaUrl(posterImage.url)
      : undefined

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container>
        <div className={s.header}>
          <Text as="h2" textStyle="span" text={heading} className={s.heading} />
          {subheading && (
            <Text as="p" textStyle="span" text={subheading} className={s.subheading} />
          )}
        </div>
        {videoUrl && (
          <AutoplayVideo
            src={videoUrl}
            poster={poster}
            captionsUrl={captionsUrl}
            title={`${heading} video`}
            autoplay={autoplayInView}
          />
        )}
      </Container>
    </SectionWrapper>
  )
}
