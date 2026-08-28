import React from 'react'

import type { ServicesBenefitsBlock as ServicesBenefitsBlockProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { FaIcon } from '@/components/shared/FaIcon'
import { Media } from '@/components/Media'
import { VideoModal } from '@/components/shared/VideoModal'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { BENEFIT_ICONS, type BenefitIcon } from './icons'
import { servicesBenefitsStyles as s } from './ServicesBenefits.styles'

export const ServicesBenefitsBlockComponent: React.FC<ServicesBenefitsBlockProps> = ({
  heading,
  subheading,
  benefits,
  image,
  videoUrl,
  videoStill,
  videoTitle,
  sectionLayout,
}) => {
  const items = benefits ?? []

  if (!items.length) return null

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
      <Container>
        <div className={s.header}>
          <Text as="h2" textStyle="span" text={heading} className={s.heading} />
          {subheading?.trim() && (
            <Text as="p" textStyle="span" text={subheading} className={s.subheading} />
          )}
        </div>
        <div className={s.grid}>
          <div className={s.items}>
            {items.map((item) => (
              <div key={item.id} className={s.item}>
                <span className={s.icon}>
                  <FaIcon
                    icon={BENEFIT_ICONS[item.icon as BenefitIcon].icon}
                    className={s.iconGlyph}
                  />
                </span>
                <div>
                  <Text as="h3" textStyle="span" text={item.title} className={s.itemTitle} />
                  <Text as="p" textStyle="span" text={item.body} className={s.itemBody} />
                </div>
              </div>
            ))}
          </div>
          {image && (
            <div>
              <Media
                resource={image}
                htmlElement={null}
                imgClassName={s.image}
                size="(min-width: 768px) 50vw, 100vw"
              />
            </div>
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
      </Container>
    </SectionWrapper>
  )
}
