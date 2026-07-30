import type { Meta, StoryObj } from '@storybook/react'
import { Mail, Search, Lock, User } from 'lucide-react'
import { Input, Label } from './index'
import React from 'react'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error', 'disabled'],
    },
    size: {
      control: 'select',
      options: ['small', 'large'],
    },
    hasLeftIcon: {
      control: 'boolean',
    },
    hasRightIcon: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof Input>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const LargeDefault: Story = {
  args: {
    placeholder: 'Placeholder',
    size: 'large',
    variant: 'default',
    description: 'This is an input description.',
  },
  decorators: [
    (Story) => (
      <div className="space-y-2 w-80">
        <Label htmlFor="large-idle">Label</Label>
        <Story />
      </div>
    ),
  ],
}

export const LargeDisabled: Story = {
  args: {
    placeholder: 'Placeholder',
    size: 'large',
    disabled: true,
    description: 'This is an input description.',
  },
  decorators: [
    (Story) => (
      <div className="space-y-2 w-80">
        <Label htmlFor="large-disabled">Label</Label>
        <Story />
      </div>
    ),
  ],
}

export const LargeError: Story = {
  args: {
    placeholder: 'Placeholder',
    size: 'large',
    variant: 'error',
    error: 'Error message goes here',
  },
  decorators: [
    (Story) => (
      <div className="space-y-2 w-80">
        <Label htmlFor="large-error">Label</Label>
        <Story />
      </div>
    ),
  ],
}

export const SmallDefault: Story = {
  args: {
    placeholder: 'Placeholder',
    size: 'small',
    variant: 'default',
    description: 'This is an input description.',
  },
  decorators: [
    (Story) => (
      <div className="space-y-2 w-80">
        <Label htmlFor="small-idle">Label</Label>
        <Story />
      </div>
    ),
  ],
}

export const SmallDisabled: Story = {
  args: {
    placeholder: 'Placeholder',
    size: 'small',
    disabled: true,
    description: 'This is an input description.',
  },
  decorators: [
    (Story) => (
      <div className="space-y-2 w-80">
        <Label htmlFor="small-disabled">Label</Label>
        <Story />
      </div>
    ),
  ],
}

export const SmallError: Story = {
  args: {
    placeholder: 'Placeholder',
    size: 'small',
    variant: 'error',
    error: 'Error message goes here',
  },
  decorators: [
    (Story) => (
      <div className="space-y-2 w-80">
        <Label htmlFor="small-error">Label</Label>
        <Story />
      </div>
    ),
  ],
}

// With Icons examples
export const WithLeftIcon: Story = {
  args: {
    placeholder: 'Email address',
    icon: <Mail size={18} />,
    hasLeftIcon: true,
  },
  decorators: [
    (Story) => (
      <div className="space-y-2 w-80">
        <Label htmlFor="with-left-icon">Label</Label>
        <Story />
      </div>
    ),
  ],
}

export const WithRightIcon: Story = {
  args: {
    placeholder: 'Search...',
    rightIcon: <Search size={18} />,
    hasRightIcon: true,
  },
  decorators: [
    (Story) => (
      <div className="space-y-2 w-80">
        <Label htmlFor="with-right-icon">Label</Label>
        <Story />
      </div>
    ),
  ],
}

export const WithBothIcons: Story = {
  args: {
    placeholder: 'Search for user...',
    icon: <User size={18} />,
    rightIcon: <Search size={18} />,
    hasLeftIcon: true,
    hasRightIcon: true,
  },
  decorators: [
    (Story) => (
      <div className="space-y-2 w-80">
        <Label htmlFor="with-both-icons">Label</Label>
        <Story />
      </div>
    ),
  ],
}

// Password input with toggle functionality
export const PasswordToggle: Story = {
  render: () => {
    return (
      <div className="space-y-2 w-80">
        <Label htmlFor="password-input" required>
          Password
        </Label>
        <Input
          id="password-input"
          type="password"
          placeholder="Enter your password"
          icon={<Lock size={18} />}
          showPasswordToggle
          actionable
          hasLeftIcon
          hasRightIcon
        />
      </div>
    )
  },
}

// All States Grid
export const AllVariants: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-8 p-8 w-full max-w-3xl bg-[var(--surface-canvas)]">
        <h2 className="text-xl font-bold text-white">Large Size Inputs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="large-idle-grid">Idle</Label>
            <Input
              id="large-idle-grid"
              placeholder="Placeholder"
              size="large"
              variant="default"
              description="This is an input description."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="large-disabled-grid">Disabled</Label>
            <Input
              id="large-disabled-grid"
              placeholder="Placeholder"
              size="large"
              disabled
              description="This is an input description."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="large-error-grid">Error</Label>
            <Input
              id="large-error-grid"
              placeholder="Placeholder"
              size="large"
              variant="error"
              error="Error message goes here"
            />
          </div>
        </div>

        <h2 className="text-xl font-bold text-white mt-8">Small Size Inputs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="small-idle-grid">Idle</Label>
            <Input
              id="small-idle-grid"
              placeholder="Placeholder"
              size="small"
              variant="default"
              description="This is an input description."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="small-disabled-grid">Disabled</Label>
            <Input
              id="small-disabled-grid"
              placeholder="Placeholder"
              size="small"
              disabled
              description="This is an input description."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="small-error-grid">Error</Label>
            <Input
              id="small-error-grid"
              placeholder="Placeholder"
              size="small"
              variant="error"
              error="Error message goes here"
            />
          </div>
        </div>
      </div>
    )
  },
}

// Add this new story at the end of the file
export const ErrorInputWithFocus: Story = {
  name: 'Error with Focus',
  render: () => {
    const inputRef = React.useRef<HTMLInputElement>(null)

    React.useEffect(() => {
      // Focus the input when the component mounts
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, [])

    return (
      <div className="space-y-2 w-80">
        <Label htmlFor="error-focus">Error Input (Focused)</Label>
        <Input
          id="error-focus"
          placeholder="This input is focused"
          variant="error"
          error="Error message with no special outline when focused"
          ref={inputRef}
        />
        <p className="text-sm text-[var(--text-placeholder)] mt-2">
          Note: The input is auto-focused but has no outline, keeping only its error state styling
        </p>
      </div>
    )
  },
}
