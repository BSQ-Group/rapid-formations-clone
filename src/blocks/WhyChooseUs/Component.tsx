import React from 'react'

import type { WhyChooseUsBlock as WhyChooseUsBlockProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import { SnapCarousel } from '@/components/shared/SnapCarousel/SnapCarousel'
import Text from '@/components/shared/Text'
import { whyChooseUsStyles as s } from './WhyChooseUs.styles'

type Props = WhyChooseUsBlockProps

export const WhyChooseUsBlock: React.FC<Props> = ({ heading, panes, sectionLayout }) => {
  if (!panes?.length) return null

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container>
        <Text as="h2" textStyle="span" text={heading} className={s.heading} />
        <div className={s.carousel}>
          <SnapCarousel
            as="ul"
            label={heading ?? 'Why register your company with us'}
            className={s.track}
            slideClassName={s.slide}
            arrows
            arrowsClassName={s.arrows}
          >
            {panes.map((pane, index) => (
              <div key={pane.id ?? index} className={s.pane}>
                <div className={s.copy}>
                  <Text as="h3" textStyle="span" text={pane.title} className={s.title} />
                  {pane.body && (
                    <RichText
                      data={pane.body}
                      enableGutter={false}
                      enableProse={false}
                      className={s.body}
                    />
                  )}
                </div>
                {pane.image && typeof pane.image === 'object' && (
                  <div className={s.imageWrap}>
                    <Media resource={pane.image} alt={pane.title} fill imgClassName={s.image} />
                  </div>
                )}
              </div>
            ))}
          </SnapCarousel>
        </div>
      </Container>
    </SectionWrapper>
  )
}
