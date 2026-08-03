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
  title: 'Components/Select/Checkbox',
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
          'These are specific demos of the Select component with checkbox variant. The checkbox variant shows checkboxes next to options and is suitable for both single and multi-selection.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'large'],
      description: 'Size of the select component',
    },
    multiSelect: {
      control: 'boolean',
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
  args: {
    variant: 'checkbox',
  },
}

export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {
  args: {
    label: 'Label',
    placeholder: 'Select an option',
    options,
    variant: 'checkbox',
  },
  render: (args) => {
    const [value, setValue] = useState<string>('')
    return (
      <div className="w-80">
        <Select {...args} value={value} onValueChange={setValue} />
        <p className="text-white text-sm mt-2">Selected: {value || 'None'}</p>
      </div>
    )
  },
}

export const Small: Story = {
  args: {
    label: 'Label',
    placeholder: 'Select an option',
    options,
    variant: 'checkbox',
    size: 'small',
  },
  render: (args) => {
    const [value, setValue] = useState<string>('')
    return (
      <div className="w-80">
        <Select {...args} value={value} onValueChange={setValue} />
        <p className="text-white text-sm mt-2">Selected: {value || 'None'}</p>
      </div>
    )
  },
}

export const WithError: Story = {
  args: {
    label: 'Label',
    placeholder: 'Select an option',
    options,
    variant: 'checkbox',
    error: 'This field is required',
  },
  render: (args) => {
    const [value, setValue] = useState<string>('')
    return (
      <div className="w-80">
        <Select {...args} value={value} onValueChange={setValue} />
        <p className="text-white text-sm mt-2">Selected: {value || 'None'}</p>
      </div>
    )
  },
}

export const Disabled: Story = {
  args: {
    label: 'Label',
    placeholder: 'Select an option',
    options,
    variant: 'checkbox',
    disabled: true,
  },
  render: (args) => {
    const [value, setValue] = useState<string>('')
    return (
      <div className="w-80">
        <Select {...args} value={value} onValueChange={setValue} />
        <p className="text-white text-sm mt-2">Selected: {value || 'None'}</p>
      </div>
    )
  },
}

export const WithPreselectedValue: Story = {
  args: {
    label: 'Label',
    placeholder: 'Select an option',
    options,
    variant: 'checkbox',
  },
  render: (args) => {
    const [value, setValue] = useState<string>('option2')
    return (
      <div className="w-80">
        <Select {...args} value={value} onValueChange={setValue} />
        <p className="text-white text-sm mt-2">Selected: {value || 'None'}</p>
      </div>
    )
  },
}

export const MultiCheckbox: Story = {
  args: {
    label: 'Label',
    placeholder: 'Select multiple options',
    options,
    variant: 'checkbox',
    multiSelect: true,
  },
  render: (args) => {
    const [value, setValue] = useState<string>('')
    return (
      <div className="w-80">
        <Select {...args} value={value} onValueChange={setValue} />
        <p className="text-white text-sm mt-2">Selected: {value || 'None'}</p>
      </div>
    )
  },
}

export const FigmaStyles: Story = {
  render: () => {
    const [value, setValue] = useState<string>('option2')
    const [multiValue, setMultiValue] = useState<string>('option1,option3')

    return (
      <div className="w-[400px] p-6 bg-[var(--surface-canvas)] rounded-[6px]">
        <h2 className="text-xl font-bold text-white mb-6">Checkbox Styling from Figma</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-white font-medium mb-2">Single Selection</h3>
            <Select
              label="Label"
              placeholder="Select an option"
              options={options}
              value={value}
              onValueChange={setValue}
              variant="checkbox"
            />
            <p className="text-white text-sm mt-2">
              Note: Hover over options to see the hover state.
            </p>
          </div>
          <div>
            <h3 className="text-white font-medium mb-2">Multi Selection</h3>
            <Select
              label="Label"
              placeholder="Select multiple options"
              options={options}
              value={multiValue}
              onValueChange={setMultiValue}
              variant="checkbox"
              multiSelect
            />
            <p className="text-white text-sm mt-2">Selected: {multiValue}</p>
          </div>
          <div className="mt-4 bg-[var(--surface-primary)] p-4 rounded-[6px]">
            <h3 className="text-white font-medium mb-2">Checkbox States</h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center h-4 w-4 rounded-[2px] bg-[var(--surface-primary)]"></div>
                <span className="text-white text-sm">Unchecked</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center h-4 w-4 rounded-[2px] bg-[var(--surface-accent)] border-transparent">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-white text-sm">Checked</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center h-4 w-4 rounded-[2px] bg-[var(--surface-primary)] opacity-50"></div>
                <span className="text-white text-sm opacity-50">Disabled Unchecked</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center h-4 w-4 rounded-[2px] bg-[var(--surface-accent)] border-transparent opacity-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white opacity-50"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-white text-sm opacity-50">Disabled Checked</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
}
