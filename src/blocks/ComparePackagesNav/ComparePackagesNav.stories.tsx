import type { Meta, StoryObj } from '@storybook/react'

import { ComparePackagesNavList } from './ComparePackagesNavList'

const SOURCE_TABS = [
  { id: '1', href: '/compare-packages', label: 'Limited Company' },
  { id: '2', href: '/compare-packages/non-residents', label: 'Non-Residents' },
  { id: '3', href: '/compare-packages/guarantee', label: 'Guarantee' },
  { id: '4', href: '/compare-packages/llp', label: 'LLP' },
]

const narrow = {
  parameters: {
    viewport: {
      options: {
        mobile360: {
          name: 'Mobile 360',
          styles: { width: '360px', height: '600px' },
          type: 'mobile',
        },
      },
    },
  },
  globals: { viewport: { value: 'mobile360' } },
}

const meta: Meta<typeof ComparePackagesNavList> = {
  title: 'Blocks/ComparePackagesNav',
  component: ComparePackagesNavList,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="surface-canvas font-legacy-condensed p-5">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ComparePackagesNavList>

export const Default: Story = {
  args: { tabs: SOURCE_TABS, activeHref: '/compare-packages' },
}

export const LastTabActive: Story = {
  args: { tabs: SOURCE_TABS, activeHref: '/compare-packages/llp' },
}

export const TrailingSlashHref: Story = {
  name: 'Active match ignores trailing slash',
  args: { tabs: SOURCE_TABS, activeHref: '/compare-packages/guarantee/' },
}

export const NoActiveTab: Story = {
  args: { tabs: SOURCE_TABS, activeHref: '/somewhere-else' },
}

export const TwoTabs: Story = {
  args: { tabs: SOURCE_TABS.slice(0, 2), activeHref: '/compare-packages' },
}

const LONG_LABEL_TABS = [
  {
    id: '1',
    href: '/compare-packages',
    label: 'Private Company Limited by Shares',
    newTab: false,
  },
  { id: '2', href: '/compare-packages/non-residents', label: 'Non-UK Resident Formations' },
  {
    id: '3',
    href: '/compare-packages/guarantee',
    label: 'Company Limited by Guarantee for Clubs',
  },
  { id: '4', href: '/compare-packages/llp', label: 'Limited Liability Partnership' },
]

export const LongLabels: Story = {
  args: { tabs: LONG_LABEL_TABS, activeHref: '/compare-packages' },
}

export const UnbrokenToken: Story = {
  args: {
    tabs: [
      { id: '1', href: '/compare-packages', label: 'compare-packages@rapidformations.co.uk' },
      { id: '2', href: '/compare-packages/llp', label: 'LLP' },
    ],
    activeHref: '/compare-packages',
  },
}

export const DefaultNarrow: Story = {
  args: { tabs: SOURCE_TABS, activeHref: '/compare-packages' },
  ...narrow,
}

export const LongLabelsNarrow: Story = {
  args: { tabs: LONG_LABEL_TABS, activeHref: '/compare-packages' },
  ...narrow,
}
