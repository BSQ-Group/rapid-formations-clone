import type { Meta, StoryObj } from '@storybook/react'
import { TrustPilotBannerBlock } from './Component'

const meta: Meta<typeof TrustPilotBannerBlock> = {
  title: 'Blocks/TrustPilotBanner',
  component: TrustPilotBannerBlock,
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
type Story = StoryObj<typeof TrustPilotBannerBlock>

export const Default: Story = {
  args: {
    blockType: 'trustpilotBanner',
    businessUnitId: '51d2b23c0000640005506d5b',
    locale: 'en-GB',
  },
}
