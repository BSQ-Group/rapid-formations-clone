import type { Meta, StoryObj } from '@storybook/react'
import { ContentWithPricingCardBlock } from './Component'

const meta: Meta<typeof ContentWithPricingCardBlock> = {
  title: 'Blocks/ContentWithPricingCard',
  component: ContentWithPricingCardBlock,
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
type Story = StoryObj<typeof ContentWithPricingCardBlock>

export const Default: Story = {
  args: {
    blockType: 'contentWithPricingCard',
    sections: [
      {
        id: '1',
        heading: 'Why close my company?',
        bulletItems: [
          { id: 'b1', text: 'Save money and time on filing of annual accounts and confirmation statements' },
          { id: 'b2', text: 'Avoid the risk of fines and prosecutions for late filings' },
          { id: 'b3', text: 'Avoid having an involuntary dissolution on your public record as a director, protecting your reputation as a director' },
          { id: 'b4', text: 'All the work is done by us, all you need to do is electronically sign the application to dissolve' },
          { id: 'b5', text: 'We will use our best endeavours to iron out all problems and obstacles' },
        ],
        tickItems: [],
      },
      {
        id: '2',
        heading: 'What do I need to do?',
        bulletItems: [],
        tickItems: [
          { id: 't1', text: 'Simply purchase the product and electronically sign the application to dissolve. We will do the rest.' },
        ],
      },
    ],
    card: {
      price: 'Only £89.99 +VAT',
      serviceLabel: 'Company Dissolution Service',
      cta: {
        type: 'custom',
        label: 'Buy now',
        url: '/order',
      },
    },
    sectionLayout: {
      background: 'light',
      paddingTop: 'l',
      paddingBottom: 'l',
    },
  },
}

export const SingleSection: Story = {
  args: {
    blockType: 'contentWithPricingCard',
    sections: [
      {
        id: '1',
        heading: 'What is included?',
        bulletItems: [
          { id: 'b1', text: 'Preparation and submission of the DS01 form to Companies House' },
          { id: 'b2', text: 'Notifying all relevant parties of the dissolution' },
        ],
        tickItems: [
          { id: 't1', text: 'Dedicated account manager throughout the process' },
          { id: 't2', text: 'Full compliance with Companies House requirements' },
        ],
      },
    ],
    card: {
      price: 'Only £89.99 +VAT',
      serviceLabel: 'Company Dissolution Service',
      cta: {
        type: 'custom',
        label: 'Get started',
        url: '/order',
      },
    },
    sectionLayout: {
      background: 'light',
      paddingTop: 'l',
      paddingBottom: 'l',
    },
  },
}
