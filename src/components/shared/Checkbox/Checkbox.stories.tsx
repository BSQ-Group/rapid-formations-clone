import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './index'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Checkbox aligned with Figma (Client Portal — Checkbox set): 16×16, 1.5px border, no tick when unchecked.

Uses theme tokens: \`--surface-primary\`, \`--border-subtle\`, \`--surface-hover\`, \`--border-strong\`, \`--feedback-success-background\`, \`--feedback-error-background\`, \`--border-error\`, \`--feedback-text\`, \`--border-focus\`.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked',
    },
    error: {
      control: 'boolean',
      description: 'Whether the checkbox is in error state (red border/background)',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    checked: false,
  },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox {...args} />
      <span className="text-white">Default checkbox (Idle)</span>
    </div>
  ),
}

export const Checked: Story = {
  args: {
    checked: true,
  },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox {...args} />
      <span className="text-white">Checked checkbox (Selected)</span>
    </div>
  ),
}

export const Error: Story = {
  args: {
    checked: false,
    error: true,
  },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox {...args} />
      <span className="text-white">Error state</span>
    </div>
  ),
}

export const ErrorChecked: Story = {
  args: {
    checked: true,
    error: true,
  },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox {...args} />
      <span className="text-white">Error + checked</span>
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    checked: true,
    disabled: true,
  },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox {...args} />
      <span className="text-white">Disabled state</span>
    </div>
  ),
}
