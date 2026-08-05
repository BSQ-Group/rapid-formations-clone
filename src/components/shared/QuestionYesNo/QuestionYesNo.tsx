'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import './QuestionYesNo.css'

export interface QuestionYesNoProps {
  question: string
  value: boolean
  onValueChange: (value: boolean) => void
  className?: string
}

export const QuestionYesNo: React.FC<QuestionYesNoProps> = ({
  question,
  value,
  onValueChange,
  className = '',
}) => {
  return (
    <div className={cn('question-yes-no', className)}>
      <div className="question-yes-no__row">
        <span className="question-yes-no__question">{question}</span>
        <div className="question-yes-no__toggle-group">
          <Button
            variant="tertiary-light"
            type="button"
            className={cn('question-yes-no__toggle', value && 'active')}
            onClick={() => onValueChange(true)}
            aria-pressed={value}
          >
            Yes
          </Button>
          <Button
            variant="tertiary-light"
            type="button"
            className={cn('question-yes-no__toggle', !value && 'active')}
            onClick={() => onValueChange(false)}
            aria-pressed={!value}
          >
            No
          </Button>
        </div>
      </div>
    </div>
  )
}
