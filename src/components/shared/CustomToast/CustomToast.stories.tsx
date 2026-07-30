import type { Meta, StoryObj } from '@storybook/react'
import { CustomToast } from './CustomToast'

const meta: Meta<typeof CustomToast> = {
  title: 'Shared/CustomToast',
  component: CustomToast,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A custom toast component with different variants and icons for displaying notifications.',
      },
    },
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['success', 'error', 'info', 'warning'],
      description: 'The type of toast to display',
    },
    description: {
      control: { type: 'text' },
      description: 'The message to display in the toast',
    },
    onClose: {
      action: 'closed',
      description: 'Callback function when the close button is clicked',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes to apply',
    },
  },
  args: {
    type: 'success',
    description: 'This is a sample toast message',
  },
}

export default meta
type Story = StoryObj<typeof CustomToast>

export const Success: Story = {
  args: {
    type: 'success',
    description: 'Operation completed successfully!',
  },
}

export const Error: Story = {
  args: {
    type: 'error',
    description: 'Something went wrong. Please try again.',
  },
}

export const Info: Story = {
  args: {
    type: 'info',
    description: 'Here is some important information for you.',
  },
}

export const Warning: Story = {
  args: {
    type: 'warning',
    description: 'Please review your input before proceeding.',
  },
}

export const LongMessage: Story = {
  args: {
    type: 'info',
    description:
      'This is a very long message that demonstrates how the toast handles longer text content. It should wrap properly and maintain good readability.',
  },
}

export const WithoutCloseButton: Story = {
  args: {
    type: 'success',
    description: 'This toast has no close button',
    onClose: undefined,
  },
}

export const WithCustomClass: Story = {
  args: {
    type: 'info',
    description: 'This toast has custom styling applied',
    className: 'shadow-2xl transform scale-105',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <CustomToast
        type="success"
        description="Success message with green styling"
        onClose={() => console.log('Success closed')}
      />
      <CustomToast
        type="error"
        description="Error message with red styling"
        onClose={() => console.log('Error closed')}
      />
      <CustomToast
        type="info"
        description="Info message with blue styling"
        onClose={() => console.log('Info closed')}
      />
      <CustomToast
        type="warning"
        description="Warning message with yellow styling"
        onClose={() => console.log('Warning closed')}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All toast variants displayed together for comparison.',
      },
    },
  },
}
