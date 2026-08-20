import type { Meta, StoryObj } from '@storybook/react'

import type { AffiliateProgramBlock as AffiliateProgramBlockProps } from '@/payload-types'
import { AffiliateProgramBlockComponent } from './Component'

const text = (value: string) => ({
  type: 'text',
  detail: 0,
  format: 0,
  mode: 'normal',
  style: '',
  text: value,
  version: 1,
})

const doc = (heading: string, intro: string, bullets: string[]) =>
  ({
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children: [
        {
          type: 'heading',
          tag: 'h3',
          format: '',
          indent: 0,
          version: 1,
          direction: 'ltr',
          children: [text(heading)],
        },
        {
          type: 'paragraph',
          format: '',
          indent: 0,
          version: 1,
          direction: 'ltr',
          textFormat: 0,
          children: [text(intro)],
        },
        {
          type: 'list',
          listType: 'bullet',
          tag: 'ul',
          start: 1,
          format: '',
          indent: 0,
          version: 1,
          direction: 'ltr',
          children: bullets.map((bullet, i) => ({
            type: 'listitem',
            value: i + 1,
            format: '',
            indent: 0,
            version: 1,
            direction: 'ltr',
            children: [text(bullet)],
          })),
        },
      ],
    },
  }) as AffiliateProgramBlockProps['content']

const cta = (label: string): AffiliateProgramBlockProps['cta'] => ({
  type: 'custom',
  url: 'https://app.impact.com/campaign-campaign-info-v2/Rapid-Formations.brand',
  newTab: true,
  label,
})

const narrow = {
  parameters: {
    viewport: {
      options: {
        mobile360: {
          name: 'Mobile 360',
          styles: { width: '360px', height: '900px' },
          type: 'mobile',
        },
      },
    },
  },
  globals: { viewport: { value: 'mobile360' } },
}

const meta: Meta<typeof AffiliateProgramBlockComponent> = {
  title: 'Blocks/AffiliateProgram',
  component: AffiliateProgramBlockComponent,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="surface-canvas font-legacy-condensed p-5">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof AffiliateProgramBlockComponent>

export const Default: Story = {
  args: {
    blockType: 'affiliateProgram',
    content: doc(
      'Are you a good fit?',
      'Rapid Formations Affiliate Program is a great match if you:',
      [
        'Want to monetise new or existing content',
        'Would like to create a new revenue stream by promoting our company formation packages and additional services',
        'Cover entrepreneurship-related topics',
        'Wish to connect your audience with our solutions and help them get started in their business journey',
        'Used and approve of our services',
        'Tell entrepreneurs about your experience with Rapid Formations',
      ],
    ),
    cta: cta("Let's get started"),
  },
}

export const ShortCopy: Story = {
  args: {
    blockType: 'affiliateProgram',
    content: doc('Good fit?', 'A match if you:', ['Write content']),
    cta: cta('Start'),
  },
}

export const LongCopy: Story = {
  args: {
    blockType: 'affiliateProgram',
    content: doc(
      'Are you a good fit for the Rapid Formations Affiliate Partner Program and its commission structure?',
      'The Rapid Formations Affiliate Program is designed for publishers, accountants and content creators who already write about company formation, and it is a particularly strong match if any of the following describe the work you do today:',
      [
        'You want to monetise new or existing content about company formation, corporate compliance, registered office services and the wider process of incorporating a limited company in the United Kingdom',
        'Cover entrepreneurship-related topics',
      ],
    ),
    cta: cta("Let's get started with the Rapid Formations Affiliate Program today"),
  },
}

export const UnbrokenToken: Story = {
  args: {
    blockType: 'affiliateProgram',
    content: doc(
      'affiliate-partnerships@rapidformations-incorporation.co.uk',
      'Questions? Read https://app.impact.com/campaign-campaign-info-v2/Rapid-Formations.brand before applying.',
      ['corporate-services.enquiries@rapidformations-incorporation.co.uk'],
    ),
    cta: cta('affiliate-partnerships@rapidformations.co.uk'),
  },
}

export const NoCta: Story = {
  args: {
    blockType: 'affiliateProgram',
    content: doc(
      'Are you a good fit?',
      'Rapid Formations Affiliate Program is a great match if you:',
      ['Want to monetise new or existing content', 'Cover entrepreneurship-related topics'],
    ),
  },
}

export const DefaultNarrow: Story = { ...Default, ...narrow }
export const LongCopyNarrow: Story = { ...LongCopy, ...narrow }
export const UnbrokenTokenNarrow: Story = { ...UnbrokenToken, ...narrow }
