import type { Meta, StoryObj } from '@storybook/react'
import { HowItWorksBlock } from './Component'

const meta: Meta<typeof HowItWorksBlock> = {
  title: 'Blocks/HowItWorks',
  component: HowItWorksBlock,
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
type Story = StoryObj<typeof HowItWorksBlock>

const mockImage = {
  id: 'mock-image',
  filename: 'placeholder.jpg',
  alt: 'Step background',
  url: 'https://placehold.co/896x1169/e2e8f0/94a3b8?text=Step',
  width: 896,
  height: 1169,
  createdAt: '',
  updatedAt: '',
}

export const Default: Story = {
  args: {
    blockType: 'howItWorks',
    heading: 'How it works',
    description: 'Get your business up and running in three simple steps.',
    steps: [
      {
        id: '1',
        stepNumber: '01',
        title: 'Choose your package',
        body: 'Select from our range of company formation packages to find the one that suits your needs and budget.',
        image: mockImage,
      },
      {
        id: '2',
        stepNumber: '02',
        title: 'Complete your details',
        body: "Fill in your company details using our simple online form. It only takes a few minutes — we'll guide you through every step.",
        image: mockImage,
      },
      {
        id: '3',
        stepNumber: '03',
        title: 'We take care of the rest',
        body: "Once submitted, we'll handle the Companies House registration and send everything you need straight to your inbox.",
        image: mockImage,
      },
    ],
    ctaLink: {
      type: 'custom',
      url: '#',
      label: 'Get started today',
      newTab: false,
    },
    priceText: 'from £12.99 + VAT',
  },
}

export const NoDescription: Story = {
  args: {
    ...Default.args,
    description: null,
  },
}

