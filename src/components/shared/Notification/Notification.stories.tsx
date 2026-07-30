import type { Meta, StoryObj } from '@storybook/react'
import { Notification } from './Notification'

const meta: Meta<typeof Notification> = {
  component: Notification,
  title: 'Components/Notification',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      options: ['success', 'error', 'neutral', 'warning', 'info'],
      control: { type: 'radio' },
      description: 'The type of notification',
    },
    message: {
      control: 'text',
      description: 'The notification message',
    },
    className: {
      control: 'text',
      description: 'Optional additional CSS class names',
    },
    buttonLabel: {
      control: 'text',
      description: 'Optional button label',
    },
    onButtonClick: {
      action: 'button clicked',
      description: 'Function called when the button is clicked',
    },
  },
}

export default meta
type Story = StoryObj<typeof Notification>

export const Success: Story = {
  args: {
    type: 'success',
    message: 'Your changes have been successfully saved.',
  },
}

export const Error: Story = {
  args: {
    type: 'error',
    message: 'An error occurred while saving your changes. Please try again.',
  },
}

export const Neutral: Story = {
  args: {
    type: 'neutral',
    message: 'This is a general information notification.',
  },
}

export const Warning: Story = {
  args: {
    type: 'warning',
    message: 'Please review your information before proceeding.',
  },
}

export const Info: Story = {
  args: {
    type: 'info',
    message: 'This is an informational notification.',
  },
}

export const WithButton: Story = {
  args: {
    type: 'success',
    message: 'Your changes have been successfully saved.',
    buttonLabel: 'Button',
    children: <span style={{ color: '#fff', marginLeft: 8 }}>Undo?</span>,
  },
}

export const ErrorWithButton: Story = {
  args: {
    type: 'error',
    message: 'An error occurred while saving your changes.',
    buttonLabel: 'Retry',
  },
}

export const LongMessage: Story = {
  args: {
    type: 'success',
    message:
      'This is a notification with a very long message that will demonstrate how the component handles lengthy text content. The layout should still maintain its integrity and readability.',
  },
}

export const CustomClassName: Story = {
  args: {
    type: 'success',
    message: 'Notification with custom className',
    className: 'max-w-md shadow-lg',
  },
}

export const AllVariants: Story = {
  args: {
    buttonLabel: 'Button label',
  },

  render: () => (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <Notification type="success" message="Success notification example" />
      <Notification type="error" message="Error notification example" />
      <Notification type="neutral" message="Neutral notification example" />
      <Notification type="warning" message="Warning notification example" />
      <Notification type="info" message="Info notification example" />
    </div>
  ),
}

export const AllVariantsWithButtons: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <Notification
        type="success"
        message="Success notification example"
        onButtonClick={() => console.log('success')}
        buttonLabel="Action"
      />
      <Notification
        type="error"
        message="Error notification example"
        onButtonClick={() => console.log('error')}
        buttonLabel="Retry"
      />
      <Notification
        type="neutral"
        message="Neutral notification example"
        onButtonClick={() => console.log('neutral')}
        buttonLabel="More info"
      />
      <Notification
        type="warning"
        message="Warning notification example"
        onButtonClick={() => console.log('warning')}
        buttonLabel="OK to proceed?"
      />
      <Notification
        type="info"
        message="Info notification example"
        onButtonClick={() => console.log('info')}
        buttonLabel="Got it"
      />
    </div>
  ),
}

export const WithChildren: Story = {
  args: {
    type: 'info',
    message: 'This notification includes custom children.',
    children: (
      <span style={{ color: '#fff', marginLeft: 8 }}>
        Extra info: <b>Check your email.</b>
      </span>
    ),
  },
}
