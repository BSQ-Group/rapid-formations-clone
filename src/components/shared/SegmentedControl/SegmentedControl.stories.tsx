import React, { useState } from 'react'
import { SegmentedControl, SegmentedControlOption } from './index'
import type { Meta, StoryObj } from '@storybook/react'

const options: SegmentedControlOption[] = [
  {
    value: 'tab1',
    label: 'Tab 1',
    content: <div className="mt-4 text-base text-[var(--text-inverse-subtle)]">Content for Tab 1</div>,
  },
  {
    value: 'tab2',
    label: 'Tab 2',
    content: <div className="mt-4 text-base text-[var(--text-inverse-subtle)]">Content for Tab 2</div>,
  },
  {
    value: 'tab3',
    label: 'Tab 3',
    content: <div className="mt-4 text-base text-[var(--text-inverse-subtle)]">Content for Tab 3</div>,
  },
]

const meta: Meta<typeof SegmentedControl> = {
  title: 'shared/SegmentedControl',
  component: SegmentedControl,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof SegmentedControl>

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(options[0]!.value)
    return (
      <div className="w-[400px]">
        <SegmentedControl {...args} options={options} value={value} onValueChange={setValue} />
      </div>
    )
  },
}

export const Disabled: Story = {
  render: (args) => {
    const [value, setValue] = useState(options[0]!.value)
    return (
      <div className="w-[400px]">
        <SegmentedControl
          {...args}
          options={options}
          value={value}
          onValueChange={setValue}
          disabled
        />
      </div>
    )
  },
}
