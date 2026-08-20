import type { Meta, StoryObj } from '@storybook/react'

import { RenewalItemsView, type RenewalItem } from './RenewalItemsView'

const paragraph = (text: string) =>
  ({
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
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text,
              version: 1,
            },
          ],
        },
      ],
    },
  }) as never

const item = (overrides: Partial<RenewalItem> & { id: string }): RenewalItem => ({
  title: 'London Registered Office',
  price: '39.00',
  body: paragraph(
    'Renew your Registered Office Address and protect your privacy for another 12 months.',
  ),
  ctaLabel: 'Order',
  ctaHref: 'https://client.rapidformations.co.uk/login/',
  ...overrides,
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

const meta: Meta<typeof RenewalItemsView> = {
  title: 'Blocks/RenewalItems',
  component: RenewalItemsView,
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
type Story = StoryObj<typeof RenewalItemsView>

export const Default: Story = {
  args: {
    items: [
      item({ id: '1' }),
      item({
        id: '2',
        title: 'London Service Address',
        price: '26.00',
        body: paragraph('Maintain the privacy provided by our Service Address for another year.'),
      }),
      item({
        id: '3',
        title: 'Confirmation Statement Service',
        price: '75.99',
        body: paragraph(
          'Extend your Confirmation Statement Service and make sure you stay compliant with Companies House.',
        ),
      }),
      item({
        id: '4',
        title: 'ICO Registration Service',
        price: '89.99',
        body: paragraph('Renew your ICO registration and keep processing personal data lawfully.'),
      }),
    ],
  },
}

export const SingleItem: Story = { args: { items: [item({ id: '1' })] } }

export const OddCount: Story = {
  args: { items: [item({ id: '1' }), item({ id: '2', title: 'Privacy', price: '9.99' })] },
}

export const LongCopy: Story = {
  args: {
    items: [
      item({
        id: '1',
        title: 'Business Document Template Library and Company Secretarial Support Package',
        price: '1,139.99',
        body: paragraph(
          'Renew your Business Document Template Library and keep unlimited access to more than two hundred legal templates, board minutes, shareholder resolutions and statutory registers, all reviewed annually by our in-house company secretarial team so that every document you download stays compliant with the latest Companies House guidance.',
        ),
        ctaLabel: 'Order this renewal now',
      }),
      item({
        id: '2',
        title: 'VAT',
        price: '9.99',
        body: paragraph('Renew now.'),
        ctaLabel: 'Buy',
      }),
    ],
  },
}

export const UnbrokenToken: Story = {
  args: {
    items: [
      item({
        id: '1',
        title: 'corporate-services.renewals@rapidformations-incorporation.co.uk',
        body: paragraph(
          'Email corporate-services.renewals@rapidformations-incorporation.co.uk or visit https://client.rapidformations.co.uk/login/?re=/services/ to renew.',
        ),
      }),
    ],
  },
}

export const DefaultNarrow: Story = { ...Default, ...narrow }
export const LongCopyNarrow: Story = { ...LongCopy, ...narrow }
