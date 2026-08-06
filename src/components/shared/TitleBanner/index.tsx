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
}) => {
  const heading = title?.trim()

  if (!image) return null

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
