import type { Meta, StoryObj } from '@storybook/react'
import { EmptyState } from './EmptyState'
import React from 'react'
import { AlertCircle, FileX, Search, BriefcaseBusiness } from 'lucide-react'

const meta: Meta<typeof EmptyState> = {
  component: EmptyState,
  title: 'Components/EmptyState',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[800px]">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof EmptyState>

export const Default: Story = {
  args: {
    title: 'You have no companies',
    description: 'You can create a new company by clicking the button above.',
    icon: <BriefcaseBusiness className="w-8 h-8 stroke-current" />,
  },
}

export const NoSearchResults: Story = {
  args: {
    title: 'No search results',
    description:
      "We couldn't find any companies matching your search criteria. Try adjusting your filters or search terms.",
    icon: <Search className="w-8 h-8 stroke-current" />,
  },
}

export const NoAccess: Story = {
  args: {
    title: 'No access to companies',
    description:
      "You don't have access to view any companies. Please contact your administrator to request access.",
    icon: <FileX className="w-8 h-8 stroke-current" />,
  },
}

export const SystemError: Story = {
  args: {
    title: 'Something went wrong',
    description:
      'We encountered an error while loading the companies. Please try again later or contact support if the problem persists.',
    icon: (
      <div className="text-red-500">
        <AlertCircle className="w-8 h-8 stroke-[2]" />
      </div>
    ),
  },
}
