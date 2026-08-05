import type { Meta, StoryObj } from '@storybook/react'

import { SectionTitle } from './SectionTitle'

const meta: Meta<typeof SectionTitle> = {
  component: SectionTitle,
  title: 'Base Components/SectionTitle',
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="font-legacy-condensed bg-[var(--surface-canvas)] px-6 py-8">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof SectionTitle>

export const Default: Story = {
  args: {
    title: 'Our business banking partners',
    subtitle:
      'We’ve partnered with leading financial providers to offer your new company a free business bank account.',
    className: 'mb-10 text-center',
  },
}

export const TitleOnly: Story = {
  args: { title: 'Made by Rapid Formations', className: 'mb-10 text-center' },
}

export const LeftAligned: Story = {
  args: {
    title: 'Information required for UK company formation',
    subtitle: 'Registering a company in the UK is quick and straightforward.',
    className: 'mb-10 text-left',
  },
}
