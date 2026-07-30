import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { QuestionYesNo, QuestionYesNoProps } from './QuestionYesNo'
import '@/components/shared/QuestionYesNo/QuestionYesNo.css'
import { action } from 'storybook/actions'

const meta: Meta<QuestionYesNoProps> = {
  title: 'Shared/QuestionYesNo',
  component: QuestionYesNo,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Yes/No toggle aligned with onboarding residential address styling: surface-primary card, tertiary-light buttons, active state uses button-tertiary-selected.',
      },
    },
  },
  argTypes: {
    question: { control: 'text' },
    value: { control: 'boolean' },
    onValueChange: { action: 'onValueChange' },
  },
}

export default meta

type Story = StoryObj<QuestionYesNoProps>

function StatefulQuestionYesNo(props: Omit<QuestionYesNoProps, 'value' | 'onValueChange'> & { initialValue?: boolean }) {
  const { initialValue = true, ...rest } = props
  const [value, setValue] = useState(initialValue)
  return (
    <QuestionYesNo
      {...rest}
      value={value}
      onValueChange={(v) => {
        setValue(v)
        action('onValueChange')(v)
      }}
    />
  )
}

export const Default: Story = {
  render: () => (
    <StatefulQuestionYesNo question="Is your business registered in the UK?" initialValue={true} />
  ),
}

export const YesSelected: Story = {
  render: () => (
    <StatefulQuestionYesNo question="Do you collect customer data?" initialValue={true} />
  ),
}

export const NoSelected: Story = {
  render: () => (
    <StatefulQuestionYesNo question="Do you use CCTV for work?" initialValue={false} />
  ),
}
