import type { Meta, StoryObj } from '@storybook/react'
import { ServicesHeroBlock } from './Component'

const meta: Meta<typeof ServicesHeroBlock> = {
  title: 'Blocks/ServicesHero',
  component: ServicesHeroBlock,
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
type Story = StoryObj<typeof ServicesHeroBlock>

const mockImage = (url: string, alt: string) =>
  ({
    id: 1,
    url,
    alt,
    width: 800,
    height: 600,
    filename: 'hero.jpg',
    mimeType: 'image/jpeg',
    filesize: 0,
    createdAt: '',
    updatedAt: '',
  }) as any

export const Default: Story = {
  args: {
    blockType: 'servicesHero',
    title: 'Registered Office Address Service',
    description: 'Prestigious Covent Garden, London WC2 address',
    priceText: 'Only £39.00',
    priceSuffix: '+VAT per year',
    heroImage1: mockImage(
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=840&h=600&fit=crop',
      'Covent Garden interior',
    ),
    heroImage2: mockImage(
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=480&h=320&fit=crop',
      'Covent Garden street',
    ),
    addressCard: {
      companyName: 'Your Company Ltd',
      address: '71–75 Shelton Street\nCovent Garden\nLondon  \nWC2H 9JQ',
      badges: [
        { id: '1', label: 'Privacy' },
        { id: '2', label: 'Mail forwarding' },
        { id: '3', label: 'EC2 London' },
      ],
    },
  },
}
