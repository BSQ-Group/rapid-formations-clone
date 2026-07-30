import type { Meta, StoryObj } from '@storybook/react'
import { ServicesTestimonialBlock } from './Component'

const meta: Meta<typeof ServicesTestimonialBlock> = {
  title: 'Blocks/ServicesTestimonial',
  component: ServicesTestimonialBlock,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="theme-qualitycompanyformations bg-[var(--surface-canvas)]">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ServicesTestimonialBlock>

export const Default: Story = {
  args: {
    blockType: 'servicesTestimonial',
    quoteText:
      'No hassle, very reasonable cost. The website help was brilliant too. All my questions answered in an easy to understand fashion.',
    authorName: 'Sandra Lawton',
    authorRole: 'Quality Company Formations customer',
  },
}

export const NoRole: Story = {
  args: {
    ...Default.args,
    authorRole: null,
  },
}
