import React from 'react'

import type { FormationVideoBlock as FormationVideoBlockProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { Media } from '@/components/Media'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import { SectionTitle } from '@/components/shared/SectionTitle'
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
        <SectionTitle
          title={heading}
          subtitle={subheading}
          className={s.header}
          subtitleClassName="mb-2"
        />
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
