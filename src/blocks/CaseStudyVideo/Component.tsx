import React from 'react'

import type { CaseStudyVideoBlock as CaseStudyVideoBlockProps } from '@/payload-types'

import { AutoplayVideo } from '@/components/shared/AutoplayVideo'
import { Container } from '@/components/shared/Container/Container'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import { SectionTitle } from '@/components/shared/SectionTitle'
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
        <SectionTitle title={heading} subtitle={subheading} className={s.header} />
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
