import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './index'

const meta: Meta<typeof Badge> = {
  component: Badge,
  title: 'Base Components/Badge',
  parameters: {
    layout: 'centered',
  },
  args: {
    variant: 'green',
    children: 'Badge',
  },
  argTypes: {
    variant: {
      options: ['green', 'blue', 'red', 'amber', 'purple', 'grey'],
      control: { type: 'radio' },
      description: 'Badge variant determines the color',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'green' },
      },
    },
    children: {
      control: 'text',
      description: 'Badge content',
    },
  },
  decorators: [
    (Story) => (
      <div className="p-4">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Badge>

export const Green: Story = {
  args: {
    variant: 'green',
    children: 'Incorporated',
  },
}

export const Blue: Story = {
  args: {
    variant: 'blue',
    children: 'Pending',
  },
}

export const Red: Story = {
  args: {
    variant: 'red',
    children: 'Dissolved',
  },
}

export const Amber: Story = {
  args: {
    variant: 'amber',
    children: 'Information Required',
  },
}

export const Purple: Story = {
  args: {
    variant: 'purple',
    children: 'In Review',
  },
}

export const Grey: Story = {
  args: {
    variant: 'grey',
    children: 'Not Included',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge variant="green">Incorporated</Badge>
      <Badge variant="blue">Pending</Badge>
      <Badge variant="red">Dissolved</Badge>
      <Badge variant="amber">Information Required</Badge>
      <Badge variant="purple">In Review</Badge>
      <Badge variant="grey">Not Included</Badge>
    </div>
  ),
}
