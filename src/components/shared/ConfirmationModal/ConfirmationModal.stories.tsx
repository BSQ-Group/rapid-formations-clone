import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { ConfirmationModal } from './index'
import { Button } from '@/components/ui/button'

const meta: Meta<typeof ConfirmationModal> = {
  title: 'Components/ConfirmationModal',
  component: ConfirmationModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Whether the modal is open',
    },
    title: {
      control: 'text',
      description: 'The modal title',
    },
    message: {
      control: 'text',
      description: 'The modal message/description',
    },
    buttonText: {
      control: 'text',
      description: 'Text for the confirmation button',
    },
    onOpenChange: {
      action: 'onOpenChange',
      description: 'Called when modal open state changes',
    },
    onClose: {
      action: 'onClose',
      description: 'Called when modal is closed',
    },
  },
}

export default meta
type Story = StoryObj<typeof ConfirmationModal>

const InteractiveWrapper = ({
  children,
  buttonLabel = 'Open Modal',
}: {
  children: any
  buttonLabel?: string
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div style={{ padding: '20px' }}>
      <Button onClick={() => setIsOpen(true)} variant="primary">
        {buttonLabel}
      </Button>
      {React.cloneElement(children, {
        open: isOpen,
        onOpenChange: setIsOpen,
        onClose: () => setIsOpen(false),
      })}
    </div>
  )
}

export const DocumentsSubmitted: Story = {
  args: {
    open: false,
    title: 'Documents submitted',
    message: 'You have now submitted your documents to Companies House for review.',
    buttonText: 'OK',
  },
  render: (args) => (
    <InteractiveWrapper buttonLabel="Submit Documents">
      <ConfirmationModal {...args} />
    </InteractiveWrapper>
  ),
}

export const InvitationSent: Story = {
  args: {
    open: false,
    title: 'Invitation sent',
    message: 'The recipient will receive an email with the invitation to join the company.',
    buttonText: 'OK',
  },
  render: (args) => (
    <InteractiveWrapper buttonLabel="Send Invitation">
      <ConfirmationModal {...args} />
    </InteractiveWrapper>
  ),
}

export const GenericSuccess: Story = {
  args: {
    open: false,
    title: 'Success!',
    message: 'Your action has been completed successfully.',
    buttonText: 'Continue',
  },
  render: (args) => (
    <InteractiveWrapper buttonLabel="Complete Action">
      <ConfirmationModal {...args} />
    </InteractiveWrapper>
  ),
}

export const EmailSent: Story = {
  args: {
    open: false,
    title: 'Email sent',
    message: 'Your email has been sent successfully. You should receive a confirmation shortly.',
    buttonText: 'Got it',
  },
  render: (args) => (
    <InteractiveWrapper buttonLabel="Send Email">
      <ConfirmationModal {...args} />
    </InteractiveWrapper>
  ),
}

export const AccountCreated: Story = {
  args: {
    open: false,
    title: 'Account onboarded',
    message: 'Your account has been successfully created. Welcome aboard!',
    buttonText: 'Get started',
  },
  render: (args) => (
    <InteractiveWrapper buttonLabel="Create Account">
      <ConfirmationModal {...args} />
    </InteractiveWrapper>
  ),
}

export const PaymentProcessed: Story = {
  args: {
    open: false,
    title: 'Payment processed',
    message: 'Your payment has been processed successfully. A receipt has been sent to your email.',
    buttonText: 'View receipt',
  },
  render: (args) => (
    <InteractiveWrapper buttonLabel="Process Payment">
      <ConfirmationModal {...args} />
    </InteractiveWrapper>
  ),
}

export const FileUploaded: Story = {
  args: {
    open: false,
    title: 'File uploaded',
    message: 'Your file has been uploaded successfully and is now being processed.',
    buttonText: 'Done',
  },
  render: (args) => (
    <InteractiveWrapper buttonLabel="Upload File">
      <ConfirmationModal {...args} />
    </InteractiveWrapper>
  ),
}

export const SettingsSaved: Story = {
  args: {
    open: false,
    title: 'Settings saved',
    message: 'Your settings have been updated and saved successfully.',
    buttonText: 'Close',
  },
  render: (args) => (
    <InteractiveWrapper buttonLabel="Save Settings">
      <ConfirmationModal {...args} />
    </InteractiveWrapper>
  ),
}

export const LongMessage: Story = {
  args: {
    open: false,
    title: 'Application submitted',
    message:
      'Your incorporation application has been successfully submitted to Companies House. You will receive updates on the progress via email. The review process typically takes 3-5 business days. If you have any questions, please contact our support team.',
    buttonText: 'Understood',
  },
  render: (args) => (
    <InteractiveWrapper buttonLabel="Submit Application">
      <ConfirmationModal {...args} />
    </InteractiveWrapper>
  ),
}

export const CustomButtonText: Story = {
  args: {
    open: false,
    title: 'Order confirmed',
    message: 'Your order #12345 has been confirmed and will be processed shortly.',
    buttonText: 'Track order',
  },
  render: (args) => (
    <InteractiveWrapper buttonLabel="Place Order">
      <ConfirmationModal {...args} />
    </InteractiveWrapper>
  ),
}

export const AlwaysVisible: Story = {
  args: {
    open: true,
    title: 'Task completed',
    message: 'Your task has been completed successfully.',
    buttonText: 'OK',
  },
  decorators: [
    (Story) => (
      <div style={{ height: '100vh', position: 'relative' }}>
        <p style={{ color: 'white', marginBottom: '20px', textAlign: 'center' }}>
          This story shows the modal always open for design review
        </p>
        <Story />
      </div>
    ),
  ],
}
