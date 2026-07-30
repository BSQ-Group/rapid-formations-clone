import type { Meta, StoryObj } from '@storybook/react'
import { ServicesCTABlock } from './Component'

const meta: Meta<typeof ServicesCTABlock> = {
  title: 'Blocks/ServicesCTA',
  component: ServicesCTABlock,
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
type Story = StoryObj<typeof ServicesCTABlock>

const mockBgImage = {
  id: 1,
  url: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=600&fit=crop',
  alt: 'Green gradient background',
  width: 1200,
  height: 600,
  filename: 'services-cta-bg.png',
  mimeType: 'image/png',
  filesize: 0,
  createdAt: '',
  updatedAt: '',
} as any

export const Default: Story = {
  args: {
    blockType: 'servicesCTA',
    title: 'Get your registered office address today',
    description: 'Only £39 +VAT per year',
    trustPillBoldPrefix: '350,000+ UK',
    trustPillText: 'companies formed · Rated Excellent on Trustpilot',
    ctaLink: {
      type: 'custom',
      url: '#',
      label: 'Order now',
    },
    backgroundImage: mockBgImage,
  },
}

export const NoPill: Story = {
  args: {
    ...Default.args,
    trustPillBoldPrefix: null,
    trustPillText: null,
  },
}

export const NoBackground: Story = {
  args: {
    ...Default.args,
    backgroundImage: null,
  },
}
