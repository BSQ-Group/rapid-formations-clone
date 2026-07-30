import type { Meta, StoryObj } from '@storybook/react'
import { PromoTier3Block } from './Component'
import type { PromoTier3Block as PromoTier3BlockProps } from '@/payload-types'

const mockBg = {
  id: 'bg-1',
  url: '/promo-tier-3-bg.jpg',
  filename: 'promo-tier-3-bg.jpg',
  mimeType: 'image/jpeg',
  filesize: 0,
  width: 1800,
  height: 360,
  alt: 'Promo Tier 3 background',
  createdAt: '',
  updatedAt: '',
} as any

const defaultArgs: PromoTier3BlockProps = {
  id: 'story-1',
  blockType: 'promoTier3',
  blockName: 'Promo Tier 3',
  eyebrow: 'BEST VALUE: UPGRADE & SAVE',
  title: 'Hassle Free Compliance Service',
  description:
    'Receive 30% off company changes, plus access to document templates and dedicated compliance support whenever you need it.',
  pills: [
    { id: 'p1', label: 'Includes confirmation statement filing' },
    { id: 'p2', label: 'Document templates' },
    { id: 'p3', label: 'Dedicated compliance support' },
  ],
  price: '£149.99',
  priceCaption: 'per year',
  backgroundImage: mockBg,
  cta: {
    type: 'custom',
    url: '/services/hassle-free-compliance',
    label: 'Find out more',
    appearance: 'default',
    newTab: false,
  },
  sectionLayout: { background: 'light', paddingTop: 'm', paddingBottom: 'm' },
}

const meta: Meta<typeof PromoTier3Block> = {
  component: PromoTier3Block,
  title: 'Blocks/PromoTier3',
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--surface-canvas)' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof PromoTier3Block>

export const Default: Story = { args: defaultArgs }

export const ShortCopy: Story = {
  args: {
    ...defaultArgs,
    title: 'Hassle Free Compliance',
    description: 'Receive 30% off company changes and dedicated support.',
    pills: [
      { id: 'p1', label: 'Confirmation statement filing' },
      { id: 'p2', label: 'Document templates' },
    ],
  },
}

export const NoPills: Story = {
  args: {
    ...defaultArgs,
    pills: [],
  },
}
