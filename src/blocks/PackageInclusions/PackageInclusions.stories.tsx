import type { Meta, StoryObj } from '@storybook/react'

import { PackageInclusionsView } from './PackageInclusionsView'
import type { PackageInclusionsItem } from './PackageInclusionsView'

const textNode = (text: string) => ({
  type: 'text',
  text,
  detail: 0,
  format: 0,
  mode: 'normal',
  style: '',
  version: 1,
})

const paragraph = (children: unknown[]) => ({
  type: 'paragraph',
  children,
  direction: 'ltr',
  format: '',
  indent: 0,
  textFormat: 0,
  version: 1,
})

const listItem = (children: unknown[], value = 1) => ({
  type: 'listitem',
  children,
  value,
  checked: undefined,
  direction: 'ltr',
  format: '',
  indent: 0,
  version: 1,
})

const bulletList = (items: string[]) => ({
  type: 'list',
  listType: 'bullet',
  tag: 'ul',
  start: 1,
  children: items.map((line, i) => listItem([textNode(line)], i + 1)),
  direction: 'ltr',
  format: '',
  indent: 0,
  version: 1,
})

const richText = (children: unknown[]) =>
  ({
    root: { type: 'root', children, direction: 'ltr', format: '', indent: 0, version: 1 },
  }) as PackageInclusionsItem['content']

const item = (over: Partial<PackageInclusionsItem> = {}): PackageInclusionsItem =>
  ({
    icon: 'badgeCheck',
    title: 'Limited Company Formation with ID Verification',
    content: richText([
      paragraph([
        textNode(
          'Your new limited company will be approved and ready to trade, usually within 24 hours. As an ACSP, we handle your ID verification and Personal Code free of charge.',
        ),
      ]),
    ]),
    ...over,
  }) as PackageInclusionsItem

const meta: Meta<typeof PackageInclusionsView> = {
  title: 'Blocks/PackageInclusions',
  component: PackageInclusionsView,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="bg-[var(--surface-canvas)] py-10">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof PackageInclusionsView>

export const BasicPackage: Story = {
  args: {
    heading: "What's included:",
    price: '2.99',
    priceNote: '+ £100 Companies House Fee',
    ctaLabel: 'Buy Now',
    ctaHref: '/company-name-check',
    items: [
      item(),
      item({
        icon: 'desktop',
        title: 'Full Set of Company Documents',
        content: richText([
          paragraph([
            textNode(
              'A full set of company documents sent to you by email, including: Certificate of Incorporation, Memorandum & Articles of Association, Share Certificates, etc.',
            ),
          ]),
        ]),
      }),
      item({
        icon: 'university',
        title: 'Free Business Bank Account (optional)',
        content: richText([
          paragraph([
            textNode(
              'A choice of up to 8 business bank accounts with easy online applications, including Barclays, NatWest, Lloyds, Starling, Monzo, Zempler, and ANNA.',
            ),
          ]),
        ]),
      }),
      item({
        icon: 'globeEurope',
        title: 'Free .com or .co.uk Domain Name',
        content: richText([
          paragraph([
            textNode(
              'A free .com or .co.uk website domain name for 1 year, to help establish the online presence of your new business.',
            ),
          ]),
        ]),
      }),
      item({
        icon: 'lifeRing',
        title: 'Free Telephone Support for the Life of your Company',
        content: richText([
          paragraph([
            textNode(
              'We are available to answer any questions by telephone, email or live webchat, before, during and after the company incorporation process.',
            ),
          ]),
        ]),
      }),
      item({
        icon: 'phoneRotary',
        title: 'Business Telephone Number - FREE for 3 months',
        content: richText([
          paragraph([
            textNode(
              'A London or regional business telephone number. All calls will be forwarded to a phone number of your choice.',
            ),
          ]),
        ]),
      }),
    ],
  },
}

export const SingleItemNoPrice: Story = {
  args: {
    heading: "What's included:",
    items: [item({ icon: 'tools', title: 'Portal' })],
  },
}

export const LongCopyAndUnbrokenTokens: Story = {
  args: {
    heading:
      'Everything that is included with this package, at no additional cost to you whatsoever:',
    price: '39.99',
    priceNote:
      '+ £100 Companies House Fee, payable at checkout and charged separately by Companies House',
    ctaLabel: 'Buy this package now and get started today',
    ctaHref: '/company-name-check',
    items: [
      item({
        icon: 'envelope',
        title:
          'London Registered Office Address, Service Address and Business Address - all FREE for the first 12 months of your company',
        content: richText([
          paragraph([
            textNode(
              'Write to companyformations@rapidformations.co.uk or visit https://www.rapidformations.co.uk/additional-services/london-registered-office to get started.',
            ),
          ]),
          bulletList([
            'Rechtsschutzversicherungsgesellschaften',
            'Free forwarding of all government mail by scan and email',
            'A prestigious Covent Garden, London address',
          ]),
        ]),
      }),
      item({ icon: 'users', title: 'Support' }),
    ],
  },
}
