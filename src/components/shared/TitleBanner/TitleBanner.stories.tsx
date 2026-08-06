import type { Meta, StoryObj } from '@storybook/react'

import { TitleBanner } from './index'

const image = {
  id: 'banner',
  url: 'https://placehold.co/1780x271/8a7a5f/ffffff?text=+',
  filename: 'banner.jpg',
  mimeType: 'image/jpeg',
  filesize: 0,
  width: 1780,
  height: 271,
  alt: 'Frequently asked questions.',
  createdAt: '',
  updatedAt: '',
} as any

const meta: Meta<typeof TitleBanner> = {
  component: TitleBanner,
  title: 'Base Components/TitleBanner',
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
type Story = StoryObj<typeof TitleBanner>

export const Default: Story = {
  args: { blockType: 'titleBanner', title: 'Frequently Asked Questions', image, isPageTitle: true },
}

export const TwoLines: Story = {
  name: 'Title wraps onto two lines',
  args: {
    blockType: 'titleBanner',
    title: 'Single Alternative Inspection Location\n(SAIL Address)',
    image,
    isPageTitle: true,
  },
}

export const PhotoOnly: Story = {
  name: 'No title — photo band only',
  args: { blockType: 'titleBanner', image, isPageTitle: true },
}

export const NotThePageHeading: Story = {
  name: 'Not the page H1',
  args: {
    blockType: 'titleBanner',
    title: 'Our business banking partners',
    image,
    isPageTitle: false,
  },
}
