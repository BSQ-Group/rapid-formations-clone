import type { Meta, StoryObj } from '@storybook/react'
import { TelephoneNumber, Label } from './index'
import React from 'react'

const meta: Meta<typeof TelephoneNumber> = {
  title: 'Components/TelephoneNumber',
  component: TelephoneNumber,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error', 'disabled'],
      description: 'Style variant of the telephone number input',
    },
    size: {
      control: 'select',
      options: ['small', 'large'],
      description: 'Size of the telephone number input',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the input should take up the full width of its container',
    },
    defaultCountryCode: {
      control: 'select',
      options: ['GB', 'US', 'DE', 'FR', 'ES', 'IT'],
      description: 'Default country code to display',
    },
  },
}

export default meta
type Story = StoryObj<typeof TelephoneNumber>

export const Default: Story = {
  args: {
    placeholder: 'Enter phone number',
    defaultCountryCode: 'GB',
    description: 'This is an input description.',
  },
  render: (args) => (
    <div className="space-y-2 w-80">
      <Label htmlFor="default">Telephone Number</Label>
      <TelephoneNumber id="default" {...args} />
    </div>
  ),
}

export const Error: Story = {
  args: {
    placeholder: 'Enter phone number',
    defaultCountryCode: 'GB',
    variant: 'error',
    error: 'Error message goes here',
  },
  render: (args) => (
    <div className="space-y-2 w-80">
      <Label htmlFor="error">Telephone Number</Label>
      <TelephoneNumber id="error" {...args} />
    </div>
  ),
}

export const SmallError: Story = {
  args: {
    placeholder: 'Enter phone number',
    defaultCountryCode: 'GB',
    variant: 'error',
    size: 'small',
    error: 'Error message goes here',
  },
  render: (args) => (
    <div className="space-y-2 w-80">
      <Label htmlFor="small-error">Small Error Input</Label>
      <TelephoneNumber id="small-error" {...args} />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    placeholder: 'Enter phone number',
    defaultCountryCode: 'GB',
    disabled: true,
    description: 'This input is disabled',
  },
  render: (args) => (
    <div className="space-y-2 w-80">
      <Label htmlFor="disabled">Telephone Number</Label>
      <TelephoneNumber id="disabled" {...args} />
    </div>
  ),
}

export const Small: Story = {
  args: {
    placeholder: 'Enter phone number',
    defaultCountryCode: 'GB',
    size: 'small',
    description: 'This is a small input',
  },
  render: (args) => (
    <div className="space-y-2 w-80">
      <Label htmlFor="small">Telephone Number</Label>
      <TelephoneNumber id="small" {...args} />
    </div>
  ),
}

export const NotFullWidth: Story = {
  args: {
    placeholder: 'Enter phone number',
    defaultCountryCode: 'GB',
    fullWidth: false,
    description: 'This input does not take full width',
  },
  render: (args) => (
    <div className="space-y-2 w-80">
      <Label htmlFor="not-full-width">Not Full Width</Label>
      <div className="flex justify-center">
        <TelephoneNumber id="not-full-width" {...args} />
      </div>
    </div>
  ),
}

export const USPhoneNumber: Story = {
  args: {
    placeholder: 'Enter US phone number',
    defaultCountryCode: 'US',
    description: 'US phone number format',
  },
  render: (args) => (
    <div className="space-y-2 w-80">
      <Label htmlFor="us-format">US Phone Number</Label>
      <TelephoneNumber id="us-format" {...args} />
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8 max-w-xl">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Default</h3>
        <TelephoneNumber id="all-default" placeholder="Default variant" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Error</h3>
        <TelephoneNumber
          id="all-error"
          placeholder="Error variant"
          variant="error"
          error="This field is required"
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Disabled</h3>
        <TelephoneNumber id="all-disabled" placeholder="Disabled variant" disabled />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Small</h3>
        <TelephoneNumber id="all-small" placeholder="Small size" size="small" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Small Error</h3>
        <TelephoneNumber
          id="all-small-error"
          placeholder="Small error"
          size="small"
          variant="error"
          error="Invalid phone number"
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Not Full Width</h3>
        <div className="flex justify-center">
          <TelephoneNumber id="all-not-full-width" placeholder="Not full width" fullWidth={false} />
        </div>
      </div>
    </div>
  ),
}
