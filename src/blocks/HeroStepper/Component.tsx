import React from 'react'
import type { HeroStepperBlock as HeroStepperBlockProps } from '@/payload-types'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import { HeroStepperClient } from './HeroStepperClient'

export const HeroStepperBlock: React.FC<HeroStepperBlockProps> = ({ steps, currentStep, sectionLayout }) => {
  if (!steps?.length) return null

  const normalizedSteps = steps.map((s) => ({ label: s.label }))
  const clampedStep = Math.max(1, Math.min(currentStep ?? 1, normalizedSteps.length))

  return (
    <SectionWrapper {...sectionLayout}>
      <HeroStepperClient steps={normalizedSteps} currentStep={clampedStep} />
    </SectionWrapper>
  )
}
