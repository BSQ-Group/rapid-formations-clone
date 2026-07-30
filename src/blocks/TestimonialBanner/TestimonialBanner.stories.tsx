import type { Meta, StoryObj } from '@storybook/react'
import { TestimonialBannerBlock } from './Component'

const meta: Meta<typeof TestimonialBannerBlock> = {
  title: 'Blocks/TestimonialBanner',
  component: TestimonialBannerBlock,
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
type Story = StoryObj<typeof TestimonialBannerBlock>

export const Default: Story = {
  args: {
    blockType: 'testimonialBanner',
    quote:
      'No hassle, very reasonable cost. The website help was brilliant too. All my questions answered in an easy to understand fashion.',
    authorName: 'Jonathan Harvey',
    authorRole: 'Quality Company Formations customer',
  },
}

export const NoRole: Story = {
  args: {
    ...Default.args,
    authorRole: null,
  },
}
