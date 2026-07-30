import type { Meta, StoryObj } from '@storybook/react'
import { ChooseCompanyStructureBlock } from './Component'

const defaultArgs = {
  id: 'story-1',
  blockType: 'chooseCompanyStructure' as const,
  blockName: 'Choose Company Structure',
  heading: 'Choose a company structure that suits your needs',
  description:
    'Quality Company Formations offers the largest range of company structures in the UK.\nWe are widely recognised as an authority in company formation and company secretarial matters.',
  cards: [
    {
      id: 'card-1',
      title: 'LTD',
      cardDescription: 'Private company limited by shares',
      image: {
        id: '1',
        url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=700&h=480&fit=crop',
        alt: 'Business owner in cafe',
        filename: 'ltd-card.jpg',
        mimeType: 'image/jpeg',
        filesize: 100000,
        width: 700,
        height: 480,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      },
      link: { type: 'custom' as const, url: '/limited-company', newTab: false },
    },
    {
      id: 'card-2',
      title: 'Guarantee',
      cardDescription: 'Private company limited by guarantee',
      image: {
        id: '2',
        url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=700&h=480&fit=crop',
        alt: 'Business meeting',
        filename: 'guarantee-card.jpg',
        mimeType: 'image/jpeg',
        filesize: 100000,
        width: 700,
        height: 480,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      },
      link: { type: 'custom' as const, url: '/company-limited-by-guarantee', newTab: false },
    },
    {
      id: 'card-3',
      title: 'LLP',
      cardDescription: 'Limited Liability Partnership',
      image: {
        id: '3',
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&h=480&fit=crop',
        alt: 'Colleagues working together',
        filename: 'llp-card.jpg',
        mimeType: 'image/jpeg',
        filesize: 100000,
        width: 700,
        height: 480,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      },
      link: { type: 'custom' as const, url: '/llp', newTab: false },
    },
  ],
}

const meta: Meta<typeof ChooseCompanyStructureBlock> = {
  component: ChooseCompanyStructureBlock,
  title: 'Blocks/ChooseCompanyStructure',
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--surface-canvas)' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ChooseCompanyStructureBlock>

export const Default: Story = { args: defaultArgs }

export const FiveCards: Story = {
  args: {
    ...defaultArgs,
    cards: [
      ...defaultArgs.cards,
      {
        id: 'card-4',
        title: 'Sole Trader',
        cardDescription: 'Self-employed individual running a business',
        image: defaultArgs.cards[0].image,
        link: { type: 'custom' as const, url: '/sole-trader', newTab: false },
      },
      {
        id: 'card-5',
        title: 'PLC',
        cardDescription: 'Public limited company',
        image: defaultArgs.cards[1].image,
        link: { type: 'custom' as const, url: '/plc', newTab: false },
      },
    ],
  },
}
