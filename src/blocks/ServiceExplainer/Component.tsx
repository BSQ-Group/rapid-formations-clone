import React from 'react'

import type { ServiceExplainerBlock as ServiceExplainerBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Container } from '@/components/shared/Container/Container'
import { Media } from '@/components/Media'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { VideoModal } from '@/components/shared/VideoModal'
import { serviceExplainerStyles as s } from './ServiceExplainer.styles'

export const ServiceExplainerBlockComponent: React.FC<ServiceExplainerBlockProps> = ({
  heading,
  subheading,
  videoUrl,
  videoStill,
  videoTitle,
  image,
  contentTitle,
  contentBody,
  cta,
  sectionLayout,
}) => {
  const still = videoStill ? (
    <Media
      resource={videoStill}
      htmlElement={null}
      pictureClassName={s.stillPicture}
      imgClassName={s.still}
      size={s.stillSizes}
    />
  ) : null
  const label = videoTitle?.trim() || heading

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container className={s.container}>
        <div className={s.header}>
          <Text as="h2" textStyle="span" text={heading} className={s.heading} />
          {subheading?.trim() && (
            <Text as="p" textStyle="span" text={subheading} className={s.subheading} />
          )}
        </div>
        {still && (
          <div className={s.videoWrap}>
            {videoUrl ? (
              <VideoModal
                videoUrl={videoUrl}
                title={label}
                triggerLabel={`Play video: ${label}`}
                className={s.trigger}
                playIconClassName={s.playIcon}
              >
                {still}
              </VideoModal>
            ) : (
              still
            )}
          </div>
        )}
        <div className={s.content}>
          <div>
            {image && (
              <Media
                resource={image}
                htmlElement={null}
                pictureClassName={s.imagePicture}
                imgClassName={s.image}
                size={s.imageSizes}
              />
            )}
          </div>
          <div>
            {contentTitle?.trim() && (
              <Text as="h3" textStyle="span" text={contentTitle} className={s.contentTitle} />
            )}
            {contentBody?.trim() && (
              <Text as="p" textStyle="span" text={contentBody} className={s.contentBody} />
            )}
            {cta?.label && (
              <div className={s.ctaWrap}>
                <CMSLink {...cta} appearance="success" size="promo" className={s.cta} />
              </div>
            )}
          </div>
        </div>
      </Container>
    </SectionWrapper>
  )
}
