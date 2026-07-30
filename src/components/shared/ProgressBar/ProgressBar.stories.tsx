import type { Meta, StoryObj } from '@storybook/react'
import { ProgressBar } from './ProgressBar'

const meta = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
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
      description: 'Label text displayed above the progress bar',
    },
    value: {
      control: { type: 'number', min: 0 },
      description: 'Current value of the progress bar',
    },
    total: {
      control: { type: 'number', min: 1 },
      description: 'Maximum/total value for the progress bar',
    },
    suffix: {
      control: 'text',
      description: 'Suffix to append to the value (e.g., "GB", "USD")',
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
} satisfies Meta<typeof ProgressBar>

export default meta

type Story = StoryObj<typeof ProgressBar>

export const Default: Story = {
  args: {
    label: 'Monthly limit',
    value: 14563,
    total: 60000,
    suffix: '',
  },
}

export const WithSuffix: Story = {
  args: {
    label: 'Storage used',
    value: 14563.5,
    total: 50000,
    suffix: ' GB',
  },
}

export const Currency: Story = {
  args: {
    label: 'Spending limit',
    value: 1234.56,
    total: 10000,
    suffix: ' USD',
  },
}

export const HighPercentage: Story = {
  args: {
    label: 'Bandwidth usage',
    value: 85000,
    total: 100000,
    suffix: ' MB',
  },
}

export const LowPercentage: Story = {
  args: {
    label: 'Storage quota',
    value: 1250.75,
    total: 100000,
    suffix: ' GB',
  },
}

export const Complete: Story = {
  args: {
    label: 'Task completion',
    value: 10000,
    total: 10000,
    suffix: '',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-8 w-[600px]">
      <ProgressBar label="Monthly limit" value={14563} total={60000} />
      <ProgressBar label="Storage used" value={14563.5} total={50000} suffix=" GB" />
      <ProgressBar label="Spending limit" value={1234.56} total={10000} suffix=" USD" />
      <ProgressBar label="Bandwidth usage" value={85000} total={100000} suffix=" MB" />
      <ProgressBar label="Storage quota" value={1250.75} total={100000} suffix=" GB" />
      <ProgressBar label="Task completion" value={10000} total={10000} />
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story:
          'Shows all variants of the progress bar component with different values and suffixes.',
      },
    },
  },
}
