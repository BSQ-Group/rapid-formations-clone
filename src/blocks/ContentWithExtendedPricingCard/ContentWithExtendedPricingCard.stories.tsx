import type { Meta, StoryObj } from '@storybook/react'
import { ContentWithExtendedPricingCardBlock } from './Component'

const meta: Meta<typeof ContentWithExtendedPricingCardBlock> = {
  title: 'Blocks/ContentWithExtendedPricingCard',
  component: ContentWithExtendedPricingCardBlock,
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
type Story = StoryObj<typeof ContentWithExtendedPricingCardBlock>

export const Default: Story = {
  args: {
    blockType: 'contentWithExtendedPricingCard',
    title: 'Business Telephone Number',
    intro:
      "First impressions count! That's why Quality Company Formations provides an affordable business telephone number service for our clients. Displaying a professional business telephone number on your website instead of a mobile number may mean the difference between capturing a new client or losing them. Most important of all, your business will appear bigger and more established.",
    sections: [
      {
        id: '1',
        heading: 'Why do I need a Business Telephone Number?',
        bulletItems: [
          { id: 'b1', text: 'Enhances your business image.' },
          { id: 'b2', text: 'No need to invest in expensive phone systems.' },
          { id: 'b3', text: 'Makes you look much bigger and more established.' },
          { id: 'b4', text: 'No set up fee - your number can be live within minutes.' },
          {
            id: 'b5',
            text: 'You can have a London 020 or regional landline, even if you only have a mobile number.',
          },
          { id: 'b6', text: 'Calls to your business number can be routed to your number of choice.' },
        ],
      },
    ],
    card: {
      price: 'Only £9.99 per month',
      serviceLabel: 'Business Telephone Number',
      cta: {
        type: 'custom',
        label: 'Buy now',
        url: '/order',
      },
      feature: {
        title: 'Improve your corporate image',
        description:
          'We will provide you with your own unique 020 London or regional telephone number. You can use this number as your new business number on your company stationery, website, advertising, etc., and we will forward all calls to your mobile or landline handset for you to answer.',
      },
      detailsTitle: 'Details & Costs',
      details: [
        {
          id: 'd1',
          label: '020 London or regional telephone number:',
          value: 'Free',
        },
        {
          id: 'd2',
          label: '24/7 call divert charges:',
          value: 'FREE to UK numbers. Calls diverted internationally incur BT Standard Rates.',
        },
        {
          id: 'd3',
          label: 'Contract period:',
          value: 'Month-to-month',
        },
      ],
    },
    sectionLayout: {
      background: 'light',
      paddingTop: 'l',
      paddingBottom: 'l',
    },
  },
}

export const WithoutExtendedFields: Story = {
  args: {
    blockType: 'contentWithExtendedPricingCard',
    title: 'Business Telephone Number',
    intro:
      'A simpler variant where the optional feature and details sections are omitted — the card behaves like the standard pricing card.',
    sections: [
      {
        id: '1',
        heading: 'Why do I need a Business Telephone Number?',
        bulletItems: [
          { id: 'b1', text: 'Enhances your business image.' },
          { id: 'b2', text: 'Makes you look much bigger and more established.' },
        ],
      },
    ],
    card: {
      price: 'Only £9.99 per month',
      serviceLabel: 'Business Telephone Number',
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
