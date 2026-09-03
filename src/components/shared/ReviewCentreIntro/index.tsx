import React from 'react'

import type { ReviewCentreIntroBlock as ReviewCentreIntroProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { Media } from '@/components/Media'
import Text from '@/components/shared/Text'
import { reviewCentreIntroStyles as s } from './ReviewCentreIntro.styles'

export const ReviewCentreIntro: React.FC<ReviewCentreIntroProps> = ({
  image,
  title,
  isPageTitle,
  subtitle,
  body,
}) => {
  const heading = title?.trim()

  if (!image || !heading) return null

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
      <Container className={s.content}>
        <Text
          as={isPageTitle === false ? 'p' : 'h1'}
          textStyle="span"
          text={heading}
          className={s.title}
        />
        {subtitle?.trim() && (
          <Text as="h2" textStyle="span" text={subtitle} className={s.subtitle} />
        )}
        {body?.trim() && <Text as="p" textStyle="span" text={body} className={s.body} />}
      </Container>
    </section>
  )
}
