import React from 'react'

import type { FormationVideoBlock as FormationVideoBlockProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { Media } from '@/components/Media'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { VideoModal } from '@/components/shared/VideoModal'
import { formationVideoStyles as s } from './FormationVideo.styles'

export const FormationVideoBlock: React.FC<FormationVideoBlockProps> = ({
  heading,
  subheading,
  image,
  videoUrl,
  showPlayIcon,
  sectionLayout,
}) => {
  const still =
    image && typeof image === 'object' ? (
      <Media
        resource={image}
        className={s.mediaWrap}
        imgClassName={s.image}
        size={s.imageSizes}
        loading="lazy"
      />
    ) : null

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container>
        <div className={s.header}>
          <Text as="h2" textStyle="span" text={heading} className={s.heading} />
          {subheading && (
            <Text as="p" textStyle="span" text={subheading} className={s.subheading} />
          )}
        </div>
        <div className={s.videoWrap}>
          {videoUrl && still ? (
            <VideoModal
              videoUrl={videoUrl}
              title={heading}
              triggerLabel={`Play video: ${heading}`}
              className={s.trigger}
              playIconClassName={showPlayIcon ? s.playIcon : s.playIconHidden}
            >
              {still}
            </VideoModal>
          ) : (
            still
          )}
        </div>
      </Container>
    </SectionWrapper>
  )
}
