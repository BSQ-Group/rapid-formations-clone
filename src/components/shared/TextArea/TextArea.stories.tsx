import type { Meta, StoryObj } from '@storybook/react'
import { TextArea, Label } from './index'

const meta = {
  title: 'Components/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error', 'disabled'],
    },
    size: {
      control: 'select',
      options: ['small', 'large'],
    },
  },
} satisfies Meta<typeof TextArea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter your message here...',
    id: 'default-textarea',
  },
  render: (args) => (
    <div className="w-96 space-y-2">
      <Label htmlFor="default-textarea">Message</Label>
      <TextArea {...args} />
    </div>
  ),
}

export const WithDescription: Story = {
  args: {
    placeholder: 'Enter your message here...',
    id: 'description-textarea',
    description: 'Please be concise and specific in your message.',
  },
  render: (args) => (
    <div className="w-96 space-y-2">
      <Label htmlFor="description-textarea">Message</Label>
      <TextArea {...args} />
    </div>
  ),
}

export const WithError: Story = {
  args: {
    placeholder: 'Enter your message here...',
    id: 'error-textarea',
    variant: 'error',
    error: 'This field is required.',
  },
  render: (args) => (
    <div className="w-96 space-y-2">
      <Label htmlFor="error-textarea">Message</Label>
      <TextArea {...args} />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    placeholder: 'This field is disabled',
    id: 'disabled-textarea',
    disabled: true,
  },
  render: (args) => (
    <div className="w-96 space-y-2">
      <Label htmlFor="disabled-textarea">Message</Label>
      <TextArea {...args} />
    </div>
  ),
}

export const Small: Story = {
  args: {
    placeholder: 'Enter your message here...',
    id: 'small-textarea',
    size: 'small',
  },
  render: (args) => (
    <div className="w-96 space-y-2">
      <Label htmlFor="small-textarea">Message</Label>
      <TextArea {...args} />
    </div>
  ),
}

export const WithSubmitButton: Story = {
  args: {
    placeholder: 'Enter your message here...',
    id: 'submit-textarea',
    showSubmitButton: true,
    onSubmit: () => alert('Message submitted!'),
  },
  render: (args) => (
    <div className="w-96 space-y-2">
      <Label htmlFor="submit-textarea">Message</Label>
      <TextArea {...args} />
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6 p-4 bg-[var(--surface-canvas)] rounded-lg w-full max-w-3xl">
      <div className="space-y-4">
        <h3 className="text-white text-lg font-medium">Default</h3>
        <div className="w-full space-y-2">
          <Label htmlFor="default-all">Message</Label>
          <TextArea id="default-all" placeholder="Enter your message here..." />
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-white text-lg font-medium">With Description</h3>
        <div className="w-full space-y-2">
          <Label htmlFor="description-all">Message</Label>
          <TextArea
            id="description-all"
            placeholder="Enter your message here..."
            description="Please be concise and specific in your message."
          />
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-white text-lg font-medium">With Error</h3>
        <div className="w-full space-y-2">
          <Label htmlFor="error-all">Message</Label>
          <TextArea
            id="error-all"
            placeholder="Enter your message here..."
            variant="error"
            error="This field is required."
          />
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-white text-lg font-medium">Disabled</h3>
        <div className="w-full space-y-2">
          <Label htmlFor="disabled-all">Message</Label>
          <TextArea id="disabled-all" placeholder="This field is disabled" disabled />
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-white text-lg font-medium">Small Size</h3>
        <div className="w-full space-y-2">
          <Label htmlFor="small-all">Message</Label>
          <TextArea id="small-all" placeholder="Enter your message here..." size="small" />
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-white text-lg font-medium">With Submit Button</h3>
        <div className="w-full space-y-2">
          <Label htmlFor="submit-all">Message</Label>
          <TextArea
            id="submit-all"
            placeholder="Enter your message here..."
            showSubmitButton
            onSubmit={() => alert('Message submitted!')}
          />
        </div>
      </div>
    </div>
  ),
}
