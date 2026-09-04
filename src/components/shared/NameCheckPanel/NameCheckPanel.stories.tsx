import type { Meta, StoryObj } from '@storybook/react'

import { NameCheckPanel } from './index'

const meta: Meta<typeof NameCheckPanel> = {
  title: 'Base Components/NameCheckPanel',
  component: NameCheckPanel,
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof NameCheckPanel>

export const Basic: Story = {
  args: { packageName: 'Basic', checkoutPath: '/buy/basic-package/' },
}

// The two packages whose checkout slug diverges from the package slug.
export const LimitedByGuarantee: Story = {
  args: { packageName: 'Limited by Guarantee', checkoutPath: '/buy/limited-by-guarantee/' },
}

export const Llp: Story = {
  args: { packageName: 'LLP', checkoutPath: '/buy/limited-liability-partnership/' },
}

// Longest name in the collection — checks the heading wraps rather than overflows.
export const LongestName: Story = {
  args: {
    packageName: 'Non-Residents Plus',
    checkoutPath: '/buy/non-residents-plus-package/',
    placeholder: 'Find the perfect name for your new company',
  },
}
