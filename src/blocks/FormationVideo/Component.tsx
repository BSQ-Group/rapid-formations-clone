import React from 'react'

import type { FormationVideoBlock as FormationVideoBlockProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { Media } from '@/components/Media'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { VideoModal } from '@/components/shared/VideoModal'
import { cn } from '@/utilities/ui'
import { formationVideoStyles as s } from './FormationVideo.styles'

export const FormationVideoBlock: React.FC<FormationVideoBlockProps> = ({
  heading,
  subheading,
  videoTitle,
  image,
  videoUrl,
  stillWidth,
  showPlayIcon,
  sectionLayout,
}) => {
  const isInset = stillWidth === 'inset'

  const still =
    image && typeof image === 'object' ? (
      <Media
        resource={image}
        className={s.mediaWrap}
        imgClassName={cn(s.image, isInset && s.imageInset)}
        size={isInset ? s.imageSizesInset : s.imageSizes}
        loading="lazy"
      />
    ) : null

  const title = videoTitle?.trim() || heading?.trim() || ''
  const gap = sectionLayout?.gap ?? 'inherit'

  return (
    <SectionWrapper
      {...sectionLayout}
      className={cn(s.section, gap === 'inherit' && s.inheritedGap)}
    >
      <Container>
        {(heading || subheading) && (
          <div className={s.header}>
            {heading && <Text as="h2" textStyle="span" text={heading} className={s.heading} />}
            {subheading && (
              <Text as="p" textStyle="span" text={subheading} className={s.subheading} />
            )}
          </div>
        )}
        <div className={s.videoWrap}>
          {videoUrl && still ? (
            <VideoModal
              videoUrl={videoUrl}
              title={title}
              triggerLabel={title ? `Play video: ${title}` : 'Play video'}
              className={cn(s.trigger, isInset ? s.triggerInset : s.triggerCapped)}
              playIconClassName={
                showPlayIcon ? cn(s.playIcon, !isInset && s.playIconFade) : s.playIconHidden
              }
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
