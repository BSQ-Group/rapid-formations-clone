import type { Meta, StoryObj } from '@storybook/react'
import { RegisteredOfficeAddressBlock } from './Component'

const meta: Meta<typeof RegisteredOfficeAddressBlock> = {
  title: 'Blocks/RegisteredOfficeAddress',
  component: RegisteredOfficeAddressBlock,
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
type Story = StoryObj<typeof RegisteredOfficeAddressBlock>

export const Default: Story = {
  args: {
    blockType: 'registeredOfficeAddress',
    heading: 'Our registered office address',
    address: "Your Company's Name\n71–75 Shelton Street\nCovent Garden\nLondon\nWC2H 9JQ",
    price: '£39',
    priceSuffix: ' + VAT per year',
    cta: {
      type: 'custom',
      url: '#',
      label: 'Buy now',
      newTab: false,
    } as never,
    image: {
      id: 1,
      url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&h=900&fit=crop',
      alt: 'Registered office meeting room',
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
