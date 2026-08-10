import type { Meta, StoryObj } from '@storybook/react'

import { OrderSteps } from './index'

const meta: Meta<typeof OrderSteps> = {
  component: OrderSteps,
  title: 'Base Components/OrderSteps',
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="font-legacy-condensed mx-auto w-full max-w-[1230px] bg-[var(--surface-canvas)] px-5 py-6 min-[1023px]:px-[30px]">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof OrderSteps>

export const ChooseCompanyName: Story = {
  name: 'Step 1 — Choose Company Name',
  args: { currentStep: 1 },
}

export const SelectPackage: Story = {
  name: 'Step 2 — Select Package',
  args: { currentStep: 2 },
}

export const CheckoutAndPay: Story = {
  name: 'Step 3 — Checkout & Pay',
  args: { currentStep: 3 },
}

export const EnterCompanyDetails: Story = {
  name: 'Step 4 — Enter Company Details',
  args: { currentStep: 4 },
}
