import type { Meta, StoryObj } from '@storybook/react'
import { PromoCardBlock } from './Component'
import type { PromoCardBlock as PromoCardBlockProps } from '@/payload-types'

const lexicalDescription = {
  root: {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: [
      {
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        direction: 'ltr',
        textFormat: 0,
        textStyle: '',
        children: [
          {
            type: 'text',
            format: 0,
            style: '',
            mode: 'normal',
            text: 'Get same-day company formation for just ',
            detail: 0,
            version: 1,
          },
          {
            type: 'text',
            format: 1,
            style: '',
            mode: 'normal',
            text: '£79.99',
            detail: 0,
            version: 1,
          },
          {
            type: 'text',
            format: 0,
            style: '',
            mode: 'normal',
            text: ' at checkout when you buy any package. Orders must be placed by 12:00 noon (GMT) Monday–Friday.',
            detail: 0,
            version: 1,
          },
        ],
      },
    ],
  },
} as any

const mockBg = {
  id: 'bg-1',
  url: 'https://placehold.co/1440x156/0a6131/0a6131',
  filename: 'promo-card-bg.png',
  mimeType: 'image/png',
  filesize: 0,
  width: 1440,
  height: 156,
  alt: 'Promo card background',
  createdAt: '',
  updatedAt: '',
} as any

const defaultArgs: PromoCardBlockProps = {
  id: 'story-1',
  blockType: 'promoCard',
  blockName: 'Promo Card',
  title: 'Same-Day Incorporation Service',
  description: lexicalDescription,
  addLabel: 'Add',
  price: '£79.99',
  priceCaption: 'at the checkout',
  backgroundImage: mockBg,
  sectionLayout: { background: 'dark', paddingTop: 's', paddingBottom: 's' },
}

const meta: Meta<typeof PromoCardBlock> = {
  component: PromoCardBlock,
  title: 'Blocks/PromoCard',
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
type Story = StoryObj<typeof PromoCardBlock>

export const Dark: Story = { args: defaultArgs }

export const Light: Story = {
  args: {
    ...defaultArgs,
    sectionLayout: { background: 'light', paddingTop: 's', paddingBottom: 's' },
  },
}

export const LongerCopy: Story = {
  args: {
    ...defaultArgs,
    title: 'Same-Day Incorporation Service',
    description: {
      root: {
        ...(lexicalDescription as any).root,
        children: [
          {
            type: 'paragraph',
            format: '',
            indent: 0,
            version: 1,
            direction: 'ltr',
            textFormat: 0,
            textStyle: '',
            children: [
              {
                type: 'text',
                format: 0,
                style: '',
                mode: 'normal',
                text: 'Get same-day company formation for just ',
                detail: 0,
                version: 1,
              },
              {
                type: 'text',
                format: 1,
                style: '',
                mode: 'normal',
                text: '£99.99',
                detail: 0,
                version: 1,
              },
              {
                type: 'text',
                format: 0,
                style: '',
                mode: 'normal',
                text: ' added to any company formation package — incorporated on the same working day when ordered before noon (GMT).',
                detail: 0,
                version: 1,
              },
            ],
          },
        ],
      },
    } as any,
    price: '£99.99',
  },
}
