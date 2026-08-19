import type { Meta, StoryObj } from '@storybook/react'

import { PageTitle } from './index'
import { BuyNowView } from './BuyNow'

const BUY = 'https://client.rapidformations.co.uk/login?re=/companies/'

const buyNow = (price: string | null, labels: string[] = ['Buy Now']) => (
  <BuyNowView
    price={price}
    buttons={labels.map((label, i) => ({
      label,
      href: BUY,
      variant: i === 0 ? ('success' as const) : ('secondary' as const),
    }))}
  />
)

const meta: Meta<typeof PageTitle> = {
  component: PageTitle,
  title: 'Base Components/PageTitle',
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
type Story = StoryObj<typeof PageTitle>

const sectionLayout = {
  background: 'light',
  paddingTop: 'none',
  paddingBottom: 'none',
} as const

export const Default: Story = {
  args: { title: 'Environmental Policy', sectionLayout },
}

export const LongTitle: Story = {
  name: 'Wraps onto two lines',
  args: {
    title: 'Whistleblowing and Grievance Mechanism Policies for Rapid Formations Limited',
    sectionLayout,
  },
}

export const NoTitleAtAll: Story = {
  name: 'Nothing to render',
  args: { title: null, sectionLayout },
}

export const WithBuyNow: Story = {
  name: 'Buy Now — price and button',
  args: { title: 'ICO Registration', sectionLayout, aside: buyNow('89.99') },
}

export const BuyNowTwoButtons: Story = {
  args: {
    title: 'Countingup Business Account',
    sectionLayout,
    aside: buyNow('9.99', ['Buy Now', 'View Packages']),
  },
}

export const BuyNowPriceOnly: Story = {
  args: { title: 'Transfer of Shares Service', sectionLayout, aside: buyNow('129.99', []) },
}

export const BuyNowButtonOnly: Story = {
  args: { title: 'Business Telephone Number', sectionLayout, aside: buyNow(null) },
}

export const BuyNowLongTitle: Story = {
  name: 'Buy Now beside a title that wraps',
  args: {
    title: 'Director Appointment and Resignation Service for Limited Companies',
    sectionLayout,
    aside: buyNow('49.99'),
  },
}

export const BuyNowLongLabel: Story = {
  args: {
    title: 'Company Dissolution Service',
    sectionLayout,
    aside: buyNow('89.99', ['Buy this service now', 'Compare every package']),
  },
}
