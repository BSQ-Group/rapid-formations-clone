import React from 'react'

import type { HowItWorksScreensBlock as HowItWorksScreensBlockProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { Media } from '@/components/Media'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { cn } from '@/utilities/ui'
import { howItWorksScreensStyles as s } from './HowItWorksScreens.styles'

export const HowItWorksScreensBlockComponent: React.FC<HowItWorksScreensBlockProps> = ({
  heading,
  chrome,
  screens,
  sectionLayout,
}) => {
  const items = (screens ?? []).filter((screen) => screen.image)

  if (!items.length) return null

  const withChrome = chrome !== false
  const columns = { '--screen-count': String(items.length) } as React.CSSProperties

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container>
        {heading && <Text as="h2" textStyle="span" text={heading} className={s.heading} />}
        <div className={s.grid} style={columns}>
          {items.map((screen) => {
            const image = (
              <Media
                resource={screen.image}
                htmlElement={null}
                imgClassName={s.screen}
                size="(min-width: 768px) 33vw, 100vw"
              />
            )
            return (
              <div key={screen.id} className={s.item}>
                {withChrome ? (
                  <div className={s.window}>
                    <div className={s.bar}>
                      <div className={s.dots}>
                        <span className={cn(s.dot, s.dotRed)} />
                        <span className={cn(s.dot, s.dotAmber)} />
                        <span className={cn(s.dot, s.dotGreen)} />
                      </div>
                    </div>
                    {image}
                  </div>
                ) : (
                  <div className={s.plain}>{image}</div>
                )}
                <div className={s.captionWrap}>
                  <Text as="p" textStyle="span" text={screen.caption} className={s.caption} />
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </SectionWrapper>
  )
}
