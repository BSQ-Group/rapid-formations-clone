import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Slider } from './Slider'

const meta = {
  title: 'Components/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#040429' },
        { name: 'light', value: '#ffffff' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the slider',
    },
    showValue: {
      control: 'boolean',
      description: 'Whether to show the current value',
    },
    defaultValue: {
      control: { type: 'number', min: 0, max: 10 },
      description: 'Default value (0-10) where 1 = 10%, 5 = 50%, 10 = 100%',
    },
    value: {
      control: { type: 'number', min: 0, max: 10 },
      description: 'Current value (0-10) where 1 = 10%, 5 = 50%, 10 = 100%',
    },
    total: {
      control: { type: 'number', min: 1, max: 100 },
      description: 'Maximum value for the slider (default: 10)',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the slider is disabled',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
  decorators: [
    (Story) => (
      <div className="flex flex-col gap-8 p-8 w-[400px]">
        <div className="flex flex-col gap-4">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof Slider>

export default meta

type Story = StoryObj<typeof Slider>

// Base stories
export const Default: Story = {
  render: () => (
    <>
      <Slider defaultValue={2} />
    </>
  ),
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    docs: {
      description: {
        story:
          'The slider shows a percentage based on the input value (0-10). For example, an input of 1 shows 10%, 5 shows 50%, and 10 shows 100%.',
      },
    },
  },
}

export const GroupConnected: Story = {
  render: () => <ConnectedSliderGroup numSliders={3} initialTotal={100} />,
  parameters: {
    docs: {
      description: {
        story:
          'A group of connected sliders where each slider shows its percentage of the total sum. As sliders are adjusted, percentages automatically update to reflect their portion of the new total.',
      },
    },
  },
}

export const WithLabel: Story = {
  render: () => <Slider label="Progress" defaultValue={5} />,
}

export const WithoutValue: Story = {
  render: () => <Slider label="Progress" defaultValue={7} showValue={false} />,
}

export const Disabled: Story = {
  render: () => <Slider label="Progress" defaultValue={6} disabled />,
}

// All Variants Grid
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-8 w-[600px]">
      <div className="flex flex-col gap-4">
        <Slider defaultValue={2} />
      </div>

      <div className="flex flex-col gap-4">
        <Slider label="Progress" defaultValue={5} />
      </div>

      <div className="flex flex-col gap-4">
        <Slider label="Progress" defaultValue={7} showValue={false} />
      </div>

      <div className="flex flex-col gap-4">
        <Slider label="Progress" defaultValue={6} disabled />
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story:
          'Shows all variants of the slider component with different states and values. The slider automatically converts input values to percentages.',
      },
    },
  },
}

// A simplified component that manages a group of connected sliders
const ConnectedSliderGroup = ({ numSliders = 2, initialTotal = 100 }) => {
  // Initialize child values with equal distribution
  const initialChildValue = Math.floor(initialTotal / numSliders)
  const [childValues, setChildValues] = useState(
    // Create initial values and distribute any remainder to the last slider
    Array.from({ length: numSliders }, (_, i) =>
      i === numSliders - 1 ? initialChildValue + (initialTotal % numSliders) : initialChildValue,
    ),
  )

  // Calculate the total as the sum of all child values
  const totalSum = childValues.reduce((sum, val) => sum + val, 0)

  // Handle individual slider value changes
  const handleChildValueChange = (index: number, newValue: number) => {
    const newChildValues = [...childValues]
    newChildValues[index] = newValue
    setChildValues(newChildValues)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-[var(--surface-primary)] p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-white">Resource Allocation</h3>
          <span className="text-sm text-[var(--text-inverse-muted)]">Total: {totalSum}</span>
        </div>

        <div className="space-y-6">
          {childValues.map((value, index) => {
            return (
              <div key={index} className="space-y-1">
                <Slider
                  label={`Allocation ${index + 1}`}
                  value={value}
                  total={totalSum}
                  onValueChange={(newValue) => handleChildValueChange(index, newValue)}
                  showValue={true}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
