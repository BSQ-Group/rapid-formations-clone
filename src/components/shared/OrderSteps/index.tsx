'use client'

import React, { useEffect, useRef } from 'react'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faCartShopping } from '@fortawesome/pro-solid-svg-icons/faCartShopping'
import { faFileLines } from '@fortawesome/pro-solid-svg-icons/faFileLines'
import { faMagnifyingGlass } from '@fortawesome/pro-solid-svg-icons/faMagnifyingGlass'
import { faWindowFlip } from '@fortawesome/pro-solid-svg-icons/faWindowFlip'
import { faChevronRight } from '@fortawesome/pro-regular-svg-icons/faChevronRight'

import { FaIcon } from '@/components/shared/FaIcon'
import Text from '@/components/shared/Text'
import { cn } from '@/utilities/ui'
import { orderStepsStyles as s } from './OrderSteps.styles'

export type OrderStep = {
  number: number
  icon: IconDefinition
  label: string
  labelMobile: string
}

export const ORDER_STEPS: readonly OrderStep[] = [
  {
    number: 1,
    icon: faMagnifyingGlass,
    label: 'Choose Company Name',
    labelMobile: 'Choose Company\nName',
  },
  { number: 2, icon: faWindowFlip, label: 'Select Package', labelMobile: 'Select\nPackage' },
  { number: 3, icon: faCartShopping, label: 'Checkout & Pay', labelMobile: 'Checkout\n& Pay' },
  {
    number: 4,
    icon: faFileLines,
    label: 'Enter Company Details',
    labelMobile: 'Enter Company\nDetails',
  },
]

export type OrderStepsProps = {
  currentStep: number
  steps?: readonly OrderStep[]
  className?: string
}

export const OrderSteps: React.FC<OrderStepsProps> = ({
  currentStep,
  steps = ORDER_STEPS,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const step = containerRef.current?.querySelector<HTMLElement>(`[data-step="${currentStep}"]`)
    step?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }, [currentStep])

  return (
    <div ref={containerRef} className={cn(s.list, className)}>
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div
            data-step={step.number}
            aria-current={currentStep === step.number ? 'step' : undefined}
            className={cn(
              s.step,
              currentStep >= step.number && s.stepActive,
              currentStep === step.number && s.stepCurrent,
            )}
          >
            <div className={s.iconFrame}>
              <FaIcon icon={step.icon} className={s.icon} />
            </div>
            <div>
              <Text textStyle="span" text={step.label} className={cn(s.label, s.labelDesktop)} />
              <Text
                textStyle="span"
                text={step.labelMobile}
                className={cn(s.label, s.labelMobile)}
              />
            </div>
          </div>
          {index < steps.length - 1 && (
            <div className={cn(s.arrow, currentStep > step.number && s.arrowActive)}>
              <FaIcon icon={faChevronRight} className={s.arrowIcon} />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
