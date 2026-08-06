import type { Meta, StoryObj } from '@storybook/react'

import { FaqQuickNav } from './index'

const topics = [
  { title: 'Annual Accounts', url: '/faqs/annual-accounts' },
  { title: 'Basics', url: '/faqs/basics' },
  { title: 'Companies Limited by Guarantee', url: '/faqs/limited-by-guarantee' },
  { title: 'Companies Limited by Shares', url: '/faqs/limited-by-shares' },
  { title: 'Company Meetings and Resolutions', url: '/faqs/company-meetings-and-resolutions' },
  { title: 'Company Names', url: '/faqs/company-names' },
  { title: 'Company Records and Registers', url: '/faqs/company-records-and-registers' },
  { title: 'Company Secretary', url: '/faqs/company-secretary' },
  { title: 'Confirmation Statement', url: '/faqs/confirmation-statement' },
  { title: 'Corporation Tax', url: '/faqs/corporation-tax' },
  { title: 'Directors', url: '/faqs/directors' },
  { title: 'VAT', url: '/faqs/vat' },
]

const meta: Meta<typeof FaqQuickNav> = {
  component: FaqQuickNav,
  title: 'Base Components/FaqQuickNav',
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="font-legacy-condensed flex min-h-[560px] w-[420px] justify-end bg-[var(--surface-canvas)] p-6">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof FaqQuickNav>

export const Default: Story = {
  name: 'Closed',
  args: { topics },
}

export const SingleTopic: Story = {
  name: 'One topic',
  args: { topics: [topics[0]] },
}

export const CustomLabels: Story = {
  name: 'Relabelled',
  args: {
    topics,
    title: 'Jump to a topic',
    homeLabel: 'All FAQs',
  },
}

export const Empty: Story = {
  name: 'No topics — renders nothing',
  args: { topics: [] },
}
