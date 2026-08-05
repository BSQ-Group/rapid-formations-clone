'use client'

import { Check } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { heroStepperStyles as s } from './HeroStepper.styles'

type Step = { label: string }

type StepState = 'complete' | 'active' | 'inactive'

function getStepState(index: number, currentStep: number): StepState {
  const oneIndexed = index + 1
  if (oneIndexed < currentStep) return 'complete'
  if (oneIndexed === currentStep) return 'active'
  return 'inactive'
}

function StepNode({ state, number }: { state: StepState; number: number }) {
  if (state === 'complete') {
    return (
      <div className={s.nodeOuter}>
        <div className={s.nodeComplete}>
          <Check size={14} className={s.nodeIcon} strokeWidth={2.5} aria-hidden />
        </div>
      </div>
    )
  }
  if (state === 'active') {
    return (
      <div className={s.nodeOuter}>
        <div className={s.nodeActive}>
          <span className={s.nodeNumber}>{number}</span>
        </div>
      </div>
    )
  }
  return (
    <div className={s.nodeOuter}>
      <div className={s.nodeInactive}>
        <span className={s.nodeNumberInactive}>{number}</span>
      </div>
    </div>
  )
}

interface Props {
  steps: Step[]
  currentStep: number
}

export function HeroStepperClient({ steps, currentStep }: Props) {
  return (
    <>
      <div className={s.wrapper}>
        <div className={s.inner}>
          <div className={s.compact}>
            <div className={s.compactHeader}>
              <span className={s.compactEyebrow}>
                Step {currentStep} of {steps.length}
              </span>
              <span className={s.compactLabel}>{steps[currentStep - 1]?.label ?? ''}</span>
            </div>
            <div className={s.progressTrack}>
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={i < currentStep ? s.progressSegmentFilled : s.progressSegmentEmpty}
                />
              ))}
            </div>
          </div>
          <div className={s.full}>
            {steps.map((step, i) => {
              const state = getStepState(i, currentStep)
              const isFirst = i === 0
              const isLast = i === steps.length - 1
              const prevState = i > 0 ? getStepState(i - 1, currentStep) : null
              const lineBeforeFilled = prevState === 'complete'

              return (
                <div key={i} className={cn(s.stepSlot, isLast && 'flex-none')}>
                  {!isFirst && <div className={lineBeforeFilled ? s.lineFilled : s.lineEmpty} />}
                  <StepNode state={state} number={i + 1} />
                  <span
                    className={
                      state === 'inactive'
                        ? s.labelInactive
                        : state === 'active'
                          ? s.labelActive
                          : s.labelComplete
                    }
                  >
                    {step.label}
                  </span>
                  {!isLast && <div className={state === 'complete' ? s.lineFilled : s.lineEmpty} />}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
