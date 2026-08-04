import type { Meta, StoryObj } from '@storybook/react'

import { PackageGridCard, type PackageGridCardHighlight } from './index'

const highlights = (extra: string[] = []): PackageGridCardHighlight[] =>
  [
    'LTD Company Formation with ID Verification & Personal Code',
    'Free Business Bank Account',
    'Full Set of Company Documents',
    'Filing of the First Confirmation Statement',
    ...extra,
  ].map((text, i) => ({ id: `h${i}`, text }))

const meta: Meta<typeof PackageGridCard> = {
  component: PackageGridCard,
  title: 'Base Components/PackageGridCard',
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div
        style={{
          background: 'var(--surface-on-light-canvas)',
          padding: '2.5rem',
          width: '360px',
        }}
      >
        <Story />
      </div>
    ),
  ],
  args: {
    name: 'Basic',
    nameHref: '/package/basic-package',
    price: '£2.99',
    priceNote: '+ £100 Companies House Fee',
    description: 'Simple company formation to get started with no extras.',
    highlightsTitle: 'Highlights',
    highlights: highlights(),
    buyHref: '/name-check-basic-package',
    buyLabel: 'Buy Now',
    readMoreHref: '/package/basic-package',
    readMoreLabel: 'Read More',
  },
}

export default meta
type Story = StoryObj<typeof PackageGridCard>

export const Default: Story = {}

export const WithBadge: Story = {
  args: {
    name: 'All Inclusive',
    price: '£99.99',
    badgeText: 'Most Popular',
    description: 'Everything in Privacy, plus a full year of London addresses.',
    highlights: highlights([
      'London Registered Office',
      'London Service Address',
      'London Business Address',
    ]),
  },
}

export const WithTooltips: Story = {
  args: {
    highlights: [
      {
        id: 'h0',
        text: 'LTD Company Formation with ID Verification & Personal Code',
        tooltipTitle: 'ID verification',
        tooltip:
          'Companies House requires every director to verify their identity.\n\nWe handle the verification and issue your personal code.',
      },
      { id: 'h1', text: 'Free Business Bank Account' },
      {
        id: 'h2',
        text: 'Filing of the First Confirmation Statement',
        tooltipTitle: 'Confirmation statement',
        tooltip: 'We file your first confirmation statement, worth £34, at no extra cost.',
      },
    ],
  },
}

export const NameNotLinked: Story = {
  args: { nameHref: null, readMoreHref: null, readMoreLabel: null },
}

export const MinimalContent: Story = {
  args: {
    name: 'Guarantee',
    price: '£29.99',
    priceNote: null,
    description: null,
    highlightsTitle: null,
    highlights: null,
    buyHref: null,
    buyLabel: null,
    readMoreHref: null,
    readMoreLabel: null,
  },
}

export const LongCopy: Story = {
  args: {
    name: 'Company Formation With Registered Office And Service Address Included',
    price: '£1,299.99',
    priceNote: '+ £100 Companies House Fee, billed annually on renewal',
    description:
      'A deliberately overlong description used to check that the card wraps rather than overflowing, and that the minimum heights still line the cards up.',
    badgeText: 'Best Value For Larger Companies',
    highlights: highlights([
      'A highlight long enough to wrap onto three separate lines in the card',
    ]),
  },
}
