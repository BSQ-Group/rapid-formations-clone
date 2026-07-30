import type { Meta, StoryObj } from '@storybook/react'
import { PromoTier2Block } from './Component'
import type { PromoTier2Block as PromoTier2BlockProps } from '@/payload-types'

const defaultArgs: PromoTier2BlockProps = {
  id: 'story-1',
  blockType: 'promoTier2',
  blockName: 'Promo Tier 2',
  icon: 'FileCheck2',
  title: 'File your Confirmation Statement now',
  pricePrefix: 'from',
  price: '£75.99 +VAT',
  cta: {
    type: 'custom',
    url: '/order/confirmation-statement',
    label: 'Buy now',
    appearance: 'default',
    newTab: false,
  },
  sectionLayout: { background: 'inverse', paddingTop: 'xs', paddingBottom: 'xs' },
}

const meta: Meta<typeof PromoTier2Block> = {
  component: PromoTier2Block,
  title: 'Blocks/PromoTier2',
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof PromoTier2Block>

export const Default: Story = { args: defaultArgs }

export const LongerTitle: Story = {
  args: {
    ...defaultArgs,
    title: 'File your Confirmation Statement before the deadline',
    price: '£89.99 +VAT',
  },
}
