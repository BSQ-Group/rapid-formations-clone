import React from 'react'
import Image from 'next/image'

import type {
  RegisterCompanyStepsBlock as RegisterCompanyStepsBlockProps,
  Media,
} from '@/payload-types'

import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { registerCompanyStepsStyles as s } from './RegisterCompanySteps.styles'
import { getStepOverlay } from './StepCardOverlay'

type Props = RegisterCompanyStepsBlockProps

function getMediaUrl(media: string | Media | null | undefined): string {
  if (!media || typeof media !== 'object') return ''
  return media.url ?? ''
}

function getMediaAlt(media: string | Media | null | undefined): string {
  if (!media || typeof media !== 'object') return ''
  return media.alt ?? ''
}

export const RegisterCompanyStepsBlock: React.FC<Props> = ({
  title,
  subtitle,
  steps,
  sectionLayout,
}) => {
  return (
    <SectionWrapper {...sectionLayout}>
      <div className={s.section}>
        <div className={s.header}>
          {title && <Text as="h2" textStyle="headline-5xl" text={title} className={s.title} />}
          {subtitle && <Text textStyle="body-base" text={subtitle} className={s.subtitle} />}
        </div>
        {steps && steps.length > 0 && (
          <div className={s.cardsWrapper}>
            <div className={s.cardsTrack}>
              {steps.map((step, i) => (
                <div key={step.id ?? i} className={s.card}>
                  <div className={s.cardImage}>
                    {getMediaUrl(step.image) && (
                      <Image
                        src={getMediaUrl(step.image)}
                        alt={getMediaAlt(step.image)}
                        fill
                        className="object-cover"
                      />
                    )}
                    {getStepOverlay(i)}
                  </div>
                  <div className={s.cardBody}>
                    <Text
                      textStyle="headline-xl"
                      text={String(i + 1).padStart(2, '0')}
                      className={s.stepNumber}
                    />
                    <div className={s.cardText}>
                      <Text textStyle="body-lg" text={step.title} className={s.stepTitle} />
                      <Text
                        textStyle="body-sm"
                        text={step.description}
                        className={s.stepDescription}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </SectionWrapper>
  )
}
