import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { TextAreaHookForm } from './TextAreaHookForm'

const meta: Meta<typeof TextAreaHookForm> = {
  title: 'Hook Form/TextAreaHookForm',
  component: TextAreaHookForm,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof TextAreaHookForm>

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
      <TextAreaHookForm name="test" control={useForm().control} placeholder="Enter your message" />
    </FormWrapper>
  ),
}

export const WithLabel: Story = {
  render: () => (
    <FormWrapper defaultValues={{ test: '' }}>
      <TextAreaHookForm
        name="test"
        control={useForm().control}
        label="Message"
        placeholder="Enter your message"
      />
    </FormWrapper>
  ),
}

export const Disabled: Story = {
  render: () => (
    <FormWrapper defaultValues={{ test: '' }}>
      <TextAreaHookForm
        name="test"
        control={useForm().control}
        label="Message"
        placeholder="Enter your message"
        disabled
      />
    </FormWrapper>
  ),
}
