import React from 'react'
import { Check } from 'lucide-react'

import type { HowItWorksListBlock as HowItWorksListBlockProps } from '@/payload-types'

import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { howItWorksListStyles as s } from './HowItWorksList.styles'

export const HowItWorksListBlock: React.FC<HowItWorksListBlockProps> = ({
  stepsHeading,
  steps,
  includedHeading,
  includedItems,
  sectionLayout,
}) => {
  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <div className={s.container}>
        <div className={s.stepsCol}>
          {stepsHeading && (
            <Text as="h2" textStyle="headline-4xl" text={stepsHeading} className={s.heading} />
          )}
          {steps && steps.length > 0 && (
            <ol className={s.list}>
              {steps.map((step, index) => (
                <li key={step.id ?? index} className={s.stepRow}>
                  <Text
                    textStyle="body-lg"
                    text={`${index + 1}.`}
                    aria-hidden="true"
                    className={s.stepNumber}
                  />
                  <Text textStyle="body-base" text={step.text} className={s.stepText} />
                </li>
              ))}
            </ol>
          )}
        </div>
        <div className={s.includedCol}>
          {includedHeading && (
            <Text
              as="h2"
              textStyle="headline-4xl"
              text={includedHeading}
              className={s.heading}
            />
          )}
          {includedItems && includedItems.length > 0 && (
            <ul className={s.list}>
              {includedItems.map((item, index) => (
                <li key={item.id ?? index} className={s.includedRow}>
                  <span className={s.iconBubble} aria-hidden="true">
                    <Check size={16} strokeWidth={2.5} className={s.iconCheck} />
                  </span>
                  <Text textStyle="body-base" text={item.text} className={s.includedText} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </SectionWrapper>
  )
}
