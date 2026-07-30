import type { Meta, StoryObj } from '@storybook/react'

import { PackagesNavClient, type PackagesNavTab } from './PackagesNavClient'

const tabs: PackagesNavTab[] = [
  { id: '1', href: '/formation-packages', label: 'Limited Company' },
  { id: '2', href: '/non-residents', label: 'Non-Residents' },
  { id: '3', href: '/multiple-share', label: 'Multiple Share' },
  { id: '4', href: '/guarantee', label: 'Guarantee' },
  { id: '5', href: '/llp', label: 'LLP' },
]

const meta: Meta<typeof PackagesNavClient> = {
  title: 'Blocks/PackagesNav',
  component: PackagesNavClient,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      navigation: {
        pathname: '/formation-packages',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--surface-canvas)', minHeight: '100vh', padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof PackagesNavClient>

export const Default: Story = {
  args: { tabs },
}

export const Mobile: Story = {
  args: { tabs },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
}
