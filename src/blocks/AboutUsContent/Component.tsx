import React from 'react'

import { faHeart } from '@fortawesome/pro-solid-svg-icons/faHeart'
import { faUser } from '@fortawesome/pro-solid-svg-icons/faUser'

import type { AboutUsContentBlock as AboutUsContentBlockProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { FaIcon } from '@/components/shared/FaIcon'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { cn } from '@/utilities/ui'
import { aboutUsContentStyles as s } from './AboutUsContent.styles'

const icons = { user: faUser, heart: faHeart } as const

export const AboutUsContentBlock: React.FC<AboutUsContentBlockProps> = ({
  variant,
  items,
  sectionLayout,
}) => {
  const layout = variant === 'imageRows' ? 'imageRows' : 'twoColumn'
  const isImageRows = layout === 'imageRows'

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container className={s.wrapperPad}>
        <div className={s.grid[layout]}>
          {(items ?? []).map((item) => {
            const still = item.image && typeof item.image === 'object' ? item.image : null

            const media = still ? (
              <Media
                resource={still}
                htmlElement={null}
                pictureClassName={s.imagePicture}
                imgClassName={cn(s.image, isImageRows && s.imageFlush)}
                size={s.imageSizes}
                loading="lazy"
              />
            ) : null

            const heading = item.title ? (
              <Text as="h3" textStyle="span" text={item.title} className={s.title} />
            ) : null

            return (
              <div
                key={item.id}
                className={cn(
                  s.item[layout],
                  !isImageRows && item.width !== 'full' && s.itemHalf,
                  item.width === 'full' && s.itemFull,
                  item.panel && s.panel,
                )}
              >
                {item.panel ? (
                  (item.panelGroups ?? []).map((group) => (
                    <div key={group.id} className={s.panelGroup}>
                      <FaIcon icon={icons[group.icon ?? 'user']} className={s.panelIcon} />
                      <Text
                        as="h3"
                        textStyle="span"
                        text={group.heading}
                        className={s.panelHeading}
                      />
                      {group.body && (
                        <RichText data={group.body} enableGutter={false} className={s.panelBody} />
                      )}
                    </div>
                  ))
                ) : isImageRows ? (
                  <>
                    {media}
                    <div>
                      {heading}
                      {item.body && (
                        <RichText data={item.body} enableGutter={false} className={s.body} />
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    {heading}
                    {media}
                    {item.body && (
                      <RichText data={item.body} enableGutter={false} className={s.body} />
                    )}
                  </>
                )}
              </div>
            )
          })}
        </div>
      </Container>
    </SectionWrapper>
  )
}
