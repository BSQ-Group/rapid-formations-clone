import type { Meta, StoryObj } from '@storybook/react'
import { OfficePhotoAddressBlock } from './Component'

const meta: Meta<typeof OfficePhotoAddressBlock> = {
  title: 'Blocks/OfficePhotoAddress',
  component: OfficePhotoAddressBlock,
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
type Story = StoryObj<typeof OfficePhotoAddressBlock>

export const Default: Story = {
  args: {
    blockType: 'officePhotoAddress',
    eyebrow: 'Your registered office address will be:',
    address: 'Your Company Name\n71-75 Shelton Street\nCovent Garden\nLondon\nWC2H 9JQ',
    image: {
      id: 1,
      url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&h=900&fit=crop',
      alt: '71-75 Shelton Street office facade',
      width: 1600,
      height: 900,
      filename: 'office.jpg',
      mimeType: 'image/jpeg',
      filesize: 0,
      createdAt: '',
      updatedAt: '',
    } as never,
  },
}
