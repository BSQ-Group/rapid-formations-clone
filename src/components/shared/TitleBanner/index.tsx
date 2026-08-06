import React from 'react'

import type { TitleBannerBlock as TitleBannerProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { Media } from '@/components/Media'
import Text from '@/components/shared/Text'
import { titleBannerStyles as s } from './TitleBanner.styles'

export const TitleBanner: React.FC<TitleBannerProps> = ({
  title,
  image,
  isPageTitle,
  variant,
}) => {
  const heading = title?.trim()

  if (!image) return null

  if (variant === 'imageBleed' || variant === 'imageContained') {
    const media = (
      <div className={s.imageFrame}>
        <Media
          resource={image}
          priority
          htmlElement={null}
          imgClassName={s.bannerImage}
          size="(min-width: 1170px) 1170px, 100vw"
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
