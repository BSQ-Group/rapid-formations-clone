import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { DatePickerHookForm } from './DatePickerHookForm'

const meta: Meta<typeof DatePickerHookForm> = {
  title: 'Hook Form/DatePickerHookForm',
  component: DatePickerHookForm,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof DatePickerHookForm>

const FormWrapper = ({
  children,
  defaultValues = {},
}: {
  children: React.ReactNode
  defaultValues?: Record<string, unknown>
}) => {
  const methods = useForm({ defaultValues })
  return <FormProvider {...methods}>{children}</FormProvider>
}

export const Default: Story = {
  render: () => (
    <FormWrapper defaultValues={{ date: '' }}>
      <DatePickerHookForm
        name="date"
        control={useForm().control}
        placeholder="Select a date"
      />
    </FormWrapper>
  ),
}

export const WithLabel: Story = {
  render: () => (
    <FormWrapper defaultValues={{ date: '' }}>
      <DatePickerHookForm
        name="date"
        control={useForm().control}
        label="Date of Birth"
        placeholder="Select a date"
      />
    </FormWrapper>
  ),
}

export const Disabled: Story = {
  render: () => (
    <FormWrapper defaultValues={{ date: '' }}>
      <DatePickerHookForm
        name="date"
        control={useForm().control}
        label="Date of Birth"
        placeholder="Select a date"
        disabled
      />
    </FormWrapper>
  ),
}
