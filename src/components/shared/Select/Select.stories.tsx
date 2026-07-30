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
  title: 'Components/Select/Default',
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
          'Default variant of the Select component. These examples showcase the standard select dropdown without checkboxes.',
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

export const SingleSelection: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    options,
    size: 'large',
    multiSelect: false,
    variant: 'default',
  },
  render: (args) => {
    const [value, setValue] = useState<string>('')
    return (
      <div className="w-80">
        <Select {...args} value={value} onValueChange={setValue} />
        {args.multiSelect && <p className="text-white text-sm mt-2">Selected: {value || 'None'}</p>}
      </div>
    )
  },
}

export const Small: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    options,
    size: 'small',
    variant: 'default',
  },
  render: (args) => {
    const [value, setValue] = useState<string>('')
    return (
      <div className="w-80">
        <Select {...args} value={value} onValueChange={setValue} />
      </div>
    )
  },
}

export const WithError: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    options,
    error: 'This field is required',
    variant: 'default',
  },
  render: (args) => {
    const [value, setValue] = useState<string>('')
    return (
      <div className="w-80">
        <Select {...args} value={value} onValueChange={setValue} />
      </div>
    )
  },
}

export const Disabled: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    options,
    disabled: true,
    variant: 'default',
  },
  render: (args) => {
    const [value, setValue] = useState<string>('')
    return (
      <div className="w-80">
        <Select {...args} value={value} onValueChange={setValue} />
      </div>
    )
  },
}

export const MultiSelection: Story = {
  args: {
    label: 'Label',
    placeholder: 'Select multiple options',
    options,
    multiSelect: true,
    variant: 'default',
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
    placeholder: 'Placeholder',
    options,
    variant: 'default',
  },
  render: (args) => {
    const [value, setValue] = useState<string>('option2')
    return (
      <div className="w-80">
        <Select {...args} value={value} onValueChange={setValue} />
      </div>
    )
  },
}

export const WithIcons: Story = {
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    options: [
      {
        value: 'us',
        label: 'United States',
        icon: (
          <span role="img" aria-label="US">
            🇺🇸
          </span>
        ),
      },
      {
        value: 'gb',
        label: 'United Kingdom',
        icon: (
          <span role="img" aria-label="UK">
            🇬🇧
          </span>
        ),
      },
      {
        value: 'fr',
        label: 'France',
        icon: (
          <span role="img" aria-label="France">
            🇫🇷
          </span>
        ),
      },
      {
        value: 'de',
        label: 'Germany',
        icon: (
          <span role="img" aria-label="Germany">
            🇩🇪
          </span>
        ),
      },
      {
        value: 'jp',
        label: 'Japan',
        icon: (
          <span role="img" aria-label="Japan">
            🇯🇵
          </span>
        ),
      },
    ],
    size: 'large',
    variant: 'default',
  },
  render: (args) => {
    const [value, setValue] = useState<string>('')
    return (
      <div className="w-80">
        <Select {...args} value={value} onValueChange={setValue} />
      </div>
    )
  },
}

export const SearchVariant: Story = {
  args: {
    label: 'Select Country',
    placeholder: 'Search and select a country...',
    options: [
      {
        value: 'US',
        label: 'United States',
        icon: (
          <span role="img" aria-label="US">
            🇺🇸
          </span>
        ),
      },
      {
        value: 'GB',
        label: 'United Kingdom',
        icon: (
          <span role="img" aria-label="UK">
            🇬🇧
          </span>
        ),
      },
      {
        value: 'DE',
        label: 'Germany',
        icon: (
          <span role="img" aria-label="Germany">
            🇩🇪
          </span>
        ),
      },
      {
        value: 'FR',
        label: 'France',
        icon: (
          <span role="img" aria-label="France">
            🇫🇷
          </span>
        ),
      },
      {
        value: 'IT',
        label: 'Italy',
        icon: (
          <span role="img" aria-label="Italy">
            🇮🇹
          </span>
        ),
      },
      {
        value: 'ES',
        label: 'Spain',
        icon: (
          <span role="img" aria-label="Spain">
            🇪🇸
          </span>
        ),
      },
      {
        value: 'CA',
        label: 'Canada',
        icon: (
          <span role="img" aria-label="Canada">
            🇨🇦
          </span>
        ),
      },
      {
        value: 'AU',
        label: 'Australia',
        icon: (
          <span role="img" aria-label="Australia">
            🇦🇺
          </span>
        ),
      },
      {
        value: 'JP',
        label: 'Japan',
        icon: (
          <span role="img" aria-label="Japan">
            🇯🇵
          </span>
        ),
      },
      {
        value: 'BR',
        label: 'Brazil',
        icon: (
          <span role="img" aria-label="Brazil">
            🇧🇷
          </span>
        ),
      },
    ],
    variant: 'search',
  },
  render: (args) => {
    const [value, setValue] = React.useState('')
    return (
      <div className="w-80">
        <Select {...args} value={value} onValueChange={setValue} />
        <p className="text-white text-sm mt-2">Selected value: {value || 'None'}</p>
      </div>
    )
  },
}
