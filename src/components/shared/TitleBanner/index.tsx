import React from 'react'

import type { Media as MediaType, TitleBannerBlock as TitleBannerProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { Media } from '@/components/Media'
import Text from '@/components/shared/Text'
import { cn } from '@/utilities/ui'
import { titleBannerStyles as s } from './TitleBanner.styles'

export const TitleBanner: React.FC<TitleBannerProps> = ({
  title,
  subtitle,
  badge,
  hideTextOnMobile,
  image,
  isPageTitle,
  variant,
  backdrop,
  naturalHeight,
}) => {
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
          imgClassName={cn(s.bannerImage, !naturalHeight && s.bannerImageCapped)}
          size={`(min-width: ${frameWidth}px) ${frameWidth}px, 100vw`}
        />
      </div>
    )

    return (
      <section
        className={cn(s.imageSection, variant === 'imageContained' && s.imageSectionContained)}
      >
        <div className={s.backdrop[backdrop ?? 'none'] ?? s.backdrop.none}>
          {variant === 'imageBleed' ? (
            media
          ) : (
            <Container>{media}</Container>
          )}
        </div>
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
      {(heading || subtitle?.trim() || badge?.trim()) && (
        <div className={cn(s.flex, hideTextOnMobile && s.textOnDesktopOnly)}>
          <Container>
            <div className={s.content}>
              {heading && (
                <Text
                  as={isPageTitle === false ? 'p' : 'h1'}
                  textStyle="span"
                  text={heading}
                  className={s.title}
                />
              )}
              {subtitle?.trim() && (
                <Text as="p" textStyle="span" text={subtitle} className={s.subtitle} />
              )}
              {badge?.trim() && (
                <p className={s.badgeWrap}>
                  <span className={s.badge}>{badge}</span>
                </p>
              )}
            </div>
          </Container>
        </div>
      )}
    </section>
  )
}
