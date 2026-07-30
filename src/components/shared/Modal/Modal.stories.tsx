import type { Meta, StoryObj } from '@storybook/react'
import { Modal } from './Modal'
import { TextArea } from '@/components/shared/TextArea'

const meta: Meta<typeof Modal> = {
  title: 'Shared/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Modal>

export const WithTextArea: Story = {
  args: {
    open: true,
    title: 'Add a note',
    description: 'Add a note to this company',
    cancelButtonLabel: 'Cancel',
    confirmButtonLabel: 'Save',
    children: <TextArea placeholder="Enter your note here..." className="w-full min-h-[120px]" />,
  },
}

export const WithoutButtons: Story = {
  args: {
    open: true,
    title: 'Information',
    description: 'This is an information modal without buttons',
    children: <p>Some content here</p>,
  },
}

export const WithLongContent: Story = {
  args: {
    open: true,
    title: 'Long Content',
    description: 'Modal with long content',
    cancelButtonLabel: 'Close',
    children: (
      <div className="space-y-4">
        <p>This is a paragraph of text.</p>
        <p>This is another paragraph of text.</p>
        <p>This is yet another paragraph of text.</p>
        <p>This is one more paragraph of text.</p>
      </div>
    ),
  },
}

export const WithButtonsOnly: Story = {
  args: {
    open: true,
    title: 'Confirmation',
    description: 'Are you sure you want to proceed?',
    cancelButtonLabel: 'No, cancel',
    confirmButtonLabel: 'Yes, proceed',
  },
}
