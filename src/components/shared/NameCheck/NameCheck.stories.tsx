import type { Meta, StoryObj } from '@storybook/react'

import { NameCheck } from './index'

const meta: Meta<typeof NameCheck> = {
  component: NameCheck,
  title: 'Base Components/NameCheck',
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="font-legacy-condensed mx-auto w-full max-w-[1230px] px-5 py-10 min-[1023px]:px-[30px]">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof NameCheck>

export const PackageVariant: Story = {
  name: 'Package page — idle',
  args: { variant: 'package', checkoutPath: '/order/basic-package' },
}

export const PackageWithPlaceholder: Story = {
  name: 'Package page — custom placeholder',
  args: {
    variant: 'package',
    checkoutPath: '/order/privacy-package',
    placeholder: 'Enter your company name',
  },
}

export const HeroVariant: Story = {
  name: 'Hero — idle',
  args: { variant: 'hero' },
  decorators: [
    (Story) => (
      <div className="bg-[var(--surface-hero-brand)] p-10">
        <Story />
      </div>
    ),
  ],
}
