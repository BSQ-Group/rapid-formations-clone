import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { Select } from './index'

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
  { value: 'option5', label: 'Option 5' },
]

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#111827' },
        { name: 'light', value: '#FFFFFF' },
      ],
    },
    docs: {
      description: {
        component:
          'All variants of the Select component. This showcases the complete range of options available including different sizes, states, and visual styles.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'large'],
      description: 'Size of the select component',
    },
    variant: {
      control: 'radio',
      options: ['default', 'checkbox'],
      description: 'Visual variant of the select',
    },
    multiSelect: {
      control: 'boolean',
      defaultValue: false,
      description: 'Whether multiple options can be selected',
    },
    state: {
      control: 'radio',
      options: ['default', 'error', 'disabled'],
      description:
        'State of the select component (automatically set based on error/disabled props)',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the select is disabled',
    },
    label: {
      control: 'text',
      description: 'Label text for the select',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no option is selected',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
  },
}

export default meta
type Story = StoryObj<typeof Select>

export const AllVariants: Story = {
  render: () => {
    const [defaultValue, setDefaultValue] = useState<string>('')
    const [smallValue, setSmallValue] = useState<string>('')
    const [errorValue, setErrorValue] = useState<string>('')
    const [disabledValue, setDisabledValue] = useState<string>('')
    const [multiValue, setMultiValue] = useState<string>('')
    const [preselectedValue, setPreselectedValue] = useState<string>('option2')

    const [checkboxValue, setCheckboxValue] = useState<string>('')
    const [checkboxSmallValue, setCheckboxSmallValue] = useState<string>('')
    const [checkboxErrorValue, setCheckboxErrorValue] = useState<string>('')
    const [checkboxDisabledValue, setCheckboxDisabledValue] = useState<string>('')
    const [checkboxMultiValue, setCheckboxMultiValue] = useState<string>('')
    const [checkboxPreselectedValue, setCheckboxPreselectedValue] = useState<string>('option3')
    const [checkboxMultiPreselectedValue, setCheckboxMultiPreselectedValue] =
      useState<string>('option1,option4')

    return (
      <div className="flex flex-col gap-8 p-8 w-full max-w-4xl bg-[var(--surface-canvas)] rounded-[6px]">
        <h2 className="text-xl font-bold text-white border-b border-[var(--border-subtle)] pb-2">
          Select Component - All Variants
        </h2>
        <section>
          <h3 className="text-lg font-semibold text-white mb-4 border-b border-[var(--border-subtle)] pb-2">
            Default Variant
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="text-white font-medium">Standard (Large)</h4>
              <Select
                label="Label"
                placeholder="Select an option"
                options={options}
                value={defaultValue}
                onValueChange={setDefaultValue}
                variant="default"
              />
            </div>
            <div className="space-y-2">
              <h4 className="text-white font-medium">Small Size</h4>
              <Select
                label="Label"
                placeholder="Select an option"
                options={options}
                value={smallValue}
                onValueChange={setSmallValue}
                size="small"
                variant="default"
              />
            </div>
            <div className="space-y-2">
              <h4 className="text-white font-medium">With Error</h4>
              <Select
                label="Label"
                placeholder="Select an option"
                options={options}
                value={errorValue}
                onValueChange={setErrorValue}
                error="This field is required"
                variant="default"
              />
            </div>
            <div className="space-y-2">
              <h4 className="text-white font-medium">Disabled</h4>
              <Select
                label="Label"
                placeholder="Select an option"
                options={options}
                value={disabledValue}
                onValueChange={setDisabledValue}
                disabled
                variant="default"
              />
            </div>
            <div className="space-y-2">
              <h4 className="text-white font-medium">Multi-Select</h4>
              <Select
                label="Label"
                placeholder="Select multiple options"
                options={options}
                value={multiValue}
                onValueChange={setMultiValue}
                multiSelect
                variant="default"
              />
              <p className="text-white text-sm">Selected: {multiValue || 'None'}</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-white font-medium">Pre-selected Value</h4>
              <Select
                label="Label"
                placeholder="Select an option"
                options={options}
                value={preselectedValue}
                onValueChange={setPreselectedValue}
                variant="default"
              />
            </div>
          </div>
        </section>
        <section className="mt-8">
          <h3 className="text-lg font-semibold text-white mb-4 border-b border-[var(--border-subtle)] pb-2">
            Checkbox Variant
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="text-white font-medium">Standard (Large)</h4>
              <Select
                label="Label"
                placeholder="Select an option"
                options={options}
                value={checkboxValue}
                onValueChange={setCheckboxValue}
                variant="checkbox"
              />
            </div>
            <div className="space-y-2">
              <h4 className="text-white font-medium">Small Size</h4>
              <Select
                label="Label"
                placeholder="Select an option"
                options={options}
                value={checkboxSmallValue}
                onValueChange={setCheckboxSmallValue}
                size="small"
                variant="checkbox"
              />
            </div>
            <div className="space-y-2">
              <h4 className="text-white font-medium">With Error</h4>
              <Select
                label="Label"
                placeholder="Select an option"
                options={options}
                value={checkboxErrorValue}
                onValueChange={setCheckboxErrorValue}
                error="This field is required"
                variant="checkbox"
              />
            </div>
            <div className="space-y-2">
              <h4 className="text-white font-medium">Disabled</h4>
              <Select
                label="Label"
                placeholder="Select an option"
                options={options}
                value={checkboxDisabledValue}
                onValueChange={setCheckboxDisabledValue}
                disabled
                variant="checkbox"
              />
            </div>
            <div className="space-y-2">
              <h4 className="text-white font-medium">Multi-Select</h4>
              <Select
                label="Label"
                placeholder="Select multiple options"
                options={options}
                value={checkboxMultiValue}
                onValueChange={setCheckboxMultiValue}
                multiSelect
                variant="checkbox"
              />
              <p className="text-white text-sm">Selected: {checkboxMultiValue || 'None'}</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-white font-medium">Pre-selected Value</h4>
              <Select
                label="Label"
                placeholder="Select an option"
                options={options}
                value={checkboxPreselectedValue}
                onValueChange={setCheckboxPreselectedValue}
                variant="checkbox"
              />
            </div>
            <div className="space-y-2 col-span-1 md:col-span-2">
              <h4 className="text-white font-medium">Multi-Select with Pre-selected Values</h4>
              <Select
                label="Label"
                placeholder="Select multiple options"
                options={options}
                value={checkboxMultiPreselectedValue}
                onValueChange={setCheckboxMultiPreselectedValue}
                multiSelect
                variant="checkbox"
              />
              <p className="text-white text-sm">Selected: {checkboxMultiPreselectedValue}</p>
            </div>
          </div>
        </section>
      </div>
    )
  },
}
