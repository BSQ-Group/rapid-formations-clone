import type { Meta, StoryObj } from '@storybook/react'

import { NameCheckPackagesBlock } from './Component'

const meta: Meta<typeof NameCheckPackagesBlock> = {
  component: NameCheckPackagesBlock,
  title: 'Blocks/NameCheckPackages',
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
type Story = StoryObj<typeof NameCheckPackagesBlock>

export const Basic: Story = {
  args: { packageName: 'Basic', checkoutPath: '/buy/basic-package/' },
}

export const AllInclusive: Story = {
  args: { packageName: 'All Inclusive', checkoutPath: '/buy/all-inclusive-package/' },
}

export const LimitedByGuarantee: Story = {
  name: 'Limited by Guarantee (checkout path differs from slug)',
  args: { packageName: 'Limited by Guarantee', checkoutPath: '/buy/limited-by-guarantee/' },
}

export const Llp: Story = {
  name: 'LLP (checkout path differs from slug)',
  args: { packageName: 'LLP', checkoutPath: '/buy/limited-liability-partnership/' },
}

export const NonResidentsPlus: Story = {
  args: { packageName: 'Non-Residents Plus', checkoutPath: '/buy/non-residents-plus-package/' },
}
