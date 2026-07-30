import type { Meta, StoryObj } from '@storybook/react'
import { PackageCardHeroBlock } from './Component'
import type { PackageCardHeroBlock as PackageCardHeroBlockProps } from '@/payload-types'

const defaultArgs: PackageCardHeroBlockProps = {
  id: 'story-1',
  blockType: 'packageCardHero',
  blockName: 'Non-Residents Package',
  title: 'Non-Residents Package',
  description: 'This package is for people outside the UK who want to set up a limited company.',
  price: '£19.99',
  priceSuffix: '+ £100 Companies House fee',
  orderLink: {
    type: 'custom',
    url: '#',
    label: 'Order',
    newTab: false,
  },
  prefixText: 'Ideal for:',
  benefits: [
    { id: 'b1', benefit: 'A Central London registered office and business address' },
    { id: 'b2', benefit: 'Same-day digital mail and international forwarding' },
    { id: 'b3', benefit: 'VAT registration' },
    { id: 'b4', benefit: 'Filing of your first confirmation statement' },
    { id: 'b5', benefit: 'A free domain name and a company management portal' },
    {
      id: 'b6',
      benefit:
        'A Wise business account referral to help you get a UK sort code and account number',
    },
  ],
}

const meta: Meta<typeof PackageCardHeroBlock> = {
  component: PackageCardHeroBlock,
  title: 'Blocks/PackageCardHero',
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="py-16" style={{ background: 'var(--surface-canvas)' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof PackageCardHeroBlock>

export const Default: Story = {
  args: defaultArgs,
}

export const ShortBenefits: Story = {
  args: {
    ...defaultArgs,
    benefits: [
      { id: 'b1', benefit: 'Free business bank account' },
      { id: 'b2', benefit: 'Digital company documents' },
      { id: 'b3', benefit: 'Same-day formation' },
    ],
  },
}

export const NoDescription: Story = {
  args: {
    ...defaultArgs,
    description: null,
  } as PackageCardHeroBlockProps,
}
