import React from 'react'

import type { Media as MediaType, TitleBannerBlock as TitleBannerProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { Media } from '@/components/Media'
import Text from '@/components/shared/Text'
import { titleBannerStyles as s } from './TitleBanner.styles'

export const TitleBanner: React.FC<TitleBannerProps> = ({ title, image, isPageTitle, variant }) => {
  const heading = title?.trim()

  if (!image) return null

  if (variant === 'imageBleed' || variant === 'imageContained') {
    const intrinsic = typeof image === 'object' ? (image as MediaType).width : undefined
    const frameWidth = !intrinsic || intrinsic >= 1920 ? 1170 : intrinsic
    const media = (
      <div className={s.imageFrame} style={{ maxWidth: `${frameWidth}px` }}>
        <Media
          resource={image}
          priority
          htmlElement={null}
          imgClassName={s.bannerImage}
          size={`(min-width: ${frameWidth}px) ${frameWidth}px, 100vw`}
        />
      </div>
    )

    return (
      <section className={s.imageSection}>
        {variant === 'imageBleed' ? media : <Container>{media}</Container>}
      </section>
    )
  }

  return (
    <section className={s.section}>
      <Media
        resource={image}
        fill
        priority
        htmlElement={null}
        imgClassName={s.image}
        size="100vw"
      />
      {heading && (
        <div className={s.flex}>
          <Container>
            <div className={s.content}>
              <Text
                as={isPageTitle === false ? 'p' : 'h1'}
                textStyle="span"
                text={heading}
                className={s.title}
              />
            </div>
          </Container>
        </div>
      )}
    </section>
  )
}
