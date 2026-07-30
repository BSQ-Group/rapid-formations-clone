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
    businessUnitId: '5714e6d50000ff00058baea3',
    locale: 'en-GB',
  },
}
