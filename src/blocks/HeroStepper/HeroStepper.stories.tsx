import type { Meta, StoryObj } from '@storybook/react'
import { HeroStepperClient } from './HeroStepperClient'

const STEPS = [
  { label: 'Choose a Company Name' },
  { label: 'Select a Package' },
  { label: 'Checkout and Pay' },
  { label: 'Insert Company Details' },
]

const meta: Meta<typeof HeroStepperClient> = {
  title: 'Blocks/HeroStepper',
  component: HeroStepperClient,
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof HeroStepperClient>

export const Step1: Story = {
  args: { steps: STEPS, currentStep: 1 },
}

export const Step2: Story = {
  args: { steps: STEPS, currentStep: 2 },
}

export const Step3: Story = {
  args: { steps: STEPS, currentStep: 3 },
}

export const Step4: Story = {
  args: { steps: STEPS, currentStep: 4 },
}
