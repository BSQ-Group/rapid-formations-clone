import type { Meta, StoryObj } from '@storybook/react'

import { Collapsible } from './Collapsible'

const answer = (text: string) => (
  <p className="pt-4 pb-8 text-[22px] leading-[33px] text-[var(--text-on-light-muted)]">{text}</p>
)

const meta: Meta<typeof Collapsible> = {
  title: 'Base Components/Collapsible',
  component: Collapsible,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--surface-canvas)', width: '900px', maxWidth: '90vw' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Collapsible>

export const Default: Story = {
  args: {
    items: [
      {
        id: '1',
        title: 'What is a limited company?',
        content: answer(
          'A limited company is a type of business structure that is legally separate from the people who own and run it.',
        ),
      },
      {
        id: '2',
        title: 'How long does it take to form a company?',
        content: answer('Most applications are approved by Companies House within 24 hours.'),
      },
      {
        id: '3',
        title: 'Do I need a registered office address?',
        content: answer(
          'Yes. Every UK company must have a registered office address in the same country in which it is incorporated.',
        ),
      },
    ],
  },
}

export const SingleItem: Story = {
  args: {
    items: [
      {
        id: '1',
        title: 'Do I need a registered office address?',
        content: answer('Yes. Every UK company must have a registered office address.'),
      },
    ],
  },
}

export const LongTitles: Story = {
  args: {
    items: [
      {
        id: '1',
        title:
          'What information do I need to provide to Companies House when I incorporate a private company limited by shares in the United Kingdom?',
        content: answer(
          'Company name, registered office address, at least one director, at least one shareholder, and a statement of capital.',
        ),
      },
      {
        id: '2',
        title:
          'Grundstucksverkehrsgenehmigungszustandigkeitsubertragungsverordnung and other unbroken tokens that must wrap',
        content: answer('An unbroken token should wrap rather than overflow the trigger.'),
      },
    ],
  },
}

export const HeadingLevelTwo: Story = {
  args: {
    headingAs: 'h2',
    items: Default.args!.items!,
  },
}

export const Empty: Story = {
  args: { items: [] },
}
