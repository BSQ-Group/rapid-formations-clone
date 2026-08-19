import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { BuyServiceCard } from './BuyServiceCard'

const lexical = (blocks: Array<string | string[]>) =>
  ({
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr' as const,
      children: blocks.map((block) =>
        Array.isArray(block)
          ? {
              type: 'list',
              listType: 'bullet',
              tag: 'ul',
              start: 1,
              format: '',
              indent: 0,
              version: 1,
              direction: 'ltr',
              children: block.map((item, i) => ({
                type: 'listitem',
                value: i + 1,
                format: '',
                indent: 0,
                version: 1,
                direction: 'ltr',
                children: [
                  {
                    type: 'text',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: item,
                    version: 1,
                  },
                ],
              })),
            }
          : {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              direction: 'ltr',
              textFormat: 0,
              children: [
                {
                  type: 'text',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: block,
                  version: 1,
                },
              ],
            },
      ),
    },
  }) as never

const meta: Meta<typeof BuyServiceCard> = {
  title: 'Base Components/BuyServiceCard',
  component: BuyServiceCard,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="font-legacy-condensed mx-auto w-full max-w-[600px] bg-[var(--surface-canvas)] px-5 py-10">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof BuyServiceCard>

export const Default: Story = {
  args: {
    title: 'Standard Service',
    price: '75.99',
    ctaHref: 'https://client.rapidformations.co.uk/login/',
    content: lexical([
      'Your confirmation statement will be filed within 3 working days of receiving the required information. Our price includes the Companies House filing fee of £50.00.',
    ]),
  },
}

export const WithVatAndCaption: Story = {
  args: {
    ...Default.args,
    title: 'London Registered Office Address',
    price: '39.00',
    postText: 'per year',
    showVat: true,
  },
}

export const FreeTrial: Story = {
  args: {
    ...Default.args,
    title: 'Managed Live Chat',
    price: 'Free',
    content: lexical(['Try the service for 30 days at no cost.']),
  },
}

export const MobileTitle: Story = {
  args: {
    ...Default.args,
    title: 'Appoint or remove a Director',
    mobileTitle: 'Director appointment & resignation service',
    price: '49.99',
  },
}

export const WithBulletList: Story = {
  args: {
    ...Default.args,
    title: 'Telephone Answering',
    price: '29.99',
    postText: 'per month',
    content: lexical([
      'Trust the expert receptionists to answer calls on your behalf during normal working hours.',
      [
        'Bespoke call handling',
        'Professional people',
        'Diary management',
        'Online portal with reporting',
      ],
    ]),
  },
}

export const ShortCopy: Story = {
  args: { title: 'VAT', price: '9.99', ctaHref: '#', content: lexical(['Done for you.']) },
}

export const NoBody: Story = {
  args: { title: 'Apostilled documents', price: '99.99', postText: 'per document', ctaHref: '#' },
}

export const LongCopy: Story = {
  args: {
    ...Default.args,
    title: 'Comprehensive Confirmation Statement and Annual Compliance Filing Service',
    price: '1,275.99',
    postText: 'per year, billed annually in advance',
    showVat: true,
    content: lexical([
      'We prepare, check and file your annual confirmation statement with Companies House on your behalf, chase you well before the deadline, and keep a full audit trail of every submission so you never risk a late-filing penalty or a strike-off notice against your company.',
      'Our price includes the Companies House filing fee, and there is nothing further to pay at any point during the year.',
    ]),
  },
}

export const UnbrokenToken: Story = {
  args: {
    ...Default.args,
    title: 'Geschäftsführerbestellungsservice',
    price: '49.99',
    postText: 'Zahlungsaufforderungsfrist',
    content: lexical([
      'compliance.department@rapidformations-support.co.uk — https://www.rapidformations.co.uk/additional-services/london-registered-office/',
    ]),
  },
}

export const HiddenBodyOnMobile: Story = {
  args: { ...Default.args, hideBodyOnMobile: true },
}
