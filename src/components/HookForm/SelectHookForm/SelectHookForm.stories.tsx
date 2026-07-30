import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { SelectHookForm } from './SelectHookForm'

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
]

const meta: Meta<typeof SelectHookForm> = {
  title: 'Hook Form/SelectHookForm',
  component: SelectHookForm,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof SelectHookForm>

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
      <SelectHookForm
        name="test"
        control={useForm().control}
        options={options}
        placeholder="Select an option"
      />
    </FormWrapper>
  ),
}

export const WithLabel: Story = {
  render: () => (
    <FormWrapper defaultValues={{ test: '' }}>
      <SelectHookForm
        name="test"
        control={useForm().control}
        label="Test Label"
        options={options}
        placeholder="Select an option"
      />
    </FormWrapper>
  ),
}

export const Disabled: Story = {
  render: () => (
    <FormWrapper defaultValues={{ test: '' }}>
      <SelectHookForm
        name="test"
        control={useForm().control}
        label="Test Label"
        options={options}
        placeholder="Select an option"
        disabled
      />
    </FormWrapper>
  ),
}
