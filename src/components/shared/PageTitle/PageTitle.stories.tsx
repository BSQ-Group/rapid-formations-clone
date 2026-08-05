import type { Meta, StoryObj } from '@storybook/react'

import { PageTitle } from './index'

const meta: Meta<typeof PageTitle> = {
  component: PageTitle,
  title: 'Base Components/PageTitle',
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="bg-[var(--surface-canvas)]">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof PageTitle>

const sectionLayout = {
  background: 'light',
  paddingTop: 'none',
  paddingBottom: 'none',
} as const

export const Default: Story = {
  args: { title: 'Environmental Policy', sectionLayout },
}

export const LongTitle: Story = {
  name: 'Wraps onto two lines',
  args: {
    title: 'Whistleblowing and Grievance Mechanism Policies for Rapid Formations Limited',
    sectionLayout,
  },
}

export const NoTitleAtAll: Story = {
  name: 'Nothing to render',
  args: { title: null, sectionLayout },
}
