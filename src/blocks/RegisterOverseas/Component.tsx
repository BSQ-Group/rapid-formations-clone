import React from 'react'

import type { RegisterOverseasBlock as RegisterOverseasBlockProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { CtaLink } from '@/components/shared/CtaLink'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { cn } from '@/utilities/ui'
import { getLinkHref, type LinkData } from '@/utilities/links'
import { registerOverseasStyles as s } from './RegisterOverseas.styles'

export const RegisterOverseasBlock: React.FC<RegisterOverseasBlockProps> = ({
  sectionHeading,
  heading,
  body,
  cta,
  image,
  sectionLayout,
}) => {
  const ctaHref = getLinkHref(cta as LinkData | undefined)

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container>
        <Text as="h2" textStyle="span" text={sectionHeading} className={s.sectionHeading} />
        <div className={cn(s.panel, !image && s.panelNoImage)}>
          <div className={s.content}>
            <Text as="h3" textStyle="span" text={heading} className={s.heading} />
            {body && (
              <RichText data={body} enableGutter={false} enableProse={false} className={s.body} />
            )}
            {cta?.label && (
              <div className={s.ctaWrap}>
                <CtaLink href={ctaHref} label={cta.label} newTab={cta.newTab} size="lg" />
              </div>
            )}
          </div>
          {image && (
            <Media resource={image} className={s.imageWrap} imgClassName={s.image} loading="lazy" />
          )}
        </div>
      </Container>
    </SectionWrapper>
  )
}
