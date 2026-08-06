import type { Meta, StoryObj } from '@storybook/react'

import { ClosingCTA } from './index'

const meta: Meta<typeof ClosingCTA> = {
  component: ClosingCTA,
  title: 'Base Components/ClosingCTA',
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="bg-[var(--surface-canvas)] pt-10">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ClosingCTA>

const cta = { type: 'custom' as const, url: '/', label: 'Get Started', newTab: false }

export const Default: Story = {
  args: {
    blockType: 'closingCTA',
    heading: 'Are you ready to register your company today?',
    description: 'Order online or if you have any questions, please use our live chat facility.',
    cta,
  },
}

export const CompanyRegistration: Story = {
  name: 'Company registration variant',
  args: {
    blockType: 'closingCTA',
    heading: 'Register your company today',
    description: 'Included with your package is a bank account from one of our partners.',
    cta,
  },
}

export const HeadingOnly: Story = {
  name: 'No description',
  args: { blockType: 'closingCTA', heading: 'Register your company today', cta },
}
