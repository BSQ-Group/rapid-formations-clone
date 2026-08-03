import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '.'

const meta = {
  title: 'Components/Button',
  component: Button,
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
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'secondary-light',
        'tertiary',
        'tertiary-light',
        'download',
        'back',
      ],
      description: 'The visual style of the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'icon'],
      description: 'The size of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    isLoading: {
      control: 'boolean',
      description: 'Whether the button is in loading state',
    },
    children: {
      control: 'text',
      description: 'The content of the button',
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
    size: 'md',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Button',
    size: 'md',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}

export const SecondaryLight: Story = {
  args: {
    variant: 'secondary-light',
    children: 'Button',
    size: 'md',
  },
  parameters: {
    backgrounds: { default: 'light' },
  },
}

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    children: 'Edit',
    size: 'sm',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}

export const TertiaryLight: Story = {
  args: {
    variant: 'tertiary-light',
    children: 'Edit',
    size: 'sm',
  },
  parameters: {
    backgrounds: { default: 'light' },
  },
}

export const DownloadButton: Story = {
  args: {
    variant: 'download',
    children: 'Download PDF',
    size: 'md',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  name: 'Download - with icon',
}

export const BackButton: Story = {
  args: {
    variant: 'back',
    size: 'lg',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  name: 'Back - with arrow',
}

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
}

export const Medium: Story = {
  args: {
    size: 'md',
    children: 'Medium Button',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
}

export const IconButton: Story = {
  args: {
    variant: 'primary',
    size: 'icon',
    children: '→',
  },
}

export const IconSizePerVariant: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-8 items-center">
      <Button variant="primary" size="icon">
        →
      </Button>
      <Button variant="secondary" size="icon">
        →
      </Button>
      <Button variant="secondary-light" size="icon">
        →
      </Button>
      <Button variant="tertiary" size="icon">
        →
      </Button>
      <Button variant="tertiary-light" size="icon">
        →
      </Button>
      <Button variant="download" size="icon">
        →
      </Button>
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
}

export const DisabledPerVariant: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-8">
      <Button variant="primary" disabled>
        Primary
      </Button>
      <Button variant="secondary" disabled>
        Secondary
      </Button>
      <Button variant="secondary-light" disabled>
        Secondary Light
      </Button>
      <Button variant="tertiary" disabled>
        Tertiary
      </Button>
      <Button variant="tertiary-light" disabled>
        Tertiary Light
      </Button>
      <Button variant="download" disabled>
        Download
      </Button>
      <Button variant="back" disabled />
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
  },
}

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
        Continue
      </>
    ),
  },
}

export const Loading: Story = {
  args: {
    isLoading: true,
    loadingText: 'Processing',
    children: 'Submit',
  },
}

export const LoadingPerVariant: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-8">
      <Button variant="primary" isLoading loadingText="Saving">
        Save
      </Button>
      <Button variant="secondary" isLoading loadingText="Loading">
        Load
      </Button>
      <Button variant="secondary-light" isLoading loadingText="Loading">
        Load
      </Button>
      <Button variant="tertiary" isLoading loadingText="Edit">
        Edit
      </Button>
      <Button variant="tertiary-light" isLoading loadingText="Edit">
        Edit
      </Button>
      <Button variant="download" isLoading loadingText="Downloading">
        Download
      </Button>
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
  },
}

export const AllVariantsDark: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-8 bg-[#040429] min-h-screen">
      <h2 className="text-xl font-bold text-white mb-4">All Variants on Dark Background</h2>
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold text-white">Primary</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" size="sm">
            Small
          </Button>
          <Button variant="primary" size="md">
            Medium
          </Button>
          <Button variant="primary" size="lg">
            Large
          </Button>
          <Button variant="primary" disabled>
            Disabled
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold text-white">Secondary (for dark backgrounds)</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="secondary" size="sm">
            Small
          </Button>
          <Button variant="secondary" size="md">
            Medium
          </Button>
          <Button variant="secondary" size="lg">
            Large
          </Button>
          <Button variant="secondary" disabled>
            Disabled
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold text-white">Tertiary (for dark backgrounds)</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="tertiary">Edit</Button>
          <Button variant="tertiary" disabled>
            Edit
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold text-white">Download</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="download" size="sm">
            PDF Report
          </Button>
          <Button variant="download" size="md">
            CSV Export
          </Button>
          <Button variant="download" size="lg">
            Download All
          </Button>
          <Button variant="download" disabled>
            Not Available
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold text-white">Back</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="back" size="sm" />
          <Button variant="back" size="md" />
          <Button variant="back" size="lg" />
          <Button variant="back" disabled />
        </div>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
  },
}

export const AllVariantsLight: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-8 bg-white min-h-screen">
      <h2 className="text-xl font-bold text-[#1C1D24] mb-4">All Variants on Light Background</h2>
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold text-[#1C1D24]">Primary</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" size="sm">
            Small
          </Button>
          <Button variant="primary" size="md">
            Medium
          </Button>
          <Button variant="primary" size="lg">
            Large
          </Button>
          <Button variant="primary" disabled>
            Disabled
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold text-[#1C1D24]">Secondary Light (for light backgrounds)</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="secondary-light" size="sm">
            Small
          </Button>
          <Button variant="secondary-light" size="md">
            Medium
          </Button>
          <Button variant="secondary-light" size="lg">
            Large
          </Button>
          <Button variant="secondary-light" disabled>
            Disabled
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold text-[#1C1D24]">Tertiary Light (for light backgrounds)</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="tertiary-light">Edit</Button>
          <Button variant="tertiary-light" disabled>
            Edit
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold text-[#1C1D24]">Download</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="download" size="sm">
            PDF Report
          </Button>
          <Button variant="download" size="md">
            CSV Export
          </Button>
          <Button variant="download" size="lg">
            Download All
          </Button>
          <Button variant="download" disabled>
            Not Available
          </Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { default: 'light' },
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold text-[var(--text-strong)]">Primary</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" size="sm">
            Small
          </Button>
          <Button variant="primary" size="md">
            Medium
          </Button>
          <Button variant="primary" size="lg">
            Large
          </Button>
          <Button variant="primary" disabled>
            Disabled
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold text-[var(--text-strong)]">Secondary</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="secondary" size="sm">
            Small
          </Button>
          <Button variant="secondary" size="md">
            Medium
          </Button>
          <Button variant="secondary" size="lg">
            Large
          </Button>
          <Button variant="secondary" disabled>
            Disabled
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold text-[var(--text-strong)]">Secondary Light</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="secondary-light" size="sm">
            Small
          </Button>
          <Button variant="secondary-light" size="md">
            Medium
          </Button>
          <Button variant="secondary-light" size="lg">
            Large
          </Button>
          <Button variant="secondary-light" disabled>
            Disabled
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold text-[var(--text-strong)]">Tertiary</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="tertiary">Edit</Button>
          <Button variant="tertiary" disabled>
            Edit
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold text-[var(--text-strong)]">Tertiary Light</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="tertiary-light">Edit</Button>
          <Button variant="tertiary-light" disabled>
            Edit
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold text-[var(--text-strong)]">Download</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="download" size="sm">
            PDF Report
          </Button>
          <Button variant="download" size="md">
            CSV Export
          </Button>
          <Button variant="download" size="lg">
            Download All
          </Button>
          <Button variant="download" disabled>
            Not Available
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold text-[var(--text-strong)]">Back</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="back" size="sm" />
          <Button variant="back" size="md" />
          <Button variant="back" size="lg" />
          <Button variant="back" disabled />
        </div>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
  },
}
