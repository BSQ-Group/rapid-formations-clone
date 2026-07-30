import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { InputHookForm } from './InputHookForm'

const meta: Meta<typeof InputHookForm> = {
  title: 'Hook Form/InputHookForm',
  component: InputHookForm,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof InputHookForm>

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
    <FormWrapper defaultValues={{ test: '' }}>
      <InputHookForm name="test" control={useForm().control} placeholder="Enter value" />
    </FormWrapper>
  ),
}

export const WithLabel: Story = {
  render: () => (
    <FormWrapper defaultValues={{ test: '' }}>
      <InputHookForm
        name="test"
        control={useForm().control}
        label="Test Label"
        placeholder="Enter value"
      />
    </FormWrapper>
  ),
}

export const Disabled: Story = {
  render: () => (
    <FormWrapper defaultValues={{ test: '' }}>
      <InputHookForm
        name="test"
        control={useForm().control}
        label="Test Label"
        placeholder="Enter value"
        disabled
      />
    </FormWrapper>
  ),
}
