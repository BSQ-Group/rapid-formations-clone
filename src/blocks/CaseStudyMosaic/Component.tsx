import React from 'react'

import type { CaseStudyMosaicBlock as CaseStudyMosaicBlockProps } from '@/payload-types'

import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import { Media } from '@/components/Media'
import Text from '@/components/shared/Text'
import { cn } from '@/utilities/ui'
import { Container } from '@/components/shared/Container/Container'
import { VideoModal } from '@/components/shared/VideoModal'
import { caseStudyMosaicStyles as s } from './CaseStudyMosaic.styles'

const COMPOSED_ITEM_COUNT = 6

export const CaseStudyMosaicBlock: React.FC<CaseStudyMosaicBlockProps> = ({
  heading,
  subheading,
  items,
  sectionLayout,
}) => {
  const list = items || []
  const isComposed = list.length === COMPOSED_ITEM_COUNT

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container>
        <div className={s.title}>
          <Text as="h2" textStyle="span" text={heading} className={s.heading} />
          {subheading && (
            <Text as="p" textStyle="span" text={subheading} className={s.subheading} />
          )}
        </div>
        <div className={cn(s.mosaic, isComposed ? s.mosaicComposed : s.mosaicFlow)}>
          {list.map((item, i) => {
            const tileClassName = cn(s.item, isComposed && s.itemPlacement[i])
            const tile = (
              <>
                {item.image && typeof item.image === 'object' && (
                  <Media
                    resource={item.image}
                    className={s.mediaWrap}
                    pictureClassName={s.mediaPicture}
                    size={s.imageSizes}
                    imgClassName={cn(s.image, isComposed && s.imageZoom[i])}
                  />
                )}
                <div className={s.caption}>
                  <Text as="p" textStyle="span" text={item.company} className={s.captionCompany} />
                  {item.category && (
                    <Text textStyle="span" text={item.category} className={s.captionCategory} />
                  )}
                </div>
              </>
            )
            return item.videoUrl ? (
              <VideoModal
                key={item.id || i}
                videoUrl={item.videoUrl}
                title={`Case study video: ${item.company}`}
                triggerLabel={`Play video: ${item.company}`}
                className={cn(tileClassName, s.itemVideo)}
                playIconClassName={s.playIcon}
              >
                {tile}
              </VideoModal>
            ) : (
              <div key={item.id || i} className={tileClassName}>
                {tile}
              </div>
            )
          })}
        </div>
      </Container>
    </SectionWrapper>
  )
}
