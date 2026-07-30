import React, { useState } from 'react'
import { Tabs, TabsOption } from './index'
import type { Meta, StoryObj } from '@storybook/react'

const options: TabsOption[] = [
  {
    value: 'tab1',
    label: 'DNS Records',
    content: <div className="mt-4 text-base text-[var(--text-inverse-subtle)]">Content for DNS Records</div>,
  },
  {
    value: 'tab2',
    label: 'Nameservers',
    content: <div className="mt-4 text-base text-[var(--text-inverse-subtle)]">Content for Nameservers</div>,
  },
  {
    value: 'tab3',
    label: 'Transfer Domain',
    content: <div className="mt-4 text-base text-[var(--text-inverse-subtle)]">Content for Transfer Domain</div>,
  },
]

const meta: Meta<typeof Tabs> = {
  title: 'shared/Tabs',
  component: Tabs,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Tabs>

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(options[0]?.value ?? '')
    return (
      <div className="w-[700px]">
        <Tabs {...args} options={options} value={value} onValueChange={setValue} />
      </div>
    )
  },
}

export const Disabled: Story = {
  render: (args) => {
    const [value, setValue] = useState(options[0]?.value ?? '')
    return (
      <div className="w-[700px]">
        <Tabs {...args} options={options} value={value} onValueChange={setValue} disabled />
      </div>
    )
  },
}
